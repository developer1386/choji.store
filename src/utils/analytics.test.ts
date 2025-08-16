import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackPageView, trackEvent } from './analytics';

// Mock Umami analytics
vi.mock('@umami/client', () => ({
  default: {
    track: vi.fn(),
    init: vi.fn()
  }
}));

describe('Analytics Tracking', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Reset modules after each test
    vi.resetModules();
  });

  describe('trackPageView', () => {
    it('tracks page views with correct parameters', async () => {
      const url = '/test-page';
      const referrer = 'https://example.com';

      await trackPageView(url, referrer);

      expect(vi.mocked(window.umami?.track)).toHaveBeenCalledWith('pageview', {
        url,
        referrer,
        websiteId: expect.any(String)
      });
    });

    it('handles missing referrer', async () => {
      const url = '/test-page';

      await trackPageView(url);

      expect(vi.mocked(window.umami?.track)).toHaveBeenCalledWith('pageview', {
        url,
        websiteId: expect.any(String)
      });
    });
  });

  describe('trackEvent', () => {
    it('tracks events with correct parameters', async () => {
      const eventName = 'test_event';
      const eventData = { category: 'test', value: 'test_value' };

      await trackEvent(eventName, eventData);

      expect(vi.mocked(window.umami?.track)).toHaveBeenCalledWith(eventName, {
        ...eventData,
        websiteId: expect.any(String)
      });
    });

    it('handles events without data', async () => {
      const eventName = 'test_event';

      await trackEvent(eventName);

      expect(vi.mocked(window.umami?.track)).toHaveBeenCalledWith(eventName, {
        websiteId: expect.any(String)
      });
    });

    it('validates event names', async () => {
      await expect(trackEvent('')).rejects.toThrow('Event name is required');
      // @ts-expect-error Testing invalid input type
      await expect(trackEvent(undefined)).rejects.toThrow('Event name is required');
    });

    it('handles tracking errors gracefully', async () => {
      // Mock tracking error
      vi.mocked(window.umami?.track).mockRejectedValueOnce(new Error('Tracking failed'));

      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Should not throw but log error
      await trackEvent('test_event');
      
      expect(consoleError).toHaveBeenCalledWith(
        'Analytics Error:',
        expect.any(Error)
      );

      consoleError.mockRestore();
    });
  });
});
