/**
 * Custom error classes for structured data validation
 */

/**
 * Base error class for schema validation errors
 */
export class SchemaValidationError extends Error {
  readonly code: string;
  readonly details?: Record<string, unknown>;
  readonly suggestions?: string[];

  constructor(message: string, code: string, details?: Record<string, unknown>, suggestions?: string[]) {
    super(message);
    this.name = 'SchemaValidationError';
    this.code = code;
    this.details = details;
    this.suggestions = suggestions;

    // Ensure proper prototypal inheritance
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      suggestions: this.suggestions,
    };
  }
}

/**
 * Error thrown when a URL is invalid
 */
export class InvalidUrlError extends SchemaValidationError {
  constructor(url: string) {
    super(
      `Invalid URL: ${url}`,
      'ERR_INVALID_URL',
      { providedUrl: url },
      [
        'Ensure the URL starts with http:// or https://',
        'Check for valid domain name format',
        'Verify no invalid characters in the URL'
      ]
    );
    this.name = 'InvalidUrlError';
  }
}

/**
 * Error thrown when a currency code is invalid
 */
export class InvalidCurrencyError extends SchemaValidationError {
  constructor(currency: string) {
    super(
      `Invalid currency code: ${currency}`,
      'ERR_INVALID_CURRENCY',
      { 
        providedCurrency: currency,
        validCurrencies: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']
      },
      [
        'Use a valid 3-letter ISO 4217 currency code',
        'Common codes: USD, EUR, GBP, JPY, CAD, AUD',
        'Currency codes must be in uppercase'
      ]
    );
    this.name = 'InvalidCurrencyError';
  }
}

/**
 * Error thrown when an availability state is invalid
 */
export class InvalidAvailabilityError extends SchemaValidationError {
  constructor(state: string) {
    super(
      `Invalid availability state: ${state}`,
      'ERR_INVALID_AVAILABILITY',
      {
        providedState: state,
        validStates: ['InStock', 'OutOfStock', 'PreOrder', 'Discontinued']
      },
      [
        'Use complete schema.org URL format',
        'Example: https://schema.org/InStock',
        'Valid states: InStock, OutOfStock, PreOrder, Discontinued'
      ]
    );
    this.name = 'InvalidAvailabilityError';
  }
}

/**
 * Error thrown when a rating value is invalid
 */
export class InvalidRatingError extends SchemaValidationError {
  constructor(rating: string) {
    super(
      `Invalid rating value: ${rating}`,
      'ERR_INVALID_RATING',
      {
        providedRating: rating,
        validRange: { min: 0, max: 5 },
        validDecimals: [0, 0.25, 0.5, 0.75]
      },
      [
        'Rating must be between 0 and 5',
        'Decimal values allowed: .0, .25, .5, .75',
        'No leading zeros or extra decimal places'
      ]
    );
    this.name = 'InvalidRatingError';
  }
}

/**
 * Error thrown when a review count is invalid
 */
export class InvalidReviewCountError extends SchemaValidationError {
  constructor(count: string) {
    super(
      `Invalid review count: ${count}`,
      'ERR_INVALID_REVIEW_COUNT',
      {
        providedCount: count,
        requirements: {
          type: 'integer',
          minimum: 0
        }
      },
      [
        'Review count must be a non-negative integer',
        'No decimal points allowed',
        'No leading zeros or special characters'
      ]
    );
    this.name = 'InvalidReviewCountError';
  }
}

/**
 * Error thrown when a required field is missing
 */
export class MissingRequiredFieldError extends SchemaValidationError {
  constructor(field: string) {
    super(
      `Missing required field: ${field}`,
      'ERR_MISSING_REQUIRED_FIELD',
      {
        missingField: field
      },
      [
        'Ensure all required fields are provided',
        'Check the schema documentation for required fields',
        'Use null or empty string if appropriate instead of omitting'
      ]
    );
    this.name = 'MissingRequiredFieldError';
  }
}
