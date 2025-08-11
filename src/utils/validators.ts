/**
 * Validation functions for structured data schemas
 */

import { VALID_AVAILABILITY_STATES, VALID_CURRENCIES, type AvailabilityState, type CurrencyCode } from './types';

/**
 * Validate a URL string
 * @param url The URL to validate
 * @returns true if valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate a currency code
 * @param currency The currency code to validate
 * @returns true if valid, false otherwise
 */
export const isValidCurrency = (currency: string): currency is CurrencyCode => {
  return VALID_CURRENCIES.includes(currency as CurrencyCode);
};

/**
 * Validate an availability state
 * @param state The availability state to validate
 * @returns true if valid, false otherwise
 */
export const isValidAvailability = (state: string): state is AvailabilityState => {
  return VALID_AVAILABILITY_STATES.includes(state as AvailabilityState);
};

/**
 * Validate a rating value
 * @param rating The rating value to validate
 * @returns true if valid, false otherwise
 */
export const isValidRating = (rating: string): boolean => {
  const numericRating = parseFloat(rating);
  return !isNaN(numericRating) && numericRating >= 0 && numericRating <= 5;
};

/**
 * Validate a review count
 * @param count The review count to validate
 * @returns true if valid, false otherwise
 */
export const isValidReviewCount = (count: string): boolean => {
  const numericCount = parseInt(count, 10);
  return !isNaN(numericCount) && numericCount >= 0;
};
