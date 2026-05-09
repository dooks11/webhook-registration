import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WebhookRegistration from './WebhookRegistration';
import { registerWebhook } from './webhookService';

jest.mock('./webhookService', () => ({
  registerWebhook: jest.fn(),
}));

describe('WebhookRegistration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with input and button', () => {
    render(<WebhookRegistration />);
    expect(screen.getByLabelText(/notification url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register webhook/i })).toBeInTheDocument();
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    registerWebhook.mockResolvedValueOnce({ id: 'abc', status: 'active' });
    render(<WebhookRegistration />);

    fireEvent.change(screen.getByLabelText(/notification url/i), {
      target: { value: 'https://webhook.example.com/test' },
    });
    await user.click(screen.getByRole('button', { name: /register webhook/i }));

    await waitFor(() => expect(registerWebhook).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.getByText(/webhook registered successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error message when registration fails', async () => {
    const user = userEvent.setup();
    registerWebhook.mockRejectedValueOnce(new Error('Network Error'));
    render(<WebhookRegistration />);

    fireEvent.change(screen.getByLabelText(/notification url/i), {
      target: { value: 'https://webhook.example.com/test' },
    });
    await user.click(screen.getByRole('button', { name: /register webhook/i }));

    await waitFor(() => expect(registerWebhook).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.getByText(/registration failed: network error/i)).toBeInTheDocument();
    });
  });
});
