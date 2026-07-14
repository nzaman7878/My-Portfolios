import { API_URL } from '../utils/constants';

class ApiClient {
  constructor() {
    this.baseURL = API_URL;
  }

  async fetchJSON(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add token if exists
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  get(endpoint, options = {}) {
    return this.fetchJSON(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.fetchJSON(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body, options = {}) {
    return this.fetchJSON(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, options = {}) {
    return this.fetchJSON(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
