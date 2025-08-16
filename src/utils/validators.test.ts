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
      expect(isValidUrl('https:///path')).toBe(false);
      expect(isValidUrl('https:/example.com')).toBe(false);
      expect(isValidUrl('http://example..com')).toBe(false);
    });

    it('handles URLs with special characters', () => {
      expect(isValidUrl('https://example.com/path with spaces')).toBe(true);
      expect(isValidUrl('https://example.com/über/path')).toBe(true);
      expect(isValidUrl('https://example.com/path#fragment')).toBe(true);
      expect(isValidUrl('https://example.com/path?q=test&lang=en')).toBe(true);
      expect(isValidUrl('https://example.com/path?q=%20test')).toBe(true);
      expect(isValidUrl('https://ünicöde.com/path')).toBe(true);
      expect(isValidUrl('https://example.com/path/with/~tilde')).toBe(true);
      expect(isValidUrl('https://example.com/path.with.dots')).toBe(true);
    });

    it('validates IPv4 and IPv6 URLs', () => {
      expect(isValidUrl('http://192.168.1.1')).toBe(true);
      expect(isValidUrl('http://192.168.1.1:8080')).toBe(true);
      expect(isValidUrl('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')).toBe(true);
      expect(isValidUrl('http://[2001:db8::1]:8080')).toBe(true);
    });

    it('handles various URL schemes', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('ftp://example.com')).toBe(false); // We only allow http/https
      expect(isValidUrl('ws://example.com')).toBe(false);
      expect(isValidUrl('wss://example.com')).toBe(false);
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error Testing invalid input type
      expect(() => isValidUrl(null)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidUrl(undefined)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidUrl(123)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidUrl({})).toThrow(TypeError);
    });
  });

  describe('isValidCurrency with memoization', () => {
    it('validates and caches correct currency codes', () => {
      // First calls - Major currencies
      expect(isValidCurrency('USD')).toBe(true); // US Dollar
      expect(isValidCurrency('EUR')).toBe(true); // Euro
      expect(isValidCurrency('GBP')).toBe(true); // British Pound
      expect(isValidCurrency('JPY')).toBe(true); // Japanese Yen
      expect(isValidCurrency('CNY')).toBe(true); // Chinese Yuan
      expect(isValidCurrency('CHF')).toBe(true); // Swiss Franc
      expect(isValidCurrency('AUD')).toBe(true); // Australian Dollar
      expect(isValidCurrency('CAD')).toBe(true); // Canadian Dollar

      // Cache hits
      expect(isValidCurrency('USD')).toBe(true);
      expect(isValidCurrency('EUR')).toBe(true);

      // Less common but valid currencies
      expect(isValidCurrency('SGD')).toBe(true); // Singapore Dollar
      expect(isValidCurrency('NZD')).toBe(true); // New Zealand Dollar
      expect(isValidCurrency('HKD')).toBe(true); // Hong Kong Dollar
      expect(isValidCurrency('SEK')).toBe(true); // Swedish Krona
    });

    it('caches invalid currency codes', () => {
      // First calls
      expect(isValidCurrency('INVALID')).toBe(false);
      expect(isValidCurrency('FAKE')).toBe(false);
      
      // Cache hits
      expect(isValidCurrency('INVALID')).toBe(false);
      expect(isValidCurrency('FAKE')).toBe(false);
    });

    it('handles case sensitivity', () => {
      expect(isValidCurrency('usd')).toBe(false);
      expect(isValidCurrency('Usd')).toBe(false);
      expect(isValidCurrency('USD')).toBe(true);
      expect(isValidCurrency('UsD')).toBe(false);
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

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error Testing invalid input type
      expect(() => isValidCurrency(null)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidCurrency(undefined)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidCurrency(123)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidCurrency({})).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidCurrency([])).toThrow(TypeError);
    });
  });

  describe('isValidRating', () => {
    it('accepts valid rating values', () => {
      // Integer ratings
      expect(isValidRating('0')).toBe(true);
      expect(isValidRating('1')).toBe(true);
      expect(isValidRating('2')).toBe(true);
      expect(isValidRating('3')).toBe(true);
      expect(isValidRating('4')).toBe(true);
      expect(isValidRating('5')).toBe(true);

      // Decimal ratings
      expect(isValidRating('0.0')).toBe(true);
      expect(isValidRating('0.5')).toBe(true);
      expect(isValidRating('1.5')).toBe(true);
      expect(isValidRating('2.5')).toBe(true);
      expect(isValidRating('3.5')).toBe(true);
      expect(isValidRating('5')).toBe(true);
    });

    it('rejects invalid rating values', () => {
      // Out of range values
      expect(isValidRating('-1')).toBe(false);
      expect(isValidRating('5.1')).toBe(false);
      expect(isValidRating('6')).toBe(false);
      expect(isValidRating('10')).toBe(false);
      expect(isValidRating('-0.5')).toBe(false);

      // Invalid decimal values
      expect(isValidRating('3.51')).toBe(false);
      expect(isValidRating('3.99')).toBe(false);
      expect(isValidRating('4.1')).toBe(false);
      expect(isValidRating('3.333')).toBe(false);

      // Invalid formats
      expect(isValidRating('3,5')).toBe(false); // Wrong decimal separator
      expect(isValidRating('3.')).toBe(false); // Missing decimal places
      expect(isValidRating('.5')).toBe(false); // Missing leading zero
      expect(isValidRating('five')).toBe(false); // Text instead of number
      expect(isValidRating('')).toBe(false); // Empty string
      expect(isValidRating(' 3.5')).toBe(false); // Leading space
      expect(isValidRating('3.5 ')).toBe(false); // Trailing space
    });

    it('handles edge cases', () => {
      // Boundary values
      expect(isValidRating('0.00')).toBe(false); // Too many decimal places
      expect(isValidRating('5.00')).toBe(false); // Too many decimal places
      expect(isValidRating('+3.5')).toBe(false); // Explicit positive sign
      expect(isValidRating('3.50')).toBe(false); // Extra zero
      expect(isValidRating('03.5')).toBe(false); // Leading zero
      expect(isValidRating('3.5e0')).toBe(false); // Scientific notation
    });

    it('throws TypeError for non-string input', () => {
      // @ts-expect-error Testing invalid input type
      expect(() => isValidRating(null)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidRating(undefined)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidRating(3.5)).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidRating({})).toThrow(TypeError);
      // @ts-expect-error Testing invalid input type
      expect(() => isValidRating([])).toThrow(TypeError);
    });
  });
});
