/**
 * Custom error classes for structured data validation
 */

/**
 * Base error class for schema validation errors
 */
export class SchemaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SchemaValidationError';
  }
}

/**
 * Error thrown when a URL is invalid
 */
export class InvalidUrlError extends SchemaValidationError {
  constructor(url: string) {
    super(`Invalid URL: ${url}`);
    this.name = 'InvalidUrlError';
  }
}

/**
 * Error thrown when a currency code is invalid
 */
export class InvalidCurrencyError extends SchemaValidationError {
  constructor(currency: string) {
    super(`Invalid currency code: ${currency}`);
    this.name = 'InvalidCurrencyError';
  }
}

/**
 * Error thrown when an availability state is invalid
 */
export class InvalidAvailabilityError extends SchemaValidationError {
  constructor(state: string) {
    super(`Invalid availability state: ${state}`);
    this.name = 'InvalidAvailabilityError';
  }
}

/**
 * Error thrown when a rating value is invalid
 */
export class InvalidRatingError extends SchemaValidationError {
  constructor(rating: string) {
    super(`Invalid rating value: ${rating}. Must be between 0 and 5.`);
    this.name = 'InvalidRatingError';
  }
}

/**
 * Error thrown when a review count is invalid
 */
export class InvalidReviewCountError extends SchemaValidationError {
  constructor(count: string) {
    super(`Invalid review count: ${count}. Must be a non-negative integer.`);
    this.name = 'InvalidReviewCountError';
  }
}

/**
 * Error thrown when a required field is missing
 */
export class MissingRequiredFieldError extends SchemaValidationError {
  constructor(field: string) {
    super(`Missing required field: ${field}`);
    this.name = 'MissingRequiredFieldError';
  }
}