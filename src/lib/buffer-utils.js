/**
 * Low-level binary buffer manipulation utilities for HID/USB communication.
 *
 * These functions handle the packet framing used by the Stadia Controller's
 * bootloader (blhost) protocol and SDP protocol.
 *
 * @module buffer-utils
 */

/**
 * Copies all bytes from a source ArrayBuffer into a destination ArrayBuffer.
 * The destination must be at least as large as the source.
 *
 * @param {ArrayBuffer} source - The source buffer to copy from
 * @param {ArrayBuffer} destination - The destination buffer to copy into
 * @throws {Error} If source is larger than destination
 */
export function copyBufferInto(source, destination) {
  if (source.byteLength > destination.byteLength) {
    throw new Error(
      `Source length of ${source.byteLength} exceeds target length of ${destination.byteLength}`
    );
  }
  const sourceView = new DataView(source);
  const destView = new DataView(destination);
  for (let i = 0; i < source.byteLength; i++) {
    destView.setUint8(i, sourceView.getUint8(i));
  }
}

/**
 * Wraps raw data into a HID output report packet.
 *
 * The packet format is:
 *   Byte 0: 0x00 (reserved/padding)
 *   Bytes 1-2: data length (uint16, little-endian)
 *   Bytes 3+: actual data payload
 *
 * @param {ArrayBuffer} packetBuffer - The pre-allocated output report buffer
 * @param {ArrayBuffer} dataPayload - The raw data to wrap
 */
export function wrapDataInPacket(packetBuffer, dataPayload) {
  const packetView = new DataView(packetBuffer);
  const dataView = new DataView(dataPayload);
  packetView.setUint8(0, 0);
  packetView.setUint16(1, dataPayload.byteLength, true);
  for (let i = 0; i < dataPayload.byteLength; i++) {
    packetView.setUint8(3 + i, dataView.getUint8(i));
  }
}

/**
 * Extracts the data payload from a HID input report packet.
 *
 * The packet format matches wrapDataInPacket:
 *   Byte 0: reserved
 *   Bytes 1-2: payload length (uint16, little-endian)
 *   Bytes 3+: payload data
 *
 * @param {DataView} reportDataView - The raw HID input report data
 * @returns {ArrayBuffer} The extracted payload
 */
export function unwrapPacketPayload(reportDataView) {
  const payloadLength = reportDataView.getUint16(1, true);
  const payload = new ArrayBuffer(payloadLength);
  const payloadView = new DataView(payload);
  for (let i = 0; i < payloadLength; i++) {
    payloadView.setUint8(i, reportDataView.getUint8(i + 3));
  }
  return payload;
}

/**
 * Parses a blhost command response packet.
 *
 * The blhost response format:
 *   Byte 0: command tag (e.g., 0xA0 = GenericResponse, 0xA3 = ReadMemoryResponse)
 *   Byte 1: flags (bit 0 = has data phase)
 *   Byte 2: reserved
 *   Byte 3: parameter count
 *   Bytes 4+: parameters (uint32 each, little-endian)
 *
 * @param {DataView} dataView - The response packet data
 * @returns {{ commandTag: number, flags: number, parameters: number[] }}
 */
export function parseCommandResponse(dataView) {
  const commandTag = dataView.getUint8(0);
  const flags = dataView.getUint8(1);
  const paramCount = dataView.getUint8(3);
  const parameters = [];

  for (let i = 0; i < paramCount; i++) {
    parameters.push(dataView.getUint32(4 + 4 * i, true));
  }

  return { commandTag, flags, parameters };
}

/**
 * Allocates an ArrayBuffer sized to match a specific HID output report.
 *
 * Queries the device's HID report descriptor to determine the correct
 * buffer size for a given report ID.
 *
 * @param {HIDDevice} device - The HID device
 * @param {number} reportId - The HID report ID to allocate for
 * @returns {ArrayBuffer} A zero-filled buffer of the correct size
 * @throws {Error} If the report ID is not found in the device descriptor
 */
export function allocateReportBuffer(device, reportId) {
  const collections = device.collections ?? [];
  for (const collection of collections) {
    const outputReports = collection.outputReports ?? [];
    for (const report of outputReports) {
      if (report.reportId === reportId) {
        let totalBits = 0;
        const items = report.items ?? [];
        for (const item of items) {
          totalBits += (item.reportSize ?? 0) * (item.reportCount ?? 0);
        }
        const totalBytes = totalBits >>> 3;
        console.trace(`Report length for reportId ${reportId} is ${totalBytes} bytes`);
        return new ArrayBuffer(totalBytes);
      }
    }
  }
  throw new Error(`Report descriptor for reportId ${reportId} not found`);
}
