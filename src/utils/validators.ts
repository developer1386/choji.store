/**
 * Validation functions for structured data schemas
 * Contains type-safe validators for URLs, currencies, and other schema properties
 * @module validators
 */

import { VALID_AVAILABILITY_STATES, VALID_CURRENCIES, type AvailabilityState, type CurrencyCode } from './types';

/**
 * Validate a URL string
 * @param {string} url - The URL to validate
 * @returns {boolean} true if valid HTTP/HTTPS URL, false otherwise
 * @throws {TypeError} if url is not a string
 */
import { memoizeValidator } from './memoize';

const _isValidUrl = (url: string): boolean => {
  if (typeof url !== 'string') {
    throw new TypeError('URL must be a string');
  }
  try {
    const parsedUrl = new URL(url);
    
    // Check protocol
    const isValidProtocol = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    if (!isValidProtocol) return false;
    
    // Handle IP addresses
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^(\[([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}\])$/;
    const isIpAddress = ipv4Regex.test(parsedUrl.hostname) || ipv6Regex.test(parsedUrl.hostname);
    
    if (isIpAddress) {
      if (ipv4Regex.test(parsedUrl.hostname)) {
        // Validate IPv4 address ranges
        const parts = parsedUrl.hostname.split('.').map(Number);
        return parts.every(part => part >= 0 && part <= 255);
      }
      return true; // IPv6 validation is handled by URL constructor
    }

    // Split hostname into parts
    const hostnameParts = parsedUrl.hostname.split('.');
    
    // Verify domain has valid structure (at least two parts, each non-empty)
    const hasValidDomain = hostnameParts.length >= 2 && 
      hostnameParts.every(part => part.length > 0 && !/^-|-$/.test(part));

    // Check TLD is not just a number and has reasonable length
    const tld = hostnameParts[hostnameParts.length - 1];
    const hasValidTld = tld.length >= 2 && !/^\d+$/.test(tld);

    // Check port if present
    if (parsedUrl.port) {
      const port = parseInt(parsedUrl.port, 10);
      if (isNaN(port) || port <= 0 || port > 65535) {
        return false;
      }
    }

    // Additional validations
    if (url.includes('//')) {
      // Ensure no double slashes in path
      const pathAndQuery = parsedUrl.pathname + parsedUrl.search;
      if (pathAndQuery.includes('//')) return false;
    }

    return hasValidDomain && hasValidTld;
  } catch {
    return false;
  }
};

export const isValidUrl = memoizeValidator<string, boolean>(_isValidUrl);

/**
 * Validate a currency code against ISO 4217 standards
 * @param {string} currency - The currency code to validate
 * @returns {boolean} true if valid ISO 4217 currency code, false otherwise
 * @throws {TypeError} if currency is not a string
 * @example
 * isValidCurrency('USD') // returns true
 * isValidCurrency('INVALID') // returns false
 */
const _isValidCurrency = (currency: string): currency is CurrencyCode => {
  if (typeof currency !== 'string') {
    throw new TypeError('Currency code must be a string');
  }
  return VALID_CURRENCIES.includes(currency as CurrencyCode);
};

export const isValidCurrency = memoizeValidator<string, boolean>(_isValidCurrency);

/**
 * Validate an availability state against schema.org standards
 * @param {string} state - The availability state to validate
 * @returns {boolean} true if valid schema.org availability state, false otherwise
 * @throws {TypeError} if state is not a string
 * @example
 * isValidAvailability('https://schema.org/InStock') // returns true
 * isValidAvailability('InStock') // returns false
 */
const _isValidAvailability = (state: string): state is AvailabilityState => {
  if (typeof state !== 'string') {
    throw new TypeError('Availability state must be a string');
  }
  return VALID_AVAILABILITY_STATES.includes(state as AvailabilityState);
};

export const isValidAvailability = memoizeValidator<string, boolean>(_isValidAvailability);

/**
 * Validate a rating value
 * @param {string} rating - The rating value to validate
 * @returns {boolean} true if valid rating between 0 and 5, false otherwise
 * @throws {TypeError} if rating is not a string
 */
const _isValidRating = (rating: string): boolean => {
  if (typeof rating !== 'string') {
    throw new TypeError('Rating value must be a string');
  }

  // Check for invalid formats first
  if (/[^0-9.]/.test(rating)) return false; // Only digits and decimal point allowed
  if (rating.startsWith('.') || rating.endsWith('.')) return false; // No leading/trailing decimal
  if ((rating.match(/\./g) || []).length > 1) return false; // Only one decimal point allowed
  if (/^0\d/.test(rating)) return false; // No leading zeros except for "0" itself
  if (rating.includes(' ')) return false; // No spaces allowed

  const numericRating = parseFloat(rating);
  if (isNaN(numericRating)) return false;
  if (numericRating < 0 || numericRating > 5) return false;

  // Check decimal places
  const decimalParts = rating.split('.');
  if (decimalParts.length > 1) {
    // If has decimal places, only allow .0, .25, .5, .75
    const decimalPart = decimalParts[1];
    if (decimalPart.length > 2) return false;
    const validDecimals = ['0', '25', '5', '75'];
    if (!validDecimals.includes(decimalPart)) return false;
  }

  return true;
};

export const isValidRating = memoizeValidator<string, boolean>(_isValidRating);

/**
 * Validate a review count
 * @param {string} count - The review count to validate
 * @returns {boolean} true if valid non-negative integer, false otherwise
 * @throws {TypeError} if count is not a string
 */
const _isValidReviewCount = (count: string): boolean => {
  if (typeof count !== 'string') {
    throw new TypeError('Review count must be a string');
  }
  // Check if the string contains only digits
  if (!/^\d+$/.test(count)) {
    return false;
  }
  const numericCount = parseInt(count, 10);
  return numericCount >= 0;
};

export const isValidReviewCount = memoizeValidator<string, boolean>(_isValidReviewCount);
