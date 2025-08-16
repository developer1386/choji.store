import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackPageView, trackEvent } from './analytics';

// Set up DOM environment mock with type safety
interface MockWindow {
  umami: {
    track: ReturnType<typeof vi.fn>;
  };
  location: {
    href: string;
  };
}

const mockWindow: MockWindow = {
  umami: {
    track: vi.fn().mockResolvedValue(undefined)
  },
  location: {
    href: 'http://localhost:3000/'
  }
};

// Mock Umami analytics
vi.mock('@umami/client', () => ({
  default: {
    track: mockWindow.umami.track,
    init: vi.fn()
  }
}));

describe('Analytics Tracking', () => {
  beforeEach(() => {
    // Set up global objects and reset mocks
    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('umami', mockWindow.umami);
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

      expect(mockWindow.umami.track).toHaveBeenCalledTimes(1);
      expect(mockWindow.umami.track).toHaveBeenCalledWith('pageview', {
        url,
        referrer,
        websiteId: expect.any(String)
      });
    });

    it('handles missing referrer by using empty string', async () => {
      const url = '/test-page';
      
      await trackPageView(url);

      expect(mockWindow.umami.track).toHaveBeenCalledWith('pageview', {
        url,
        referrer: '',
        websiteId: expect.any(String)
      });
    });

    it('validates URL parameter', async () => {
      await expect(trackPageView('')).rejects.toThrow('URL is required');
      expect(mockWindow.umami.track).not.toHaveBeenCalled();
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

    it('validates event name parameter', async () => {
      await expect(trackEvent('')).rejects.toThrow('Event name is required');
      expect(mockWindow.umami.track).not.toHaveBeenCalled();
    });

    it('handles tracking errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockWindow.umami.track.mockRejectedValueOnce(new Error('Tracking failed'));

      await trackEvent('test_event');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Analytics Error:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});

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

      expect(mockWindow.umami.track).toHaveBeenCalledTimes(1);
      expect(mockWindow.umami.track).toHaveBeenCalledWith('pageview', {
        url,
        referrer,
        websiteId: expect.any(String)
      });
    });

    it('handles missing referrer by using empty string', async () => {
      const url = '/test-page';
      
      await trackPageView(url);

      expect(mockWindow.umami.track).toHaveBeenCalledWith('pageview', {
        url,
        referrer: '',
        websiteId: expect.any(String)
      });
    });

    it('validates URL parameter', async () => {
      await expect(trackPageView('')).rejects.toThrow('URL is required');
      expect(mockWindow.umami.track).not.toHaveBeenCalled();
    });
  });

  describe('trackEvent', () => {
    it('tracks events with correct parameters', async () => {
      const eventName = 'test_event';
      const data = { key: 'value' };

      await trackEvent(eventName, data);

      expect(mockWindow.umami.track).toHaveBeenCalledTimes(1);
      expect(mockWindow.umami.track).toHaveBeenCalledWith(eventName, {
        ...data,
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

    it('validates event name parameter', async () => {
      await expect(trackEvent('')).rejects.toThrow('Event name is required');
      expect(mockWindow.umami.track).not.toHaveBeenCalled();
    });
  });
});

