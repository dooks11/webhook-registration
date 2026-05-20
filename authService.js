const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Log in a user with username and password.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string, user: object}>}
 */
export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Login failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  storeSession(data.token, data.user);
  return data;
}

/**
 * Register a new user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string, user: object}>}
 */
export async function register(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Registration failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  storeSession(data.token, data.user);
  return data;
}

/**
 * Log out the current user and clear stored session.
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Get the stored auth token.
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get the stored user object.
 * @returns {object|null}
 */
export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Check if the user is authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}

function storeSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
