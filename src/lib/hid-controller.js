/**
 * HID Controller communication module.
 *
 * Handles all low-level HID communication with the Stadia Controller,
 * including SDP (Serial Download Protocol) for the i.MX RT bootrom,
 * and blhost protocol for the flashloader.
 *
 * @module hid-controller
 */

import { AsyncChannel } from './async-channel.js';
import {
  allocateReportBuffer,
  copyBufferInto,
  wrapDataInPacket,
  unwrapPacketPayload,
  parseCommandResponse,
} from './buffer-utils.js';
import {
  toHex32,
  parseFirmwareImage,
  sliceBuffer,
  createProgressCallback,
  MCU_TYPES,
  FLASH_TYPES,
} from './firmware-parser.js';

/** Timeout in milliseconds for waiting on HID input reports */
const HID_RESPONSE_TIMEOUT_MS = 10_000;

/**
 * Error thrown when the HID device disconnects unexpectedly during an operation.
 */
export class HIDDisconnectionError extends Error {
  constructor() {
    super('HID device disconnected');
    this.name = 'HIDDisconnectionError';
  }
}

/**
 * Races a promise against a timeout.
 * Used to prevent indefinite hangs if the controller doesn't respond.
 *
 * @param {Promise<T>} promise - The promise to race
 * @returns {Promise<T>} Resolves with the original promise or rejects on timeout
 * @template T
 */
function withTimeout(promise) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timed out waiting for HID input report')), HID_RESPONSE_TIMEOUT_MS);
    }),
  ]);
}

// ─── SDP Protocol Constants ─────────────────────────────────────────────
// SDP (Serial Download Protocol) is used by the i.MX RT bootrom
const SDP_COMMAND_WRITE_FILE = 1028;  // 0x0404
const SDP_COMMAND_JUMP = 2827;        // 0x0B0B
const SDP_RAM_ADDRESS = 0x20000000;   // 536870912
const SDP_JUMP_ADDRESS = 0x20000400;  // 536871936

// ─── blhost Command Tags ────────────────────────────────────────────────
const BLHOST_CMD_FLASH_ERASE_REGION = 2;
const BLHOST_CMD_READ_MEMORY = 3;
const BLHOST_CMD_WRITE_MEMORY = 4;
const BLHOST_CMD_FILL_MEMORY = 5;
const BLHOST_CMD_RESET = 11;
const BLHOST_CMD_CONFIGURE_MEMORY = 17;

// ─── blhost Response Tags ───────────────────────────────────────────────
const BLHOST_RESP_GENERIC = 0xA0;   // 160
const BLHOST_RESP_READ_MEMORY = 0xA3; // 163

// ─── FlexSPI Register Base ──────────────────────────────────────────────
const FLEXSPI_BASE = 0x402A_8000;
const FLEXSPI_RFDR0 = 0x402A_8100; // Read FIFO Data Register 0

// ─── GPR Flags ──────────────────────────────────────────────────────────
const GPR_FLAG_BASE = 0x400A_C050; // IOMUXC_GPR_GPR20/21/22

// ─── IVT Load Address ───────────────────────────────────────────────────
const IVT_LOAD_ADDRESS = 0x6000_0000;

// ─── FCB (Flash Configuration Block) Address ────────────────────────────
const FCB_ADDRESS = 0x2000;  // 8192

/**
 * Stadia Controller HID communication wrapper.
 *
 * Manages two async channels:
 * - sdpChannel: for SDP protocol responses (bootrom mode, vendorId=8137)
 * - blhostChannel: for blhost protocol responses (flashloader mode, vendorId=5538)
 *
 * @param {HIDDevice} hidDevice - The WebHID device handle
 */
export class StadiaHIDController {
  constructor(hidDevice) {
    this.device = hidDevice;

    /** Channel for SDP (bootrom) responses */
    this.sdpChannel = new AsyncChannel();

    /** Channel for blhost (flashloader) responses */
    this.blhostChannel = new AsyncChannel();

    // Route incoming HID reports to the appropriate channel
    this.device.addEventListener('inputreport', (event) => {
      console.trace(event);

      // SDP mode: vendor=0x1FC9 (8137), product=0x0135 (309), reportId=4
      if (this.device.vendorId === 8137 && this.device.productId === 309 && event.reportId === 4) {
        const statusCode = event.data.getUint32(0, false);
        this.sdpChannel.send({ sdpStatus: statusCode });
        return;
      }

      // blhost mode: vendor=0x15A2 (5538), product=0x0073 (115)
      if (this.device.vendorId === 5538 && this.device.productId === 115) {
        if (event.reportId === 3) {
          this._handleBlhostCommandResponse(event.data);
        } else if (event.reportId === 4) {
          this._handleBlhostDataResponse(event.data);
        } else {
          this.blhostChannel.send(new Error(`Unknown reply packet type ${event.reportId}`));
        }
      }
    });
  }

  /**
   * Opens the HID device if not already open.
   */
  async open() {
    if (!this.device.opened) {
      await this.device.open();
    }
  }

  /**
   * Closes the HID device.
   */
  async close() {
    return this.device.close();
  }

  // ─── SDP Protocol Methods ──────────────────────────────────────────

  /**
   * Sends an SDP command to the bootrom.
   *
   * @param {object} command - SDP command parameters
   * @param {number} command.commandType - SDP command code
   * @param {number} command.address - Target memory address
   * @param {number} command.format - Data format
   * @param {number} command.dataCount - Number of data bytes
   * @param {number} command.data - Data value
   * @private
   */
  async _sendSdpCommand(command) {
    const buffer = allocateReportBuffer(this.device, 1);
    const view = new DataView(buffer);
    view.setUint16(0, command.commandType, false);
    view.setUint32(2, command.address, false);
    view.setUint8(6, command.format);
    view.setUint32(7, command.dataCount, false);
    view.setUint32(11, command.data, false);
    view.setUint8(15, 0);
    return this.device.sendReport(1, buffer);
  }

  /**
   * Uploads a binary payload via SDP protocol (bootrom mode).
   *
   * Sends the WRITE_FILE command followed by data in report-sized chunks,
   * then issues a JUMP command to start execution.
   *
   * @param {ArrayBuffer} payload - The binary data to upload (e.g., flashloader)
   */
  async uploadSdpPayload(payload) {
    const onDisconnect = (event) => {
      if (event.device === this.device) {
        this.sdpChannel.send(new HIDDisconnectionError());
      }
    };
    navigator.hid.addEventListener('disconnect', onDisconnect);

    try {
      // Send WRITE_FILE command
      await this._sendSdpCommand({
        commandType: SDP_COMMAND_WRITE_FILE,
        address: SDP_RAM_ADDRESS,
        format: 0,
        dataCount: payload.byteLength,
        data: 0,
      });

      // Send data in chunks sized to the output report
      let offset = 0;
      while (offset < payload.byteLength) {
        const reportBuffer = allocateReportBuffer(this.device, 2);
        const end = Math.min(offset + reportBuffer.byteLength, payload.byteLength);
        copyBufferInto(payload.slice(offset, end), reportBuffer);
        await this.device.sendReport(2, reportBuffer);
        offset = end;
      }

      // Wait for SDP status response
      const result = await withTimeout(this.sdpChannel.receive());
      console.log(`SDP load result: 0x${toHex32(result.sdpStatus)}`);

      // Send JUMP command to start the flashloader
      await this._sendSdpCommand({
        commandType: SDP_COMMAND_JUMP,
        address: SDP_JUMP_ADDRESS,
        format: 0,
        dataCount: 0,
        data: 0,
      });
    } finally {
      navigator.hid.removeEventListener('disconnect', onDisconnect);
    }
  }

  // ─── blhost Protocol Methods ───────────────────────────────────────

  /**
   * Sends a blhost command and waits for the response.
   *
   * @param {object} command - blhost command
   * @param {number} command.tag - Command tag byte
   * @param {number} command.flags - Command flags
   * @param {number[]} command.parameters - Command parameters (uint32 each)
   * @returns {Promise<object>} The parsed response
   * @private
   */
  async _sendBlhostCommand(command) {
    // Build the command packet: [tag, flags, reserved, paramCount, ...params]
    const packetSize = 4 + 4 * command.parameters.length;
    const packet = new ArrayBuffer(packetSize);
    const view = new DataView(packet);
    view.setUint8(0, command.tag);
    view.setUint8(1, command.flags);
    view.setUint8(2, 0); // reserved
    view.setUint8(3, command.parameters.length);
    for (let i = 0; i < command.parameters.length; i++) {
      view.setUint32(4 + 4 * i, command.parameters[i], true);
    }

    // Wrap in output report and send
    const reportBuffer = allocateReportBuffer(this.device, 1);
    wrapDataInPacket(reportBuffer, packet);
    await this.device.sendReport(1, reportBuffer);

    // Wait for response
    return this._waitForBlhostResponse();
  }

  /**
   * Sends a data report to the blhost flashloader.
   *
   * @param {ArrayBuffer} data - The data to send
   * @private
   */
  async _sendBlhostData(data) {
    const reportBuffer = allocateReportBuffer(this.device, 2);
    wrapDataInPacket(reportBuffer, data);
    return this.device.sendReport(2, reportBuffer);
  }

  /**
   * Waits for the next blhost response from the channel.
   * @returns {Promise<object>}
   * @private
   */
  async _waitForBlhostResponse() {
    return withTimeout(this.blhostChannel.receive());
  }

  /**
   * Handles a blhost command response (report ID 3).
   * Parses the response and routes it to the blhost channel.
   *
   * @param {DataView} reportData - Raw HID report data
   * @private
   */
  _handleBlhostCommandResponse(reportData) {
    const payload = unwrapPacketPayload(reportData);
    const response = parseCommandResponse(new DataView(payload));

    if (response.commandTag === BLHOST_RESP_GENERIC) {
      const status = response.parameters[0];
      const commandTag = response.parameters[1];
      if (status !== 0) {
        this.blhostChannel.send(new Error(`Command ${commandTag} failed with status ${status}`));
        return;
      }
    } else if (response.commandTag === BLHOST_RESP_READ_MEMORY) {
      const status = response.parameters[0];
      if (status !== 0) {
        this.blhostChannel.send(new Error(`ReadMemory failed with status ${status}`));
        return;
      }
    }

    // Check if response has a data phase (bit 0 of flags)
    const hasDataPhase = (response.flags & 1) === 1;
    if (hasDataPhase) {
      // Chain to receive the data phase response
      this.blhostChannel.send(
        this._waitForBlhostResponse().then((next) => next)
      );
    } else {
      this.blhostChannel.send({ responsePayload: payload });
    }
  }

  /**
   * Handles a blhost data response (report ID 4).
   * Extracts the data payload and chains to the next response.
   *
   * @param {DataView} reportData - Raw HID report data
   * @private
   */
  _handleBlhostDataResponse(reportData) {
    const dataPayload = unwrapPacketPayload(reportData);
    this.blhostChannel.send(
      this._waitForBlhostResponse().then(() => ({ data: dataPayload }))
    );
  }

  // ─── High-Level Flash Operations ──────────────────────────────────

  /**
   * Reads a 32-bit value from a memory address on the controller.
   *
   * @param {number} address - The memory address to read
   * @returns {Promise<number>} The 32-bit value at that address
   */
  async readMemory32(address) {
    console.log(`Reading 32-bit value at 0x${toHex32(address)}`);
    const response = await this._sendBlhostCommand({
      tag: BLHOST_CMD_READ_MEMORY,
      flags: 0,
      parameters: [address, 4, 0],
    });

    if (!response.data) {
      throw new Error('No data received in reply');
    }
    if (response.data.byteLength !== 4) {
      throw new Error(`Invalid reply data size: ${response.data.byteLength}`);
    }

    const value = new DataView(response.data).getUint32(0, true);
    console.log(`    *(0x${toHex32(address)}) == 0x${toHex32(value)}`);
    return value;
  }

  /**
   * Writes a 32-bit value to a memory address on the controller.
   *
   * @param {number} address - The memory address
   * @param {number} value - The 32-bit value to write
   */
  async writeMemory32(address, value) {
    console.log(`Setting *(0x${toHex32(address)}) to 0x${toHex32(value)}`);
    await this._sendBlhostCommand({
      tag: BLHOST_CMD_FILL_MEMORY,
      flags: 0,
      parameters: [address, 4, value],
    });
  }

  /**
   * Writes a binary buffer to flash/RAM starting at the given address.
   *
   * @param {ArrayBuffer} data - The data to write
   * @param {number} address - The starting memory address
   * @param {function(number): void} [onProgress] - Optional progress callback (0-100)
   */
  async writeToMemory(address, data, onProgress) {
    console.log(`Writing ${data.byteLength} bytes to 0x${toHex32(address)}`);

    // Initiate write command
    await this._sendBlhostCommand({
      tag: BLHOST_CMD_WRITE_MEMORY,
      flags: 1, // has data phase
      parameters: [address, data.byteLength, 0],
    });

    // Send data in 512-byte chunks
    const chunkSize = 512;
    let offset = 0;
    while (offset < data.byteLength) {
      const end = Math.min(offset + chunkSize, data.byteLength);
      await this._sendBlhostData(data.slice(offset, end));
      offset = end;
      onProgress?.(offset / data.byteLength * 100);
    }

    // Wait for final acknowledgment
    await this._waitForBlhostResponse();
    console.log('Memory write complete.');
  }

  /**
   * Erases a region of flash memory.
   *
   * @param {number} address - The starting address
   * @param {number} totalBytes - Total bytes to erase
   * @param {function(number): void} [onProgress] - Optional progress callback (0-100)
   */
  async eraseFlashRegion(address, totalBytes, onProgress) {
    console.log(`Erasing ${totalBytes} bytes from 0x${toHex32(address)}`);
    let remaining = totalBytes;

    while (remaining > 0) {
      const chunkSize = remaining > 16384 ? 16384 : remaining;
      console.trace(`Step: erasing 0x${toHex32(chunkSize)} bytes from 0x${toHex32(address)}`);

      await this._sendBlhostCommand({
        tag: BLHOST_CMD_FLASH_ERASE_REGION,
        flags: 0,
        parameters: [address, chunkSize, 0],
      });

      address += chunkSize;
      remaining -= chunkSize;
      onProgress?.((totalBytes - remaining) / totalBytes * 100);
    }
  }

  /**
   * Resets the controller by sending the blhost Reset command.
   */
  async reset() {
    console.log('Resetting device...');
    await this._sendBlhostCommand({
      tag: BLHOST_CMD_RESET,
      flags: 0,
      parameters: [],
    });
  }

  /**
   * Configures the flash memory controller (FlexSPI) using the flashloader.
   *
   * @param {number} memoryId - FlexSPI memory configuration ID
   * @param {number} configBlockAddress - Address of the FCB in RAM
   */
  async configureFlashMemory(memoryId, configBlockAddress) {
    await this._sendBlhostCommand({
      tag: BLHOST_CMD_CONFIGURE_MEMORY,
      flags: 0,
      parameters: [memoryId, configBlockAddress],
    });
  }

  // ─── Controller Identification ────────────────────────────────────

  /**
   * Detects the MCU type by reading the silicon ID register.
   *
   * @returns {Promise<string>} Human-readable MCU type (e.g., "106XA0")
   */
  async detectMcuType() {
    const siliconId = await this.readMemory32(0x401F_C260);
    const mcuType = MCU_TYPES.get(siliconId);
    if (!mcuType) {
      throw new Error(`Unknown MCU type for 0x${toHex32(siliconId)}`);
    }
    return mcuType;
  }

  /**
   * Detects the flash type by loading a vendor-ID detection flashloader
   * and reading the flash identification register.
   *
   * @param {function(ArrayBuffer): Promise<ArrayBuffer>} fetchFirmware - Function to fetch firmware files
   * @returns {Promise<string>} Human-readable flash type (e.g., "Giga-16m")
   */
  async detectFlashType(fetchFirmware) {
    // Load and execute the flash detection FCB
    const fcbBinary = await fetchFirmware('flashloader_fcb_get_vendor_id.bin');
    await this.writeToMemory(FCB_ADDRESS, fcbBinary);
    await this.configureFlashMemory(9, FCB_ADDRESS);

    // Configure FlexSPI registers for flash detection
    console.log('Configuring registers to get flash type');
    await this._setFlexSpiRegister(128, 0x8000_0000, true);  // MCR0
    await this._setFlexSpiRegister(20, 30, true);             // FLSHA1CR0
    await this._setFlexSpiRegister(160, 0, false);            // IPCR0
    await this._setFlexSpiRegister(184, 1, false);            // IPCR1.SEQID
    await this._setFlexSpiRegister(188, 1, false);            // IPCMD
    await this._setFlexSpiRegister(164, 2, false);            // IPCR0.DATASZ
    await this._setFlexSpiRegister(176, 1, false);            // IPTXFCR

    // Poll for flash vendor ID
    console.log('Waiting for flash detection');
    let vendorId = 0;
    while (vendorId === 0) {
      vendorId = await this._readFlashVendorId();
    }

    const flashType = FLASH_TYPES.get(vendorId);
    if (!flashType) {
      throw new Error(`Unknown flash type for 0x${Number(vendorId).toString(16).padStart(4, '0')}`);
    }
    return flashType;
  }

  /**
   * Sets up the flash configuration block (FCB) for the detected flash type.
   *
   * @param {string} flashType - The flash type string (e.g., "Giga-16m")
   * @param {function(ArrayBuffer): Promise<ArrayBuffer>} fetchFirmware - Function to fetch firmware files
   */
  async setupFlashConfig(flashType, fetchFirmware) {
    if (flashType === 'Giga-16m') {
      // Write FCB directly for Giga flash
      await this.writeMemory32(FCB_ADDRESS, 0xC000_0006);
    } else if (flashType === 'Winbond-16m') {
      // Load FCB from file for Winbond flash
      const fcbBinary = await fetchFirmware('flashloader_fcb_w25q128jw.bin');
      await this.writeToMemory(FCB_ADDRESS, fcbBinary);
    } else {
      throw new Error(`Unknown flash type: ${flashType}`);
    }
    await this.configureFlashMemory(9, FCB_ADDRESS);
  }

  /**
   * Reads the flash vendor ID register.
   * @returns {Promise<number>}
   * @private
   */
  async _readFlashVendorId() {
    return this.readMemory32(FLEXSPI_RFDR0);
  }

  /**
   * Sets or ORs a value into a FlexSPI register.
   *
   * @param {number} offset - Register offset from FlexSPI LUT base
   * @param {number} value - Value to set or OR
   * @param {boolean} useOr - If true, OR the value with existing; if false, write directly
   * @private
   */
  async _setFlexSpiRegister(offset, value, useOr) {
    if (useOr) {
      const current = await this.readMemory32(FLEXSPI_BASE + offset);
      const newValue = (current | value) >>> 0;
      if (newValue === current) return; // Already set
      await this.writeMemory32(FLEXSPI_BASE + offset, newValue);
    } else {
      await this.writeMemory32(FLEXSPI_BASE + offset, value);
    }
  }

  // ─── Firmware Flashing ────────────────────────────────────────────

  /**
   * Flashes the IVT (Image Vector Table) to the boot area.
   *
   * @param {ArrayBuffer} ivtData - The IVT binary data
   * @param {function(number): void} [onProgress] - Progress callback (0-100)
   */
  async flashIvt(ivtData, onProgress) {
    const eraseProgress = createProgressCallback(onProgress, 0, 50);
    const writeProgress = createProgressCallback(onProgress, 50, 100);
    await this.eraseFlashRegion(IVT_LOAD_ADDRESS, ivtData.byteLength, eraseProgress);
    await this.writeToMemory(IVT_LOAD_ADDRESS, ivtData, writeProgress);
  }

  /**
   * Flashes firmware data to a specific partition.
   *
   * @param {ArrayBuffer} firmwareData - The full firmware binary
   * @param {number} partitionOffset - The flash offset for the target partition
   * @param {function(number): void} [onProgress] - Progress callback (0-100)
   */
  async flashToPartition(firmwareData, partitionOffset, onProgress) {
    const eraseProgress = createProgressCallback(onProgress, 0, 50);
    const writeProgress = createProgressCallback(onProgress, 50, 100);
    await this.eraseFlashRegion(partitionOffset, firmwareData.byteLength, eraseProgress);
    await this.writeToMemory(partitionOffset, firmwareData, writeProgress);
  }

  /**
   * Performs the complete firmware flash process:
   * 1. Detect MCU type
   * 2. Detect flash type
   * 3. Configure flash
   * 4. Clear GPR flags
   * 5. Parse firmware image
   * 6. Flash IVT (if bootable)
   * 7. Flash firmware to target partition
   * 8. Set GPR flags for the flashed partition
   * 9. Reset the device
   *
   * @param {ArrayBuffer} firmwareData - The firmware binary to flash
   * @param {function(number): void} onProgress - Progress callback (0-100)
   * @param {function(ArrayBuffer): Promise<ArrayBuffer>} fetchFirmware - Function to fetch firmware files
   */
  async flashFirmware(firmwareData, onProgress, fetchFirmware) {
    const onDisconnect = (event) => {
      if (event.device === this.device) {
        this.blhostChannel.send(new HIDDisconnectionError());
      }
    };
    navigator.hid.addEventListener('disconnect', onDisconnect);

    try {
      // Step 1: Detect MCU
      console.log('Detecting MCU type...');
      const mcuType = await this.detectMcuType();
      console.log(`MCU: ${mcuType}`);
      onProgress(1);

      // Step 2: Detect Flash
      console.log('Detecting Flash type...');
      const flashType = await this.detectFlashType(fetchFirmware);
      console.log(`Flash: ${flashType}`);
      onProgress(2);

      // Step 3: Configure flash
      console.log('Setting up flash');
      await this.setupFlashConfig(flashType, fetchFirmware);
      onProgress(3);

      // Step 4: Clear GPR flags
      console.log('Clearing GPR flags');
      await this.writeMemory32(GPR_FLAG_BASE, 0);
      await this.writeMemory32(GPR_FLAG_BASE + 4, 0);
      await this.writeMemory32(GPR_FLAG_BASE + 8, 0);
      onProgress(4);

      // Step 5: Parse firmware
      const imageInfo = parseFirmwareImage(firmwareData);
      onProgress(5);

      // Step 6: Flash IVT if bootable
      if (imageInfo.isBootable) {
        console.log('Extracting IVT and flashing');
        const ivtData = sliceBuffer(firmwareData, imageInfo.ivtOffset, imageInfo.fcbSize);
        await this.flashIvt(ivtData, createProgressCallback(onProgress, 5, 10));
      }

      // Step 7: Flash to partition
      console.log(`Flashing to ${imageInfo.partition.name} at 0x${imageInfo.partition.offset}`);
      await this.flashToPartition(
        firmwareData,
        imageInfo.partition.offset,
        createProgressCallback(onProgress, 10, 99)
      );

      // Step 8: Set GPR flag for flashed partition
      if (imageInfo.partition.partitionId === 1) {
        await this.writeMemory32(GPR_FLAG_BASE + 8, 1);
      } else if (imageInfo.partition.partitionId === 2) {
        await this.writeMemory32(GPR_FLAG_BASE + 8, 2);
      }

      onProgress(100);

      // Step 9: Reset
      try {
        console.log('Resetting device');
        await this.reset();
        console.log('Device reset complete');
      } catch (err) {
        if (err instanceof HIDDisconnectionError) {
          console.log('Device disconnected, assuming reset to be complete');
        } else {
          console.log(err);
        }
      }
    } finally {
      navigator.hid.removeEventListener('disconnect', onDisconnect);
    }
  }
}
