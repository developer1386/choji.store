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
    const isValidProtocol = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    const hasValidDomain = parsedUrl.hostname.length > 0 && parsedUrl.hostname.includes('.');
    return isValidProtocol && hasValidDomain;
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
  const numericRating = parseFloat(rating);
  return !isNaN(numericRating) && numericRating >= 0 && numericRating <= 5;
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
