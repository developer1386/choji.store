/**
 * Cache system for schema generation to improve performance
 * @module schemaCache
 */

import type { OrganizationSchema, ProductSchema, WebsiteSchema } from './types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  key: string;
}

class SchemaCache {
  private static instance: SchemaCache;
  private cache: Map<string, CacheEntry<unknown>>;
  private readonly TTL = 5 * 60 * 1000; // 5 minutes cache TTL

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): SchemaCache {
    if (!SchemaCache.instance) {
      SchemaCache.instance = new SchemaCache();
    }
    return SchemaCache.instance;
  }

  /**
   * Generate a cache key from configuration object
   */
  private generateKey(prefix: string, config?: object): string {
    return `${prefix}:${config ? JSON.stringify(config) : 'default'}`;
  }

  /**
   * Check if a cached entry is still valid
   */
  private isValid(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp < this.TTL;
  }

  /**
   * Get a cached schema if available and valid
   */
  get<T>(prefix: string, config?: object): T | undefined {
    const key = this.generateKey(prefix, config);
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (entry && this.isValid(entry)) {
      return entry.data;
    }

    if (entry) {
      // Remove expired entry
      this.cache.delete(key);
    }

    return undefined;
  }

  /**
   * Store a schema in the cache
   */
  set<T>(prefix: string, data: T, config?: object): void {
    const key = this.generateKey(prefix, config);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      key
    });
  }

  /**
   * Clear all cached schemas
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Remove expired entries from the cache
   */
  cleanup(): void {
    for (const [key, entry] of this.cache.entries()) {
      if (!this.isValid(entry)) {
        this.cache.delete(key);
      }
    }
  }
}

export const schemaCache = SchemaCache.getInstance();
