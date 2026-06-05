import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function LoginForm() {
  const { login, register, loading, error } = useAuth();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setLocalError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(false);

    if (!username.trim() || !password.trim()) {
      setLocalError('Username and password are required.');
      return;
    }

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      setSuccess(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const displayError = localError || error;

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>{mode === 'login' ? 'Log In' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="auth-username">Username</label>
        <input
          id="auth-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.25rem',
            marginBottom: '0.75rem',
          }}
        />
        <label htmlFor="auth-password">Password</label>
        <input
          id="auth-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', marginBottom: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
        >
          {loading ? 'Working...' : mode === 'login' ? 'Log In' : 'Register'}
        </button>
        <button type="button" onClick={toggleMode} style={{ padding: '0.5rem 1rem' }}>
          {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Log In'}
        </button>
      </form>
      {displayError && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            backgroundColor: '#ffe6e6',
            color: '#900',
          }}
        >
          {displayError}
        </div>
      )}
      {success && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            backgroundColor: '#e6ffed',
            color: '#060',
          }}
        >
          {mode === 'login' ? 'Logged in successfully!' : 'Registered and logged in successfully!'}
        </div>
      )}
    </div>
  );
}
