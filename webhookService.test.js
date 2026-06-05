import { registerWebhook } from './webhookService';

describe('webhookService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it('registers webhook successfully', async () => {
    const mockResponse = { id: '123', status: 'active' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await registerWebhook('https://webhook.example.com/test');

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/register-webhook'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationUrl: 'https://webhook.example.com/test' }),
      })
    );
  });

  it('retries and succeeds on second attempt', async () => {
    const mockResponse = { id: '456', status: 'active' };
    global.fetch
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

    const result = await registerWebhook('https://webhook.example.com/test');

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('throws error after exhausting all retries', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    await expect(registerWebhook('https://webhook.example.com/test')).rejects.toThrow(
      'Webhook registration failed: 400 Bad Request'
    );
    expect(global.fetch).toHaveBeenCalledTimes(4);
  }, 10000);

  it('retries on network errors and eventually throws', async () => {
    global.fetch.mockRejectedValue(new Error('Network Error'));

    await expect(registerWebhook('https://webhook.example.com/test')).rejects.toThrow(
      'Network Error'
    );
    expect(global.fetch).toHaveBeenCalledTimes(4);
  }, 10000);
});
