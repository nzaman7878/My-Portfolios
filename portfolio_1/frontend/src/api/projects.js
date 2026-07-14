import { apiClient } from './client';

export const projectsApi = {
  getProjects: () => apiClient.get('/api/projects'),
  getProject: (id) => apiClient.get(`/api/projects/${id}`),
  createProject: (data) => apiClient.post('/api/projects', data),
  updateProject: (id, data) => apiClient.put(`/api/projects/${id}`, data),
  deleteProject: (id) => apiClient.delete(`/api/projects/${id}`),
  uploadImage: async (formData) => {
    return apiClient.upload('/api/upload', formData);
  }
};
