import { apiClient } from './client';

export const skillsApi = {
  getSkills: () => apiClient.get('/api/skills'),
  getSkill: (id) => apiClient.get(`/api/skills/${id}`),
  createSkill: (data) => apiClient.post('/api/skills', data),
  updateSkill: (id, data) => apiClient.put(`/api/skills/${id}`, data),
  deleteSkill: (id) => apiClient.delete(`/api/skills/${id}`),
};
