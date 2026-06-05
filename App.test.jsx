import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock child components to isolate App routing logic
jest.mock('./LoginForm', () => () => <div data-testid="login-form">LoginForm</div>);
jest.mock('./WebhookRegistration', () => () => <div data-testid="webhook-form">WebhookRegistration</div>);

const mockLogout = jest.fn();

jest.mock('./AuthContext', () => ({
  ...jest.requireActual('./AuthContext'),
  useAuth: jest.fn(),
}));

import { useAuth } from './AuthContext';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders LoginForm when not authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
    });

    render(<App />);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.queryByTestId('webhook-form')).not.toBeInTheDocument();
  });

  it('renders WebhookRegistration and logout button when authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<App />);

    expect(screen.getByTestId('webhook-form')).toBeInTheDocument();
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

  it('calls logout when logout button is clicked', async () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /log out/i }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
