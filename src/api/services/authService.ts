import { apiClient } from '@/api/client';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/config/constants';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      { requiresAuth: false }
    );

    // Store tokens
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    if (response.refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
    }

    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Clear tokens regardless of API response
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  },

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ token: string }>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken },
      { requiresAuth: false }
    );

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    return response.token;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};
