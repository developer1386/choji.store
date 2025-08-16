import { describe, it, expect, vi, beforeEach } from 'vitest';
import { memoizeValidator } from './memoize';

describe('memoizeValidator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

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

  it('handles complex object inputs', () => {
    const fn = vi.fn((obj: { a: number; b: string[] }) => obj.b.length);
    const memoized = memoizeValidator(fn);

    const input1 = { a: 1, b: ['test'] };
    const input2 = { a: 1, b: ['test'] };
    const input3 = { a: 2, b: ['test'] };

    expect(memoized(input1)).toBe(1);
    expect(memoized(input2)).toBe(1); // Should use cache despite different object reference
    expect(memoized(input3)).toBe(1); // Should call function due to different value
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('respects TTL for cached values', () => {
    const fn = vi.fn((x: string) => x.toUpperCase());
    const memoized = memoizeValidator(fn);

    memoized('test');
    expect(fn).toHaveBeenCalledTimes(1);

    // Advance time by 4 minutes (within TTL)
    vi.advanceTimersByTime(4 * 60 * 1000);
    memoized('test');
    expect(fn).toHaveBeenCalledTimes(1); // Should still use cache

    // Advance time by 2 more minutes (beyond TTL)
    vi.advanceTimersByTime(2 * 60 * 1000);
    memoized('test');
    expect(fn).toHaveBeenCalledTimes(2); // Should call function again
  });

  it('handles undefined and null inputs', () => {
    const fn = vi.fn((x: unknown) => String(x));
    const memoized = memoizeValidator(fn);

    expect(memoized(undefined)).toBe('undefined');
    expect(memoized(null)).toBe('null');
    expect(memoized(undefined)).toBe('undefined'); // Should use cache
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('maintains performance with large datasets', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoizeValidator(fn, 1000);
    const iterations = 2000;

    // First pass - fill cache
    for (let i = 0; i < iterations; i++) {
      memoized(i % 1000); // Keep within cache size
    }

    const initialCalls = fn.mock.calls.length;

    // Second pass - should use cache for most calls
    for (let i = 0; i < iterations; i++) {
      memoized(i % 1000);
    }

    // Verify that cache was effective
    expect(fn.mock.calls.length - initialCalls).toBeLessThan(iterations * 0.1); // Less than 10% of calls should miss cache
  });
});
