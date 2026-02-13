/**
 * User-facing strings for the Stadia Controller Flasher.
 *
 * All localizable text is centralized here for easy maintenance
 * and potential future i18n support.
 *
 * @module strings
 */

// ─── Navigation & Actions ───────────────────────────────────────────────
export const STR_HOME = 'Return to home';
export const STR_HELP_CENTER = 'Go to Bluetooth mode Help Center';
export const STR_DEVICES_LIST = 'List of supported devices';
export const STR_LEARN_BLUETOOTH_PAIRING = 'Learn how to pair with Bluetooth';

// ─── Hero / Landing Page ────────────────────────────────────────────────
export const STR_BLUETOOTH_HERO =
  'Switch your Stadia Controller to Bluetooth mode to keep gaming wirelessly on your favorite devices and services after Stadia shuts\u00a0down';

// ─── Chrome Requirements ────────────────────────────────────────────────
export const STR_CHROME_WARNING =
  'You need to use Chrome version 108 or later to switch your Stadia Controller to Bluetooth mode';

// ─── Controller Reset ───────────────────────────────────────────────────
export const STR_CONTROLLER_RESTART = 'Reset your controller and start over';
export const STR_CONTROLLER_RESET =
  'Unplug your controller, then hold the Stadia button for 10 seconds to reset it. Once that\u2019s done, you can start over.';
export const STR_RESET_CONFIRM =
  'I confirm that I unplugged and reset my controller';

// ─── Device Name Hints ──────────────────────────────────────────────────
/**
 * Builds a hint string describing expected controller names in the Chrome device picker.
 *
 * @param {string} primaryName - Primary expected device name
 * @param {string} altName1 - First alternative name
 * @param {string} altName2 - Second alternative name
 * @param {string} [altName3] - Optional third alternative name
 * @returns {string}
 */
export function formatDeviceNameHint(primaryName, altName1, altName2, altName3) {
  if (altName3) {
    return `The Stadia Controller name should include \u201c${primaryName}\u201d. The name could instead include \u201c${altName1}\u201d, \u201c${altName2}\u201d, or \u201c${altName3}\u201d.`;
  }
  return `The Stadia Controller name should include \u201c${primaryName}\u201d. The name could instead include \u201c${altName1}\u201d or \u201c${altName2}\u201d\u201d.`;
}

// ─── URLs ───────────────────────────────────────────────────────────────
export const URL_GOOGLE_TERMS = 'https://policies.google.com/terms';
export const URL_CHROME_TERMS = 'https://www.google.com/chrome/terms/';
export const URL_HELP_CENTER = 'https://support.google.com/stadia?p=controllerconnect';
export const URL_DEVICE_LIST = 'https://support.google.com/stadia?p=controllerconnect#devicelist';
export const URL_CHROME_DOWNLOAD = 'https://www.google.com/chrome/';
export const URL_CHROME_UPDATE = 'https://www.google.com/chrome/update/';
export const URL_UDEV_INSTRUCTIONS = 'https://support.google.com/stadia?p=controllerconnect#linuxrule';
