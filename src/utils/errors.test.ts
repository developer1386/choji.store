import { describe, it, expect } from 'vitest';
import {
  SchemaValidationError,
  InvalidUrlError,
  InvalidCurrencyError,
  InvalidAvailabilityError,
  InvalidRatingError,
  InvalidReviewCountError,
  MissingRequiredFieldError
} from './errors';

describe('Custom Error Classes', () => {
  describe('SchemaValidationError Base Class', () => {
    it('correctly initializes base error properties', () => {
      const error = new SchemaValidationError(
        'Test message',
        'TEST_ERROR',
        { test: true },
        ['suggestion1']
      );

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('SchemaValidationError');
      expect(error.message).toBe('Test message');
      expect(error.code).toBe('TEST_ERROR');
      expect(error.details).toEqual({ test: true });
      expect(error.suggestions).toEqual(['suggestion1']);
    });

    it('properly serializes to JSON', () => {
      const error = new SchemaValidationError(
        'Test message',
        'TEST_ERROR',
        { test: true },
        ['suggestion1']
      );

      const serialized = JSON.stringify(error);
      const parsed = JSON.parse(serialized);

      expect(parsed).toEqual({
        name: 'SchemaValidationError',
        message: 'Test message',
        code: 'TEST_ERROR',
        details: { test: true },
        suggestions: ['suggestion1']
      });
    });
  });

  describe('InvalidUrlError', () => {
    it('creates error with correct message and properties', () => {
      const url = 'invalid-url';
      const error = new InvalidUrlError(url);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(SchemaValidationError);
      expect(error).toBeInstanceOf(InvalidUrlError);
      expect(error.name).toBe('InvalidUrlError');
      expect(error.message).toContain(url);
      expect(error.code).toBe('ERR_INVALID_URL');
      expect(error.details).toEqual({ providedUrl: url });
      expect(error.suggestions).toBeDefined();
      expect(error.suggestions?.length).toBeGreaterThan(0);
    });
  });

  describe('InvalidCurrencyError', () => {
    it('creates error with correct message and properties', () => {
      const currency = 'INVALID';
      const error = new InvalidCurrencyError(currency);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(SchemaValidationError);
      expect(error).toBeInstanceOf(InvalidCurrencyError);
      expect(error.name).toBe('InvalidCurrencyError');
      expect(error.message).toContain(currency);
      expect(error.code).toBe('ERR_INVALID_CURRENCY');
      expect(error.details).toEqual({
        providedCurrency: currency,
        validCurrencies: expect.any(Array)
      });
      expect(error.suggestions).toBeDefined();
      expect(error.suggestions?.length).toBeGreaterThan(0);
    });

    it('includes valid currencies in details', () => {
      const error = new InvalidCurrencyError('XXX');
      expect(error.details?.validCurrencies).toContain('USD');
      expect(error.details?.validCurrencies).toContain('EUR');
    });
  });

  describe('InvalidAvailabilityError', () => {
    it('creates error with correct message and properties', () => {
      const availability = 'invalid';
      const error = new InvalidAvailabilityError(availability);

      expect(error).toBeInstanceOf(SchemaValidationError);
      expect(error.name).toBe('InvalidAvailabilityError');
      expect(error.code).toBe('ERR_INVALID_AVAILABILITY');
      expect(error.details).toEqual({
        providedState: availability,
        validStates: expect.any(Array)
      });
      expect(error.suggestions?.some(s => s.includes('schema.org'))).toBe(true);
    });
  });

  describe('InvalidRatingError', () => {
    it('creates error with correct message and properties', () => {
      const rating = '6.0';
      const error = new InvalidRatingError(rating);

      expect(error).toBeInstanceOf(SchemaValidationError);
      expect(error.name).toBe('InvalidRatingError');
      expect(error.code).toBe('ERR_INVALID_RATING');
      expect(error.details).toEqual({
        providedRating: rating,
        validRange: { min: 0, max: 5 },
        validDecimals: [0, 0.25, 0.5, 0.75]
      });
      expect(error.suggestions?.some(s => s.includes('0 and 5'))).toBe(true);
    });
  });

  describe('InvalidReviewCountError', () => {
    it('creates error with correct message and properties', () => {
      const count = '-1';
      const error = new InvalidReviewCountError(count);

      expect(error).toBeInstanceOf(SchemaValidationError);
      expect(error.name).toBe('InvalidReviewCountError');
      expect(error.code).toBe('ERR_INVALID_REVIEW_COUNT');
      expect(error.details).toEqual({
        providedCount: count,
        requirements: {
          type: 'integer',
          minimum: 0
        }
      });
      expect(error.suggestions?.some(s => s.includes('non-negative'))).toBe(true);
    });
  });

  describe('MissingRequiredFieldError', () => {
    it('creates error with correct message and properties', () => {
      const field = 'title';
      const error = new MissingRequiredFieldError(field);

      expect(error).toBeInstanceOf(SchemaValidationError);
      expect(error.name).toBe('MissingRequiredFieldError');
      expect(error.code).toBe('ERR_MISSING_REQUIRED_FIELD');
      expect(error.details).toEqual({
        missingField: field
      });
      expect(error.suggestions?.some(s => s.includes('required fields'))).toBe(true);
    });
  });

  describe('Error Inheritance', () => {
    it('preserves stack traces', () => {
      const error = new InvalidUrlError('test');
      expect(error.stack).toBeDefined();
    });

    it('can be caught as Error type', () => {
      try {
        throw new InvalidCurrencyError('XXX');
      } catch (error) {
        expect(error instanceof Error).toBe(true);
      }
    });

    it('can be caught as SchemaValidationError', () => {
      try {
        throw new InvalidCurrencyError('XXX');
      } catch (error) {
        expect(error instanceof SchemaValidationError).toBe(true);
      }
    });
  });

  describe('Error Serialization', () => {
    it('preserves error properties when serialized', () => {
      const testValue = '6.0';
      const error = new InvalidRatingError(testValue);
      const serialized = JSON.stringify(error);
      const parsed = JSON.parse(serialized);

      expect(parsed).toEqual(expect.objectContaining({
        name: 'InvalidRatingError',
        message: expect.stringContaining(testValue)
      }));
    });

    it('maintains error structure across serialization', () => {
      const testCases = [
        { ErrorClass: InvalidUrlError, value: 'http://invalid' },
        { ErrorClass: InvalidCurrencyError, value: 'INVALID' },
        { ErrorClass: InvalidRatingError, value: '10.0' }
      ];

      testCases.forEach(({ ErrorClass, value }) => {
        const error = new ErrorClass(value);
        const serialized = JSON.stringify(error);
        const parsed = JSON.parse(serialized);

        expect(parsed).toEqual(expect.objectContaining({
          name: error.name,
          message: expect.stringContaining(value)
        }));
      });
    });
  });
});
