/**
 * Browser detection utilities.
 *
 * Provides functions to detect browser type, rendering engine,
 * and platform for feature gating and compatibility checks.
 *
 * @module browser-utils
 */

/**
 * Returns the browser's user agent string.
 * @returns {string} The user agent, or empty string if unavailable
 */
export function getUserAgentString() {
  return navigator?.userAgent ?? '';
}

/**
 * Checks whether the user agent string contains a given substring.
 * @param {string} substring - The string to search for
 * @returns {boolean}
 */
export function userAgentContains(substring) {
  return getUserAgentString().includes(substring);
}

/**
 * Detects if the current browser is Chrome (or Chrome-based).
 * Excludes Edge and includes CriOS (Chrome on iOS) and Silk (Amazon).
 * @returns {boolean}
 */
export function isChromeBrowser() {
  return (
    (userAgentContains('Chrome') || userAgentContains('CriOS')) &&
    !userAgentContains('Edge')
  ) || userAgentContains('Silk');
}

/**
 * Detects if the current browser is a legacy IE version (Trident/MSIE engine).
 * @returns {boolean}
 */
export const isIELegacy =
  userAgentContains('Trident') || userAgentContains('MSIE');

/** True if the platform is macOS */
export const isMacOS =
  typeof navigator !== 'undefined' && /Macintosh/.test(navigator.userAgent);

/** True if the browser uses WebKit (Safari/Chrome/etc.) */
export const isWebKit =
  typeof navigator !== 'undefined' &&
  !/Opera/.test(navigator.userAgent) &&
  /WebKit/.test(navigator.userAgent);

/** True if the browser is MSIE or Trident (IE11) */
export const isMSIE =
  typeof navigator !== 'undefined' &&
  (/MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent));

/** True if the browser uses the Gecko engine (Firefox) */
export const isGecko =
  typeof navigator !== 'undefined' &&
  !/Opera|WebKit/.test(navigator.userAgent) &&
  /Gecko/.test(navigator.product);

/**
 * Detects if the device is a tablet (iPad, Android tablet, Silk).
 * @returns {boolean}
 */
export function isTabletDevice() {
  return (
    userAgentContains('iPad') ||
    (userAgentContains('Android') && !userAgentContains('Mobile')) ||
    userAgentContains('Silk')
  );
}

/**
 * Detects if the device is running iOS.
 * @returns {boolean}
 */
export const isIOS =
  typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent);

/**
 * Parses the browser's user agent into a list of [name, version, detail] entries.
 * @returns {Array<[string, string, string|undefined]>}
 */
export function parseUserAgentEntries() {
  const ua = getUserAgentString();
  const regex = /([A-Z][\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g;
  const entries = [];
  let match;
  while ((match = regex.exec(ua))) {
    entries.push([match[1], match[2], match[3] ?? undefined]);
  }
  return entries;
}

/**
 * Creates a lookup function that finds the version string for a browser name.
 * @param {Array<[string, string, string|undefined]>} entries - Parsed UA entries
 * @returns {function(string[]): string} Takes an array of candidate names, returns the version
 */
export function createBrowserVersionLookup(entries) {
  const map = {};
  entries.forEach(([name, version]) => {
    map[name] = version;
  });
  return (candidateNames) => {
    const found = candidateNames.find((name) => name in map);
    return found ? map[found] : '';
  };
}

/**
 * Gets the Chrome major version number.
 * @returns {number} The Chrome major version, or NaN if not Chrome
 */
export function getChromeVersion() {
  if (!isChromeBrowser()) return NaN;
  const entries = parseUserAgentEntries();
  const lookup = createBrowserVersionLookup(entries);
  const versionString = isChromeBrowser()
    ? lookup(['Chrome', 'CriOS', 'HeadlessChrome'])
    : '';
  if (versionString === '') return NaN;
  const parts = versionString.split('.');
  return parts.length === 0 ? NaN : Number(parts[0]);
}

/**
 * Checks if Chrome version is below the minimum required (108).
 * @returns {boolean} True if Chrome is outdated
 */
export function isChromeOutdated() {
  const version = getChromeVersion();
  return !(version >= 108);
}
