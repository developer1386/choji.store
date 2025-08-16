import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackPageView, trackEvent } from './analytics';

// Set up DOM environment mock
const mockWindow = {
  umami: {
    track: vi.fn().mockResolvedValue(undefined)
  }
};

// Mock Umami analytics
vi.mock('@umami/client', () => ({
  default: {
    track: mockWindow.umami.track,
    init: vi.fn()
  }
}));

// Create global objects
vi.stubGlobal('window', mockWindow);
vi.stubGlobal('umami', mockWindow.umami);

describe('Analytics Tracking', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    mockWindow.umami.track.mockClear();
  });

  afterEach(() => {
    // Clean up globals
    vi.unstubAllGlobals();
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

      expect(mockWindow.umami.track).toHaveBeenCalledWith(eventName, {
        ...eventData,
        websiteId: expect.any(String)
      });
    });

    it('handles events without data', async () => {
      const eventName = 'test_event';

      await trackEvent(eventName);

      expect(mockWindow.umami.track).toHaveBeenCalledWith(eventName, {
        websiteId: expect.any(String)
      });
    });

    it('validates event names', () => {
      expect(() => trackEvent('')).toThrow('Event name is required');
      expect(() => {
        // @ts-expect-error Testing invalid input type
        trackEvent(undefined);
      }).toThrow('Event name is required');
    });

    it('handles tracking errors gracefully', async () => {
      // Mock tracking error
      mockWindow.umami.track.mockRejectedValueOnce(new Error('Tracking failed'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Should not throw but log error
      await trackEvent('test_event');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Analytics Error:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
