const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Delay helper for retries.
 * @param {number} ms
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Register a webhook notification URL with automatic retry logic.
 * @param {string} notificationUrl - The webhook URL to register.
 * @param {number} [retries] - Number of retry attempts (default: 3).
 * @returns {Promise<object>} - The parsed JSON response.
 */
export async function registerWebhook(notificationUrl, retries = MAX_RETRIES) {
  const payload = {
    notificationUrl,
  };

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}/register-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return response.json();
      }

      lastError = new Error(
        `Webhook registration failed: ${response.status} ${response.statusText}`
      );
    } catch (networkError) {
      lastError = networkError;
    }

    if (attempt < retries) {
      await delay(RETRY_DELAY * (attempt + 1));
    }
  }

  throw lastError;
}
