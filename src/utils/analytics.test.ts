import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { trackPageView, trackEvent } from './analytics';

// Set up mock tracking function that can be accessed throughout tests
const mockTrack = vi.fn().mockResolvedValue(undefined);

// Create window mock that matches our implementation needs
const mockWindow = {
  umami: {
    track: mockTrack
  }
};

// Set up the test environment once before all tests
beforeAll(() => {
  // Stub the global window object
  vi.stubGlobal('window', mockWindow);
});

describe('Analytics Tracking', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockTrack.mockClear();
  });

  afterEach(() => {
    // Clean up after each test
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  describe('trackPageView', () => {
    it('tracks page views with correct parameters', async () => {
      const url = '/test-page';
      const referrer = 'https://example.com';

      await trackPageView(url, referrer);

      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack).toHaveBeenCalledWith('pageview', {
        url,
        referrer,
        websiteId: expect.any(String)
      });
    });

    it('handles missing referrer by using empty string', async () => {
      const url = '/test-page';
      
      await trackPageView(url);

      expect(mockTrack).toHaveBeenCalledWith('pageview', {
        url,
        referrer: '',
        websiteId: expect.any(String)
      });
    });

    it('validates URL parameter', async () => {
      await expect(trackPageView('')).rejects.toThrow('URL is required');
      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('handles tracking errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockTrack.mockRejectedValueOnce(new Error('Tracking failed'));

      await trackPageView('/test-page');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Analytics Error:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('trackEvent', () => {
    it('tracks events with correct parameters', async () => {
      const eventName = 'test_event';
      const data = { key: 'value' };

      await trackEvent(eventName, data);

      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack).toHaveBeenCalledWith(eventName, {
        ...data,
        websiteId: expect.any(String)
      });
    });

    it('handles events without data', async () => {
      const eventName = 'test_event';

      await trackEvent(eventName);

      expect(mockTrack).toHaveBeenCalledWith(eventName, {
        websiteId: expect.any(String)
      });
    });

    it('validates event name parameter', async () => {
      await expect(trackEvent('')).rejects.toThrow('Event name is required');
      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('handles tracking errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockTrack.mockRejectedValueOnce(new Error('Tracking failed'));

      await trackEvent('test_event');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Analytics Error:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});

