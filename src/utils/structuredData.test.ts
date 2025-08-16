import { describe, it, expect } from 'vitest';
import { generateProductSchema, generateOrganizationSchema } from './schemaGenerators';

describe('Structured Data Generators', () => {
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

    // Test custom field overrides
    it('allows overriding default values', () => {
      const customSchema = generateProductSchema({
        name: 'Custom Product',
        description: 'Custom description'
      });

      expect(customSchema.name).toBe('Custom Product');
      expect(customSchema.description).toBe('Custom description');
    });

    // Test optional fields
    it('handles optional fields correctly', () => {
      const schema = generateProductSchema({
        category: 'Pet Food'
      });

      expect(schema.category).toBe('Pet Food');
    });

    // Test data validation
    it('validates all data constraints', () => {
      const schema = generateProductSchema();
      
      // Currency validation
      expect(schema.offers.priceCurrency).toMatch(/^[A-Z]{3}$/);
      
      // Availability validation
      expect(schema.offers.availability).toMatch(/^https:\/\/schema\.org\/(InStock|OutOfStock|PreOrder|Discontinued)$/);
      
      // Rating validation
      if (schema.aggregateRating) {
        const ratingValue = parseFloat(schema.aggregateRating.ratingValue);
        expect(ratingValue).toBeGreaterThanOrEqual(0);
        expect(ratingValue).toBeLessThanOrEqual(5);
        
        const reviewCount = parseInt(schema.aggregateRating.reviewCount);
        expect(reviewCount).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('generateOrganizationSchema', () => {
    it('returns organization schema with required fields', () => {
      const schema = generateOrganizationSchema();
      expect(schema).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: expect.any(String),
        logo: expect.any(String)
      });
    });

    it('allows overriding default values', () => {
      const customSchema = generateOrganizationSchema({
        name: 'Custom Organization',
        description: 'Custom description',
        url: 'https://example.com'
      });

      expect(customSchema.name).toBe('Custom Organization');
      expect(customSchema.description).toBe('Custom description');
      expect(customSchema.url).toBe('https://example.com');
    });

    it('validates contactPoint data', () => {
      const schema = generateOrganizationSchema();

      // Verify that the generated schema has valid contact information
      if (schema.contactPoint) {
        expect(schema.contactPoint).toMatchObject({
          '@type': 'ContactPoint',
          telephone: expect.any(String),
          contactType: expect.any(String)
        });
      }
    });

    it('validates URLs', () => {
      const schema = generateOrganizationSchema({
        url: 'https://example.com'
      });

      expect(schema.url).toBe('https://example.com');
      expect(schema.logo).toMatch(/^https?:\/\//);

      if (schema.sameAs) {
        schema.sameAs.forEach(url => {
          expect(url).toMatch(/^https?:\/\//);
        });
      }
    });
  });

  // Test custom field overrides
  it('allows overriding default values', () => {
    const customSchema = generateProductSchema({
      name: 'Custom Product',
      description: 'Custom description'
    });

    expect(customSchema.name).toBe('Custom Product');
    expect(customSchema.description).toBe('Custom description');
  });

  // Test optional fields
  it('handles optional fields correctly', () => {
    const schema = generateProductSchema({
      category: 'Pet Food'
    });

    expect(schema.category).toBe('Pet Food');
  });

  // Test availability validation
  it('validates availability URLs', () => {
    const schema = generateProductSchema();
    expect(schema.offers.availability).toMatch(/^https:\/\/schema\.org\/(InStock|OutOfStock|PreOrder|Discontinued)$/);
  });

  // Test rating constraints
  it('has valid rating values', () => {
    const schema = generateProductSchema();
    if (!schema.aggregateRating?.ratingValue) {
      throw new Error('Rating value is required but was not present');
    }

    const ratingValue = parseFloat(schema.aggregateRating.ratingValue);
    expect(ratingValue).toBeGreaterThanOrEqual(0);
    expect(ratingValue).toBeLessThanOrEqual(5);
  });
    const rating = parseFloat(schema.aggregateRating.ratingValue);
    expect(rating).toBeGreaterThanOrEqual(0);
    expect(rating).toBeLessThanOrEqual(5);
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

describe('Combined Schema Generation', () => {
  it('maintains consistent organization data across schemas', () => {
    const orgSchema = generateOrganizationSchema();
    const productSchema = generateProductSchema();

    // Organization details should be consistent
    expect(productSchema.brand.name).toBe(orgSchema.name);
    expect(productSchema.offers.seller.name).toBe(orgSchema.name);
    expect(productSchema.offers.seller['@type']).toBe('Organization');
  });

  it('validates cross-schema references', () => {
    const orgSchema = generateOrganizationSchema({
      name: 'Custom Store Name',
      url: 'https://custom-store.com'
    });
    
    const productSchema = generateProductSchema({
      brandName: 'Custom Store Name'
    });

    // Brand consistency check
    expect(productSchema.brand.name).toBe(orgSchema.name);
    
    // Seller details consistency check
    expect(productSchema.offers.seller).toMatchObject({
      '@type': 'Organization',
      name: orgSchema.name
    });
  });

  it('handles brand and organization name changes consistently', () => {
    const customName = 'Test Store Name';
    
    const orgSchema = generateOrganizationSchema({
      name: customName
    });
    
    const productSchema = generateProductSchema({
      brandName: customName
    });

    // Verify name consistency across schemas
    expect(orgSchema.name).toBe(customName);
    expect(productSchema.brand.name).toBe(customName);
    expect(productSchema.offers.seller.name).toBe(customName);
  });
});