import { describe, it, expect } from 'vitest';
import { isValidUrl, isValidCurrency, isValidAvailability, isValidRating, isValidReviewCount, isValidSchemaUrl } from './validators';

describe('Schema Validators', () => {
  describe('isValidUrl with memoization', () => {
    it('validates correct URLs and caches results', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://sub.example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=1')).toBe(true);
      expect(isValidUrl('https://example.com:8080')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('https:/example.com')).toBe(false);
      expect(isValidUrl('https:///path')).toBe(false);
      expect(isValidUrl('https://example..com')).toBe(false);
      expect(isValidUrl('https://-example.com')).toBe(false);
      expect(isValidUrl('https://example-.com')).toBe(false);
      expect(isValidUrl('https://example.com//path')).toBe(false);
    });

    it('handles URLs with special characters', () => {
      expect(isValidUrl('https://example.com/@user')).toBe(true);
      expect(isValidUrl('https://example.com/path%20with%20spaces')).toBe(true);
      expect(isValidUrl('https://example.com/£$&!*')).toBe(true);
    });

    it('validates IPv4 and IPv6 URLs', () => {
      expect(isValidUrl('http://192.168.1.1')).toBe(true);
      expect(isValidUrl('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')).toBe(true);
      expect(isValidUrl('http://256.256.256.256')).toBe(false);
      expect(isValidUrl('http://1.2.3')).toBe(false);
    });

    it('handles various URL schemes', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('//example.com')).toBe(false);
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error testing invalid input
      expect(() => isValidUrl(123)).toThrow(TypeError);
      // @ts-expect-error testing invalid input
      expect(() => isValidUrl(null)).toThrow(TypeError);
      // @ts-expect-error testing invalid input
      expect(() => isValidUrl(undefined)).toThrow(TypeError);
    });
  });

  describe('isValidSchemaUrl with memoization', () => {
    it('validates correct schema.org URLs', () => {
      expect(isValidSchemaUrl('https://schema.org/InStock')).toBe(true);
      expect(isValidSchemaUrl('http://schema.org/Product')).toBe(true);
      expect(isValidSchemaUrl('https://www.schema.org/Organization')).toBe(true);
      expect(isValidSchemaUrl('https://docs.schema.org/Person')).toBe(true);
    });

    it('rejects invalid schema.org URLs', () => {
      // Invalid domains
      expect(isValidSchemaUrl('https://not-schema.org/InStock')).toBe(false);
      expect(isValidSchemaUrl('https://fake.schema.org/Product')).toBe(false);
      expect(isValidSchemaUrl('https://schema.org.fake.com/Product')).toBe(false);
      
      // Invalid paths
      expect(isValidSchemaUrl('https://schema.org')).toBe(false);
      expect(isValidSchemaUrl('https://schema.org/')).toBe(false);
      expect(isValidSchemaUrl('https://schema.org//Product')).toBe(false);
      
      // With query parameters (not allowed)
      expect(isValidSchemaUrl('https://schema.org/Product?version=2')).toBe(false);
      
      // With ports (not allowed)
      expect(isValidSchemaUrl('https://schema.org:8080/Product')).toBe(false);
    });

    it('handles malicious URL patterns', () => {
      expect(isValidSchemaUrl('http://evil.com/schema.org/Product')).toBe(false);
      expect(isValidSchemaUrl('http://evil.com?redirect=schema.org')).toBe(false);
      expect(isValidSchemaUrl('http://schema.org.evil.com/Product')).toBe(false);
      expect(isValidSchemaUrl('http://evil.com#schema.org')).toBe(false);
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error testing invalid input
      expect(() => isValidSchemaUrl(123)).toThrow(TypeError);
      // @ts-expect-error testing invalid input
      expect(() => isValidSchemaUrl(null)).toThrow(TypeError);
      // @ts-expect-error testing invalid input
      expect(() => isValidSchemaUrl(undefined)).toThrow(TypeError);
    });
  });

  describe('isValidCurrency with memoization', () => {
    it('validates and caches correct currency codes', () => {
      expect(isValidCurrency('USD')).toBe(true); // US Dollar
      expect(isValidCurrency('EUR')).toBe(true); // Euro
      expect(isValidCurrency('GBP')).toBe(true); // British Pound
      expect(isValidCurrency('JPY')).toBe(true); // Japanese Yen
      expect(isValidCurrency('CNY')).toBe(true); // Chinese Yuan
      expect(isValidCurrency('CHF')).toBe(true); // Swiss Franc
      expect(isValidCurrency('AUD')).toBe(true); // Australian Dollar
    });

    it('caches invalid currency codes', () => {
      expect(isValidCurrency('INVALID')).toBe(false);
      expect(isValidCurrency('XX')).toBe(false);
      expect(isValidCurrency('USDD')).toBe(false);
    });

    it('handles case sensitivity', () => {
      expect(isValidCurrency('usd')).toBe(false);
      expect(isValidCurrency('UsD')).toBe(false);
    });

    it('rejects invalid currency codes', () => {
      expect(isValidCurrency('')).toBe(false);
      expect(isValidCurrency('U')).toBe(false);
      expect(isValidCurrency('12345')).toBe(false);
    });
  });

  describe('isValidAvailability with memoization', () => {
    it('validates and caches valid availability states', () => {
      expect(isValidAvailability('https://schema.org/InStock')).toBe(true);
      expect(isValidAvailability('https://schema.org/OutOfStock')).toBe(true);
      expect(isValidAvailability('https://schema.org/PreOrder')).toBe(true);
    });

    it('rejects invalid availability states', () => {
      expect(isValidAvailability('InStock')).toBe(false);
      expect(isValidAvailability('https://schema.org/NotARealState')).toBe(false);
      expect(isValidAvailability('https://fake.org/InStock')).toBe(false);
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error testing invalid input
      expect(() => isValidAvailability(123)).toThrow(TypeError);
      // @ts-expect-error testing invalid input
      expect(() => isValidAvailability(null)).toThrow(TypeError);
    });
  });

  describe('isValidRating', () => {
    it('accepts valid rating values', () => {
      expect(isValidRating('0')).toBe(true);
      expect(isValidRating('5')).toBe(true);
      expect(isValidRating('4.5')).toBe(true);
      expect(isValidRating('3.75')).toBe(true);
      expect(isValidRating('2.25')).toBe(true);
    });

    it('rejects invalid rating values', () => {
      expect(isValidRating('-1')).toBe(false);
      expect(isValidRating('6')).toBe(false);
      expect(isValidRating('3.3')).toBe(false);
      expect(isValidRating('4.555')).toBe(false);
      expect(isValidRating('abc')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isValidRating('0.0')).toBe(true);
      expect(isValidRating('5.0')).toBe(true);
      expect(isValidRating('3.0')).toBe(true);
      expect(isValidRating('.5')).toBe(false);
      expect(isValidRating('4.')).toBe(false);
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error testing invalid input
      expect(() => isValidRating(4.5)).toThrow(TypeError);
      // @ts-expect-error testing invalid input
      expect(() => isValidRating(null)).toThrow(TypeError);
    });
  });

  describe('isValidReviewCount', () => {
    it('accepts valid review counts', () => {
      expect(isValidReviewCount('0')).toBe(true);
      expect(isValidReviewCount('1')).toBe(true);
      expect(isValidReviewCount('999')).toBe(true);
      expect(isValidReviewCount('1000000')).toBe(true);
    });

    it('rejects invalid review counts', () => {
      expect(isValidReviewCount('-1')).toBe(false);
      expect(isValidReviewCount('1.5')).toBe(false);
      expect(isValidReviewCount('abc')).toBe(false);
      expect(isValidReviewCount('12345678901')).toBe(false); // Too long
    });

    it('handles leading zeros', () => {
      expect(isValidReviewCount('0')).toBe(true);
      expect(isValidReviewCount('01')).toBe(false);
      expect(isValidReviewCount('0123')).toBe(false);
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error testing invalid input
      expect(() => isValidReviewCount(123)).toThrow(TypeError);
      // @ts-expect-error testing invalid input
      expect(() => isValidReviewCount(null)).toThrow(TypeError);
    });
  });
});
