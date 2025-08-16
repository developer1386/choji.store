import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackPageView, trackEvent } from './analytics';

// Mock Umami tracker
const mockTrack = vi.fn();
vi.mock('@umami/client', () => ({
  default: {
    track: mockTrack,
    init: vi.fn()
  }
}));

// Mock window.umami
const mockUmami = { track: mockTrack };
vi.stubGlobal('umami', mockUmami);

describe('Analytics Tracking', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  afterEach(() => {
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

      expect(mockTrack).toHaveBeenCalledWith(eventName, {
        ...eventData,
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

    it('validates event names', () => {
      expect(() => trackEvent('')).toThrow('Event name is required');
      // @ts-expect-error Testing invalid input type
      expect(() => trackEvent(undefined)).toThrow('Event name is required');
    });

    it('handles tracking errors gracefully', async () => {
      // Mock tracking error
      mockTrack.mockRejectedValueOnce(new Error('Tracking failed'));

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
