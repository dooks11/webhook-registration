const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

/**
 * Register a webhook notification URL.
 * @param {string} notificationUrl - The webhook URL to register.
 * @returns {Promise<object>} - The parsed JSON response.
 */
export async function registerWebhook(notificationUrl) {
  const payload = {
    notificationUrl,
  };

  const response = await fetch(`${API_BASE_URL}/register-webhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook registration failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
