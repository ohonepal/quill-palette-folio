// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  // Blog
  BLOG: {
    LIST: '/api/blog',
    CREATE: '/api/blog',
    UPDATE: (id: string) => `/api/blog/${id}`,
    DELETE: (id: string) => `/api/blog/${id}`,
    GET: (id: string) => `/api/blog/${id}`,
  },
  // Thoughts
  THOUGHTS: {
    LIST: '/api/thoughts',
    CREATE: '/api/thoughts',
    UPDATE: (id: string) => `/api/thoughts/${id}`,
    DELETE: (id: string) => `/api/thoughts/${id}`,
    GET: (id: string) => `/api/thoughts/${id}`,
  },
  // Gallery
  GALLERY: {
    LIST: '/api/gallery',
    UPLOAD: '/api/gallery/upload',
    DELETE: (id: string) => `/api/gallery/${id}`,
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;
