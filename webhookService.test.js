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
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/register-webhook'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationUrl: 'https://webhook.example.com/test' }),
      })
    );
  });

  it('throws error when registration fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    await expect(registerWebhook('https://webhook.example.com/test')).rejects.toThrow(
      'Webhook registration failed: 400 Bad Request'
    );
  });
});
