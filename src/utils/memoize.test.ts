import { describe, it, expect, vi } from 'vitest';
import { memoizeValidator } from './memoize';

describe('memoizeValidator', () => {
  it('caches function results', () => {
    const fn = vi.fn((x: string) => x.toUpperCase());
    const memoized = memoizeValidator(fn);

    // First call - should execute function
    expect(memoized('test')).toBe('TEST');
    expect(fn).toHaveBeenCalledTimes(1);

    // Second call with same input - should use cache
    expect(memoized('test')).toBe('TEST');
    expect(fn).toHaveBeenCalledTimes(1);

    // Different input - should execute function
    expect(memoized('other')).toBe('OTHER');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('handles cache size limits', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoizeValidator(fn, 2); // Cache size of 2

    memoized(1); // Cache: [1]
    memoized(2); // Cache: [1, 2]
    memoized(3); // Cache: [2, 3] (1 should be evicted)

    // This should cause a new function call since 1 was evicted
    memoized(1);
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('allows clearing cache', () => {
    const fn = vi.fn((x: string) => x.toUpperCase());
    const memoized = memoizeValidator(fn);

    memoized('test');
    memoized.clearCache();
    memoized('test');

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('maintains correct types', () => {
    const numberValidator = memoizeValidator((x: number): boolean => x > 0);
    const stringValidator = memoizeValidator((s: string): boolean => s.length > 0);

    // These should type-check correctly
    const numResult: boolean = numberValidator(5);
    const strResult: boolean = stringValidator('test');

    expect(numResult).toBe(true);
    expect(strResult).toBe(true);
  });
});
