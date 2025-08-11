import { describe, it, expect } from 'vitest';
import { generateProductSchema } from './structuredData';

describe('generateProductSchema', () => {
  it('returns product schema with required fields', () => {
    const schema = generateProductSchema();
    expect(schema).toMatchObject({
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
});