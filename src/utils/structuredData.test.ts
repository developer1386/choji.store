import { describe, it, expect } from 'vitest';
import { generateProductSchema, generateOrganizationSchema } from './structuredData';

describe('generateProductSchema', () => {
  // Test basic schema structure
  it('returns product schema with required fields', () => {
    const schema = generateProductSchema();
    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: expect.any(String),
      description: expect.any(String),
      brand: {
        '@type': 'Brand',
        name: expect.any(String),
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: expect.any(String),
        availability: expect.any(String),
        seller: {
          '@type': 'Organization',
          name: expect.any(String),
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: expect.any(String),
        reviewCount: expect.any(String),
      },
    });
  });

  // Test schema context
  it('includes correct schema.org context', () => {
    const schema = generateProductSchema();
    expect(schema['@context']).toBe('https://schema.org');
  });

  // Test data validation
  it('has valid offer price currency', () => {
    const schema = generateProductSchema();
    expect(schema.offers.priceCurrency).toMatch(/^[A-Z]{3}$/);
  });

  // Test rating constraints
  it('has valid rating value range', () => {
    const schema = generateProductSchema();
    const rating = parseFloat(schema.aggregateRating.ratingValue);
    expect(rating).toBeGreaterThanOrEqual(0);
    expect(rating).toBeLessThanOrEqual(5);
  });

  // Test custom values
  it('accepts custom values for all fields', () => {
    const schema = generateProductSchema({
      name: 'Test Product',
      description: 'Test Description',
      brand: 'Test Brand',
      price: '99.99',
      currency: 'USD',
      availability: 'InStock',
      seller: 'Test Seller',
      rating: '4.5',
      reviews: '100',
      image: 'https://example.com/test.jpg',
      sku: 'TEST123',
    });

    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Test Product',
      description: 'Test Description',
      image: 'https://example.com/test.jpg',
      sku: 'TEST123',
      brand: {
        '@type': 'Brand',
        name: 'Test Brand',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '99.99',
        availability: 'InStock',
        seller: {
          '@type': 'Organization',
          name: 'Test Seller',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        reviewCount: '100',
      },
    });
  });
});
describe('generateOrganizationSchema', () => {
  it('returns organization schema with required fields', () => {
    const schema = generateOrganizationSchema();
    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: expect.any(String),
      url: expect.any(String),
      logo: expect.any(String),
      description: expect.any(String),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: expect.any(String),
        contactType: expect.any(String),
        availableLanguage: expect.any(String),
      },
    });
  });

  it('has valid URL format', () => {
    const schema = generateOrganizationSchema();
    expect(schema.url).toMatch(/^https?:\/\/.+/);
    expect(schema.logo).toMatch(/^https?:\/\/.+/);
  });
});