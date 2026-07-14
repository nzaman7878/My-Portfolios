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

    const config = {
      credentials: 'include', // Send cookies with request
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

  async upload(endpoint, formData, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'POST',
      body: formData,
      credentials: 'include',
      ...options,
    };
    // Note: Do not set Content-Type header manually for FormData,
    // the browser will automatically set it with the correct boundary.

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }
}

export const apiClient = new ApiClient();
