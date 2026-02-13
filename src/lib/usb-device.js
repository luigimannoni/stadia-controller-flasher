/**
 * USB device utilities for Stadia Controller.
 *
 * Provides functions for detecting, connecting to, and reading
 * basic information from the Stadia Controller via WebUSB.
 *
 * @module usb-device
 */

/** Stadia Controller USB Vendor ID */
const STADIA_VENDOR_ID = 6353;  // 0x18D1

/** Stadia Controller USB Product ID */
const STADIA_PRODUCT_ID = 37888; // 0x9400

/**
 * Checks whether a USB device is a Stadia Controller.
 *
 * @param {USBDevice} device - The USB device to check
 * @returns {boolean} True if the device is a Stadia Controller
 */
export function isStadiaController(device) {
  return device.productId === STADIA_PRODUCT_ID && device.vendorId === STADIA_VENDOR_ID;
}

/**
 * Finds a connected Stadia Controller matching the given serial number.
 *
 * @param {string} serialNumber - The controller's serial number
 * @returns {Promise<USBDevice|null>} The matching device, or null if not found
 */
export async function findConnectedController(serialNumber) {
  const devices = await navigator.usb.getDevices();
  const match = devices
    .filter(isStadiaController)
    .find((device) => device.serialNumber === serialNumber);
  return match ?? null;
}

/**
 * Claims the vendor-specific USB interface on the controller.
 *
 * @param {USBDevice} device - The USB device
 * @returns {Promise<number>} The claimed interface number
 */
export async function claimControllerInterface(device) {
  const iface = device.configuration.interfaces.find(
    (iface) => iface.alternate.interfaceClass === 255
  );
  await device.claimInterface(iface.interfaceNumber);
  return iface.interfaceNumber;
}

/**
 * Performs a USB control transfer IN (device to host).
 *
 * @param {USBDevice} device - The USB device
 * @param {number} request - The bRequest value
 * @returns {Promise<DataView>} The response data
 */
export async function controlTransferIn(device, request) {
  const interfaceNumber = await claimControllerInterface(device);
  const result = await device.controlTransferIn(
    {
      index: interfaceNumber,
      recipient: 'interface',
      request,
      requestType: 'class',
      value: 0,
    },
    64
  );

  if (result.status !== 'ok') {
    throw new Error('Control transfer in failed.');
  }
  return result.data;
}

/**
 * Performs a USB control transfer OUT (host to device).
 * Sends request 0x83 (131) to trigger a mode check.
 *
 * @param {USBDevice} device - The USB device
 */
export async function controlTransferOut(device) {
  const interfaceNumber = await claimControllerInterface(device);
  const result = await device.controlTransferOut({
    index: interfaceNumber,
    recipient: 'interface',
    request: 131,
    requestType: 'class',
    value: 0,
  });

  if (result.status !== 'ok') {
    throw new Error('Control transfer out failed.');
  }
}

/**
 * Reads the firmware version from the controller.
 *
 * @param {USBDevice} device - The USB device
 * @returns {Promise<number>} The 32-bit firmware version number
 */
export async function readFirmwareVersion(device) {
  const data = await controlTransferIn(device, 129);
  return data.getUint32(0, true);
}

/**
 * Reads the battery level from the controller.
 * Issues a control transfer out (request 131) first, waits 500ms,
 * then reads battery level via control transfer in (request 132).
 *
 * @param {USBDevice} device - The USB device
 * @returns {Promise<number>} The 16-bit battery level value
 */
export async function readBatteryLevel(device) {
  await controlTransferOut(device);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data = await controlTransferIn(device, 132);
  return data.getUint16(0, true);
}
