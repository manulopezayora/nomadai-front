import axios, { isAxiosError } from 'axios';
import { ApiError } from './api-error';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_CLIENT_URL,
});

// Interceptors
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const code = error.response?.data?.code ?? 'UNEXPECTED_ERROR';

      return Promise.reject(new ApiError(code, error.response?.status));
    }

    return Promise.reject(new ApiError('UNEXPECTED_ERROR'));
  },
);

export { apiClient };
