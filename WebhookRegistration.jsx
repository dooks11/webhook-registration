import React, { useState } from 'react';
import { registerWebhook } from './webhookService';

export default function WebhookRegistration() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const result = await registerWebhook(url);
      setStatus('success');
      setMessage(`Webhook registered successfully: ${JSON.stringify(result)}`);
    } catch (error) {
      setStatus('error');
      setMessage(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Register Webhook</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="webhook-url">Notification URL</label>
        <input
          id="webhook-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://webhook.example.com/events"
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        >
          {status === 'loading' ? 'Registering...' : 'Register Webhook'}
        </button>
      </form>
      {message && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            backgroundColor: status === 'error' ? '#ffe6e6' : '#e6ffed',
            color: status === 'error' ? '#900' : '#060',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
