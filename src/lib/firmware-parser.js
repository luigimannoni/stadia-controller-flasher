/**
 * Firmware binary parsing utilities for Stadia Controller.
 *
 * Handles parsing of firmware images, partition detection,
 * MCU/flash type identification, and related helpers.
 *
 * @module firmware-parser
 */

/** Magic bytes at start of a bootable firmware image (IVT header signature) */
const BOOTABLE_MAGIC_BYTES = [209, 0, 32, 65];

/**
 * Map of known MCU silicon IDs to human-readable MCU type names.
 * Read from address 0x401F_C260 (OCOTP_CFG0).
 */
const MCU_TYPES = new Map([
  [7077888, '106XA0'],
  [7077889, '106XA1'],
]);

/**
 * Map of known flash vendor IDs to human-readable flash type names.
 * Read from FlexSPI register at 0x402A_8000.
 */
const FLASH_TYPES = new Map([
  [6088, 'Giga-16m'],
  [6127, 'Winbond-16m'],
]);

/**
 * Determines the firmware partition based on the reset handler address.
 *
 * The i.MX RT1062 has two application slots (A/B) and two bootloader
 * slots (A/B). The reset handler address in the vector table tells us
 * which partition the firmware targets.
 *
 * @param {number} resetHandlerAddress - The reset handler address from the vector table
 * @returns {{ name: string, offset: number, size: number, partitionId: number }}
 * @throws {Error} If the address doesn't match any known partition
 */
export function getPartitionByAddress(resetHandlerAddress) {
  if (resetHandlerAddress >= 0x60040000 && resetHandlerAddress <= 0x607C0000) {
    return {
      name: 'Application A',
      offset: 0x60040000,
      size: 8126464,
      partitionId: 1,
    };
  }
  if (resetHandlerAddress >= 0x60800000 && resetHandlerAddress <= 0x60FC0000) {
    return {
      name: 'Application B',
      offset: 0x60800000,
      size: 8126464,
      partitionId: 2,
    };
  }
  if (resetHandlerAddress >= 0x607C0000 && resetHandlerAddress <= 0x607C2000) {
    return {
      name: 'Bootloader A',
      offset: 0x607C0000,
      size: 131072,
      partitionId: 3,
    };
  }
  if (resetHandlerAddress >= 0x607E0000 && resetHandlerAddress <= 0x607E2000) {
    return {
      name: 'Bootloader B',
      offset: 0x607E0000,
      size: 131072,
      partitionId: 4,
    };
  }
  throw new Error(
    `Cannot determine partition for reset handler 0x${resetHandlerAddress.toString(16)}`
  );
}

/**
 * Build info header magic value: ASCII "bild" (0x74626C64 → actually 0x74626C62 in LE).
 * Used to validate the build info structure.
 */
const BUILD_INFO_HEADER_MAGIC = 1953699234;

/**
 * Build info footer magic value.
 * Used to validate the end of the build info structure.
 */
const BUILD_INFO_FOOTER_MAGIC = 1200016776;

/**
 * Parses a firmware binary image and extracts metadata.
 *
 * The firmware image layout depends on whether it's bootable (has IVT):
 * - Bootable: IVT at offset 0, then 4096-byte FCB, then build info at 1024+4096
 * - Non-bootable: build info at offset 1024
 *
 * @param {ArrayBuffer} buffer - The raw firmware binary data
 * @returns {{
 *   isBootable: boolean,
 *   ivtOffset: number,
 *   fcbSize: number,
 *   firmwareBuildNumber: number,
 *   firmwareVersion: number,
 *   partition: { name: string, offset: number, size: number, partitionId: number },
 *   resetHandlerAddress: number
 * }}
 * @throws {Error} If the firmware image is invalid or can't be parsed
 */
export function parseFirmwareImage(buffer) {
  let headerBytes;
  try {
    headerBytes = new Uint8Array(buffer, 0, 4);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to read 4 bytes to determine bootable/nonbootable state');
  }

  const isBootable = headerBytes.every((byte, index) => byte === BOOTABLE_MAGIC_BYTES[index]);

  let buildInfoOffset = 1024;
  if (isBootable) {
    buildInfoOffset += 4096;
  }

  let buildInfoView;
  try {
    buildInfoView = new DataView(buffer, buildInfoOffset, 256);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to read build info');
  }

  const headerMagic = buildInfoView.getUint32(0, true);
  buildInfoView.getUint32(4, true); // reserved
  const buildInfoSize = buildInfoView.getUint32(8, true);
  buildInfoView.getUint32(12, true); // reserved
  const firmwareVersion = buildInfoView.getUint32(16, true);
  const firmwareBuildNumber = buildInfoView.getUint32(20, true);
  const footerMagic = buildInfoView.getUint32(252, true);

  if (headerMagic !== BUILD_INFO_HEADER_MAGIC) {
    throw new Error(
      `Invalid build info. Expected header of 0x${BUILD_INFO_HEADER_MAGIC.toString(16)}, ` +
      `got 0x${headerMagic.toString(16)} instead`
    );
  }
  if (footerMagic !== BUILD_INFO_FOOTER_MAGIC) {
    throw new Error(
      `Invalid build info. Expected footer of 0x${BUILD_INFO_FOOTER_MAGIC.toString(16)}, ` +
      `got 0x${footerMagic.toString(16)} instead`
    );
  }
  if (buildInfoSize !== 256) {
    throw new Error(`Unexpected build info size: {buildInfo.size}`);
  }

  // Read reset handler address from vector table
  let vectorTableOffset = 4;
  if (isBootable) {
    vectorTableOffset += 4096;
  }

  let resetHandlerAddress;
  try {
    resetHandlerAddress = new DataView(buffer).getUint32(vectorTableOffset, true);
  } catch (err) {
    console.error(err);
    throw new Error(
      `Failed to read reset handler address at 0x${vectorTableOffset.toString(16)}`
    );
  }

  const partition = getPartitionByAddress(resetHandlerAddress);

  return {
    isBootable,
    ivtOffset: 0,
    fcbSize: 4096,
    firmwareBuildNumber,
    firmwareVersion,
    partition,
    resetHandlerAddress,
  };
}

/**
 * Slices a portion of an ArrayBuffer.
 *
 * @param {ArrayBuffer} buffer - Source buffer
 * @param {number} offset - Starting byte offset
 * @param {number} length - Number of bytes to extract
 * @returns {ArrayBuffer} A new ArrayBuffer containing the sliced data
 */
export function sliceBuffer(buffer, offset, length) {
  return buffer.slice(offset, offset + length);
}

/**
 * Converts a number to a zero-padded 8-character hexadecimal string.
 *
 * @param {number} value - The number to convert
 * @returns {string} Hex string like "0000ff00"
 */
export function toHex32(value) {
  return Number(value).toString(16).padStart(8, '0');
}

/**
 * Creates a sub-progress callback that maps a 0-100 range to a sub-range.
 *
 * Used to divide a progress bar across multiple sequential operations.
 * For example, if erasing is 0-50% and writing is 50-100%, you'd call:
 *   createProgressCallback(onProgress, 0, 50) for the erase step
 *   createProgressCallback(onProgress, 50, 100) for the write step
 *
 * @param {function(number): void | null} callback - The parent progress callback (0-100)
 * @param {number} rangeStart - The start of the sub-range (0-100)
 * @param {number} rangeEnd - The end of the sub-range (0-100)
 * @returns {function(number): void} A new callback that maps 0-100 input to rangeStart-rangeEnd
 */
export function createProgressCallback(callback, rangeStart, rangeEnd) {
  return (progressPercent) => {
    callback?.(rangeStart + (progressPercent / 100) * (rangeEnd - rangeStart));
  };
}

export { BOOTABLE_MAGIC_BYTES, MCU_TYPES, FLASH_TYPES };
