import { describe, it, expect } from 'vitest';
import { isValidUrl, isValidCurrency, isValidAvailability, isValidRating, isValidReviewCount } from './validators';

describe('Schema Validators', () => {
  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(isValidUrl('https://choji.store')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://sub.domain.com/path?query=value')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('ftp://invalid')).toBe(false);
    });
  });

  describe('isValidCurrency', () => {
    it('accepts valid currency codes', () => {
      expect(isValidCurrency('USD')).toBe(true);
      expect(isValidCurrency('EUR')).toBe(true);
      expect(isValidCurrency('GBP')).toBe(true);
    });

    it('rejects invalid currency codes', () => {
      expect(isValidCurrency('INVALID')).toBe(false);
      expect(isValidCurrency('US')).toBe(false);
      expect(isValidCurrency('')).toBe(false);
    });
  });

  describe('isValidAvailability', () => {
    it('accepts valid availability states', () => {
      expect(isValidAvailability('https://schema.org/InStock')).toBe(true);
      expect(isValidAvailability('https://schema.org/OutOfStock')).toBe(true);
      expect(isValidAvailability('https://schema.org/PreOrder')).toBe(true);
    });

    it('rejects invalid availability states', () => {
      expect(isValidAvailability('InStock')).toBe(false);
      expect(isValidAvailability('')).toBe(false);
      expect(isValidAvailability('https://schema.org/Invalid')).toBe(false);
    });
  });

  describe('isValidRating', () => {
    it('accepts valid rating values', () => {
      expect(isValidRating('0')).toBe(true);
      expect(isValidRating('3.5')).toBe(true);
      expect(isValidRating('5')).toBe(true);
    });

    it('rejects invalid rating values', () => {
      expect(isValidRating('-1')).toBe(false);
      expect(isValidRating('6')).toBe(false);
      expect(isValidRating('not a number')).toBe(false);
    });
  });

  describe('isValidReviewCount', () => {
    it('accepts valid review counts', () => {
      expect(isValidReviewCount('0')).toBe(true);
      expect(isValidReviewCount('100')).toBe(true);
      expect(isValidReviewCount('1000')).toBe(true);
    });

    it('rejects invalid review counts', () => {
      expect(isValidReviewCount('-1')).toBe(false);
      expect(isValidReviewCount('3.5')).toBe(false);
      expect(isValidReviewCount('not a number')).toBe(false);
    });
  });
});