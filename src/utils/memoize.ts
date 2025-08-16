/**
 * Utility for memoizing validation functions
 * @module memoize
 */

type ValidatorFn<TInput, TOutput> = (input: TInput) => TOutput;

interface MemoizedValidator<TInput, TOutput> {
  (input: TInput): TOutput;
  clearCache(): void;
}

/**
 * Creates a memoized version of a validation function
 * @template TInput The input type for the validator
 * @template TOutput The output type from the validator
 * @param {ValidatorFn<TInput, TOutput>} fn The validation function to memoize
 * @param {number} maxSize Maximum cache size (default: 100)
 * @returns {MemoizedValidator<TInput, TOutput>} Memoized validator with cache clearing capability
 */
export function memoizeValidator<TInput, TOutput>(
  fn: ValidatorFn<TInput, TOutput>,
  maxSize = 100
): MemoizedValidator<TInput, TOutput> {
  const cache = new Map<string, { value: TOutput; timestamp: number }>();
  const TTL = 5 * 60 * 1000; // 5 minutes cache TTL

  function cleanup() {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (now - entry.timestamp > TTL) {
        cache.delete(key);
      }
    }
  }

  const memoized = (input: TInput): TOutput => {
    // Clean up old entries if cache is too large
    if (cache.size >= maxSize) {
      cleanup();
      // If still too large, remove oldest entries
      if (cache.size >= maxSize) {
        const entries = Array.from(cache.entries());
        if (entries.length > 0) {
          cache.delete(entries[0][0]); // Delete oldest entry
        }
      }
    }

    const key = JSON.stringify(input);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < TTL) {
      return cached.value;
    }

    const result = fn(input);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  };

  memoized.clearCache = () => cache.clear();

  return memoized;
}
