/**
 * Application configuration constants.
 *
 * Contains firmware file mappings, build numbers, HID device filters,
 * and other deployment-specific settings.
 *
 * @module config
 */

/** Whether internal (Google staff) features are enabled */
export const GOOGLE_STAFF = true;

/**
 * Maps device variant + hardware revision to the corresponding firmware filename.
 * Keys follow the pattern: `{variant}_{revision}` (e.g. "bruce_pvt").
 */
export const FIRMWARE_LIST = {
  bruce_dev: 'bruce_dvt_a_dev_signed.bin',
  bruce_dvt: 'bruce_dvt_a_stage_signed.bin',
  bruce_pvt: 'bruce_pvt_a_prod_signed.bin',
  // gotham_dev: 'gotham_dvt_a_dev_signed.bin',     // Unavailable
  // gotham_dvt: 'gotham_dvt_a_stage_signed.bin',    // Unavailable
  gotham_pvt: 'ota.316382.stable-channel.gotham-pvt-b.da986392604309ea67eab5fa84f747e955f2875c.bin',
};

/**
 * Latest firmware build numbers for each variant.
 */
export const BUILD_NUMBERS = {
  bruce: 337784,
  gotham: 282115,
};

/**
 * HID device filters used when calling `navigator.hid.requestDevice()`.
 * Covers all known Stadia Controller modes (flashloader, normal, OEM, bootrom).
 */
export const DEVICE_IDS = [
  { vendorId: 5538, productId: 115 },   // NXP flashloader (blhost)
  { vendorId: 6353, productId: 37888 }, // Stadia Controller (normal USB)
  { vendorId: 6353, productId: 37995 }, // Stadia Controller (OEM/DFU)
  { vendorId: 8137, productId: 309 },   // NXP bootrom (SDP)
];

/** Default hostname for the Stadia controller tool */
export const STADIA_HOST = 'stadia.google.com';
