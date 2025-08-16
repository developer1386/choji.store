// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  trackPageView,
  trackEvent,
  trackFormSubmission,
  trackWhatsAppClick,
  trackProductView,
  trackError,
  sendToAnalytics,
  InvalidEventNameError,
  InvalidUrlError,
  InvalidRatingError,
} from './analytics';

// Shared mock for Umami.track
const mockTrack = vi.fn().mockResolvedValue(undefined);

// Helper to build a fresh window with Umami available
const buildWindowWithUmami = () =>
  ({
    umami: {
      track: mockTrack,
    },
  } as any);

beforeEach(() => {
  vi.clearAllMocks();
  mockTrack.mockClear();
  vi.stubGlobal('window', buildWindowWithUmami());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Analytics Tracking', () => {
  describe('trackPageView', () => {
    it('tracks page views with correct parameters', async () => {
      const url = '/test-page';
      const referrer = 'https://example.com';

      await trackPageView(url, referrer);

      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack).toHaveBeenCalledWith('pageview', {
        url,
        referrer,
        websiteId: expect.any(String),
      });
    });

    it('handles missing referrer by using empty string', async () => {
      const url = '/test-page';

      await trackPageView(url);

      expect(mockTrack).toHaveBeenCalledWith('pageview', {
        url,
        referrer: '',
        websiteId: expect.any(String),
      });
    });

    it('validates URL parameter with custom error', async () => {
      await expect(trackPageView('')).rejects.toThrow(InvalidUrlError);
      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('handles tracking errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockTrack.mockRejectedValueOnce(new Error('Tracking failed'));

      await trackPageView('/test-page');

      expect(consoleSpy).toHaveBeenCalledWith('Analytics Error:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('does nothing when Umami is unavailable', async () => {
      vi.unstubAllGlobals();
      vi.stubGlobal('window', {} as any);

      await trackPageView('/no-umami');

      expect(mockTrack).not.toHaveBeenCalled();
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
        websiteId: expect.any(String),
      });
    });

    it('handles events without data', async () => {
      const eventName = 'test_event';

      await trackEvent(eventName);

      expect(mockTrack).toHaveBeenCalledWith(eventName, {
        websiteId: expect.any(String),
      });
    });

    it('validates event name parameter with custom error', async () => {
      await expect(trackEvent('')).rejects.toThrow(InvalidEventNameError);
      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('handles tracking errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockTrack.mockRejectedValueOnce(new Error('Tracking failed'));

      await trackEvent('test_event');

      expect(consoleSpy).toHaveBeenCalledWith('Analytics Error:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('does nothing when Umami is unavailable', async () => {
      vi.unstubAllGlobals();
      vi.stubGlobal('window', {} as any);

      await trackEvent('no_umami_event', { a: 1 });

      expect(mockTrack).not.toHaveBeenCalled();
    });
  });

  describe('helper trackers', () => {
    it('trackFormSubmission sends correct payload', async () => {
      await trackFormSubmission('order_form', true);
      expect(mockTrack).toHaveBeenCalledWith('form_submit', {
        form_name: 'order_form',
        success: true,
        websiteId: expect.any(String),
      });
    });

    it('trackWhatsAppClick sends correct payload', async () => {
      await trackWhatsAppClick('header_cta');
      expect(mockTrack).toHaveBeenCalledWith('whatsapp_click', {
        source: 'header_cta',
        websiteId: expect.any(String),
      });
    });

    it('trackProductView sends correct payload', async () => {
      await trackProductView('Premium Cat Food 250g');
      expect(mockTrack).toHaveBeenCalledWith('view_item', {
        item_name: 'Premium Cat Food 250g',
        item_category: 'cat_food',
        websiteId: expect.any(String),
      });
    });

    it('trackError sends non-fatal exception with context', async () => {
      const err = new Error('Boom');
      await trackError(err, 'checkout_step_1');
      expect(mockTrack).toHaveBeenCalledWith('exception', {
        description: 'Boom',
        fatal: false,
        context: 'checkout_step_1',
        websiteId: expect.any(String),
      });
    });
  });

  describe('sendToAnalytics (Web Vitals)', () => {
    it('sends CLS multiplied by 1000 to Umami', () => {
      // sendToAnalytics checks global "umami", not window.umami
      vi.stubGlobal('umami', { track: mockTrack } as any);

      sendToAnalytics({
        name: 'CLS',
        value: 0.123, // should become 123 after ×1000 + round
        id: 'abc',
        delta: 0,
        rating: 'good',
      } as any);

      expect(mockTrack).toHaveBeenCalledWith('web-vitals', {
        metric: 'CLS',
        value: 123,
        id: 'abc',
      });
    });

    it('sends non-CLS values as-is (rounded) to GA via wrapper', () => {
      const mockGtag = vi.fn();
      vi.stubGlobal('gtag', mockGtag);
      // Make window.gtag call through wrapper
      vi.stubGlobal('window', {
        ...buildWindowWithUmami(),
        gtag: mockGtag,
      } as any);

      sendToAnalytics({
        name: 'LCP',
        value: 2500.4, // rounded => 2500
        id: 'lcp-1',
        delta: 0,
        rating: 'good',
      } as any);

      expect(mockGtag).toHaveBeenCalledWith('event', 'LCP', {
        event_category: 'Web Vitals',
        value: 2500,
        event_label: 'lcp-1',
        non_interaction: true,
      });
    });

    it('throws InvalidRatingError and logs when rating is invalid', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.stubGlobal('umami', { track: mockTrack } as any);

      expect(() =>
        sendToAnalytics({
          name: 'LCP',
          value: 2000,
          id: 'bad-rating',
          delta: 0,
          rating: 'amazing' as any,
        } as any)
      ).toThrow(InvalidRatingError);

      expect(consoleSpy).toHaveBeenCalledWith('Analytics Error:', expect.any(InvalidRatingError));
      consoleSpy.mockRestore();
    });
  });
});
