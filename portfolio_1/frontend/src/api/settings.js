import { apiClient } from './client';

export const settingsApi = {
  getSettings: () => apiClient.get('/api/settings'),
  updateSettings: (data) => apiClient.put('/api/settings', data),
};
