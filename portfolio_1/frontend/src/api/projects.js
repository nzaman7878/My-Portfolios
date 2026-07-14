import { apiClient } from './client';
import { API_URL } from '../utils/constants';

export const projectsApi = {
  getProjects: () => apiClient.get('/api/projects'),
  getProject: (id) => apiClient.get(`/api/projects/${id}`),
  createProject: (data) => apiClient.post('/api/projects', data),
  updateProject: (id, data) => apiClient.put(`/api/projects/${id}`, data),
  deleteProject: (id) => apiClient.delete(`/api/projects/${id}`),
  uploadImage: async (formData) => {
    // For file upload, we need a custom fetch because FormData shouldn't have 'Content-Type': 'application/json'
    const token = localStorage.getItem('adminToken');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Image upload failed');
    }
    return data;
  }
};
