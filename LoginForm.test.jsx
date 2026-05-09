import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { useAuth } from './AuthContext';

jest.mock('./AuthContext', () => ({
  useAuth: jest.fn(),
}));

function mockAuth(overrides = {}) {
  useAuth.mockReturnValue({
    login: jest.fn(),
    register: jest.fn(),
    loading: false,
    error: null,
    ...overrides,
  });
}

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    mockAuth();
    render(<LoginForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('toggles to register mode', async () => {
    const user = userEvent.setup();
    mockAuth();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /need an account/i }));

    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /already have an account/i })).toBeInTheDocument();
  });

  it('calls login on submit in login mode', async () => {
    const user = userEvent.setup();
    const mockLogin = jest.fn().mockResolvedValue({});
    mockAuth({ login: mockLogin });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/username/i), 'alice');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('alice', 'password123'));
    expect(screen.getByText(/logged in successfully/i)).toBeInTheDocument();
  });

  it('calls register on submit in register mode', async () => {
    const user = userEvent.setup();
    const mockRegister = jest.fn().mockResolvedValue({});
    mockAuth({ register: mockRegister });

    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /need an account/i }));
    await user.type(screen.getByLabelText(/username/i), 'bob');
    await user.type(screen.getByLabelText(/password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => expect(mockRegister).toHaveBeenCalledWith('bob', 'secret'));
    expect(screen.getByText(/registered and logged in successfully/i)).toBeInTheDocument();
  });

  it('displays local validation error when fields are empty', async () => {
    const user = userEvent.setup();
    mockAuth();
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '   ' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '   ' } });
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText(/username and password are required/i)).toBeInTheDocument();
  });

  it('displays error from context when login fails', async () => {
    mockAuth({ error: 'Server error occurred' });
    render(<LoginForm />);

    expect(screen.getByText(/server error occurred/i)).toBeInTheDocument();
  });

  it('displays error from failed submit', async () => {
    const user = userEvent.setup();
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    mockAuth({ login: mockLogin });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/username/i), 'alice');
    await user.type(screen.getByLabelText(/password/i), 'wrong');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('disables submit button while loading', () => {
    mockAuth({ loading: true });
    render(<LoginForm />);

    expect(screen.getByRole('button', { name: /working/i })).toBeDisabled();
  });
});
