import { apiClient } from './client';

export const contactApi = {
  getMessages: () => apiClient.get('/api/contact'),
  getMessage: (id) => apiClient.get(`/api/contact/${id}`),
  submitMessage: (data) => apiClient.post('/api/contact', data),
  deleteMessage: (id) => apiClient.delete(`/api/contact/${id}`),
};
