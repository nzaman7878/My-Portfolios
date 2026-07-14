import { apiClient } from './client';

export const authApi = {
  login: (credentials) => apiClient.post('/api/auth/login', credentials),
};
