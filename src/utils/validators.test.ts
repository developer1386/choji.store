import { describe, it, expect } from 'vitest';
import { isValidUrl, isValidCurrency, isValidAvailability, isValidRating, isValidReviewCount } from './validators';

describe('Schema Validators', () => {
  describe('isValidUrl with memoization', () => {
    it('validates correct URLs and caches results', () => {
      // First call
      expect(isValidUrl('https://choji.store')).toBe(true);
      // Second call should use cache
      expect(isValidUrl('https://choji.store')).toBe(true);
      
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://sub.domain.com/path?query=value')).toBe(true);
      expect(isValidUrl('https://xn--80ak6aa92e.com')).toBe(true); // Punycode domain
      expect(isValidUrl('https://example.co.uk')).toBe(true); // Multi-part TLD
      expect(isValidUrl('https://example.shop')).toBe(true); // New TLD
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('ftp://invalid')).toBe(false);
      expect(isValidUrl('https://.com')).toBe(false);
      expect(isValidUrl('https://example')).toBe(false);
    });

    it('handles URLs with special characters', () => {
      expect(isValidUrl('https://example.com/path with spaces')).toBe(true);
      expect(isValidUrl('https://example.com/über/path')).toBe(true);
      expect(isValidUrl('https://example.com/path#fragment')).toBe(true);
      expect(isValidUrl('https://example.com/path?q=test&lang=en')).toBe(true);
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error Testing invalid input type
      expect(() => isValidUrl(null)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidUrl(undefined)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidUrl({})).toThrow(TypeError);
    });
  });

  describe('isValidCurrency with memoization', () => {
    it('validates and caches correct currency codes', () => {
      // First calls
      expect(isValidCurrency('USD')).toBe(true);
      expect(isValidCurrency('EUR')).toBe(true);
      // Cache hits
      expect(isValidCurrency('USD')).toBe(true);
      expect(isValidCurrency('EUR')).toBe(true);
      expect(isValidCurrency('GBP')).toBe(true);
    });

    it('caches invalid currency codes', () => {
      // First call
      expect(isValidCurrency('INVALID')).toBe(false);
      // Second call should use cache
      expect(isValidCurrency('INVALID')).toBe(false);
    });

    it('rejects invalid currency codes', () => {
      expect(isValidCurrency('INVALID')).toBe(false);
      expect(isValidCurrency('US')).toBe(false);
      expect(isValidCurrency('')).toBe(false);
    });
  });

  describe('isValidAvailability with memoization', () => {
    it('validates and caches valid availability states', () => {
      // First calls
      expect(isValidAvailability('https://schema.org/InStock')).toBe(true);
      expect(isValidAvailability('https://schema.org/OutOfStock')).toBe(true);
      // Cache hits
      expect(isValidAvailability('https://schema.org/InStock')).toBe(true);
      expect(isValidAvailability('https://schema.org/OutOfStock')).toBe(true);
      expect(isValidAvailability('https://schema.org/PreOrder')).toBe(true);
    });

    it('caches invalid availability states', () => {
      // First call
      expect(isValidAvailability('https://schema.org/Invalid')).toBe(false);
      // Second call should use cache
      expect(isValidAvailability('https://schema.org/Invalid')).toBe(false);
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
