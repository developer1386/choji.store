import { describe, it, expect } from 'vitest';
import {
  SchemaValidationError,
  InvalidUrlError,
  InvalidCurrencyError,
  InvalidAvailabilityError,
  InvalidRatingError,
  InvalidReviewCountError
} from './errors';

describe('Custom Error Classes', () => {
  describe('InvalidUrlError', () => {
    it('creates error with correct message and properties', () => {
      const url = 'invalid-url';
      const error = new InvalidUrlError(url);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(InvalidUrlError);
      expect(error.name).toBe('InvalidUrlError');
      expect(error.message).toContain(url);
    });
  });

  describe('InvalidCurrencyError', () => {
    it('creates error with correct message and properties', () => {
      const currency = 'INVALID';
      const error = new InvalidCurrencyError(currency);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(InvalidCurrencyError);
      expect(error.name).toBe('InvalidCurrencyError');
      expect(error.message).toContain(currency);
    });

    it('includes valid currencies in message', () => {
      const error = new InvalidCurrencyError('XXX');

      expect(error.message).toMatch(/valid currencies.*USD.*EUR.*GBP/i);
    });
  });

  describe('InvalidAvailabilityError', () => {
    it('creates error with correct message and properties', () => {
      const availability = 'invalid';
      const error = new InvalidAvailabilityError(availability);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(InvalidAvailabilityError);
      expect(error.name).toBe('InvalidAvailabilityError');
      expect(error.message).toContain(availability);
    });

    it('includes error type in name', () => {
      const error = new InvalidAvailabilityError('test');
      expect(error.name).toBe('InvalidAvailabilityError');
    });
  });

  describe('InvalidRatingError', () => {
    it('creates error with correct message and properties', () => {
      const rating = '6.0';
      const error = new InvalidRatingError(rating);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(InvalidRatingError);
      expect(error.name).toBe('InvalidRatingError');
      expect(error.message).toContain(rating);
    });

    it('includes valid range in message', () => {
      const error = new InvalidRatingError('10');
      expect(error.message).toMatch(/invalid rating/i);
    });
  });

  describe('InvalidReviewCountError', () => {
    it('creates error with correct message and properties', () => {
      const count = '-1';
      const error = new InvalidReviewCountError(count);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(InvalidReviewCountError);
      expect(error.name).toBe('InvalidReviewCountError');
      expect(error.message).toContain(count);
    });

    it('includes validation requirement in message', () => {
      const error = new InvalidReviewCountError('-5');
      expect(error.message).toMatch(/invalid review count/i);
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

  describe('Error Recovery', () => {
    it('can be safely serialized', () => {
      const error = new InvalidRatingError('6.0');
      const serialized = JSON.stringify(error);
      const parsed = JSON.parse(serialized);

      expect(parsed.name).toBe('InvalidRatingError');
      expect(parsed.message).toContain('6.0');
    });

    it('preserves error prototype after serialization', () => {
      const error = new InvalidUrlError('test');
      const serialized = JSON.stringify(error);
      const parsed = JSON.parse(serialized);

      expect(parsed.name).toBe('InvalidUrlError');
      expect(parsed.message).toContain('test');
    });
  });
});
