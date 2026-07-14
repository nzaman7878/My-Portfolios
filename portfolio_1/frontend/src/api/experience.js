import { apiClient } from './client';

export const experienceApi = {
  getExperiences: () => apiClient.get('/api/experience'),
  getExperience: (id) => apiClient.get(`/api/experience/${id}`),
  createExperience: (data) => apiClient.post('/api/experience', data),
  updateExperience: (id, data) => apiClient.put(`/api/experience/${id}`, data),
  deleteExperience: (id) => apiClient.delete(`/api/experience/${id}`),
};
