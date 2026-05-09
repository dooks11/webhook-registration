import { login, register, logout, getToken, getCurrentUser, isAuthenticated } from './authService';

const mockToken = 'mock-jwt-token';
const mockUser = { id: 1, username: 'alice' };

function mockFetch(response) {
  global.fetch = jest.fn(() => Promise.resolve(response));
}

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('authService', () => {
  describe('login', () => {
    it('stores token and user on successful login', async () => {
      mockFetch({
        ok: true,
        json: () => Promise.resolve({ token: mockToken, user: mockUser }),
      });

      const result = await login('alice', 'password123');
      expect(result).toEqual({ token: mockToken, user: mockUser });
      expect(localStorage.getItem('auth_token')).toBe(mockToken);
      expect(JSON.parse(localStorage.getItem('auth_user'))).toEqual(mockUser);
    });

    it('throws and does not store anything on failed login', async () => {
      mockFetch({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      });

      await expect(login('alice', 'wrong')).rejects.toThrow('Invalid credentials');
      expect(localStorage.getItem('auth_token')).toBeNull();
    });

    it('throws with status text when no JSON message is provided', async () => {
      mockFetch({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(login('alice', 'password')).rejects.toThrow('Login failed: 500 Internal Server Error');
    });
  });

  describe('register', () => {
    it('stores token and user on successful registration', async () => {
      mockFetch({
        ok: true,
        json: () => Promise.resolve({ token: mockToken, user: mockUser }),
      });

      const result = await register('alice', 'password123');
      expect(result).toEqual({ token: mockToken, user: mockUser });
      expect(isAuthenticated()).toBe(true);
      expect(getCurrentUser()).toEqual(mockUser);
    });

    it('throws on failed registration', async () => {
      mockFetch({
        ok: false,
        status: 409,
        statusText: 'Conflict',
        json: () => Promise.resolve({ message: 'Username already exists' }),
      });

      await expect(register('alice', 'password')).rejects.toThrow('Username already exists');
    });
  });

  describe('logout', () => {
    it('clears stored session data', () => {
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      logout();

      expect(getToken()).toBeNull();
      expect(getCurrentUser()).toBeNull();
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('returns null when no user is stored', () => {
      expect(getCurrentUser()).toBeNull();
    });

    it('returns null when stored user is invalid JSON', () => {
      localStorage.setItem('auth_user', 'not-json');
      expect(getCurrentUser()).toBeNull();
    });
  });
});
