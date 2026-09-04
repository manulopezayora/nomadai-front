import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { pinia } from '@/pinia';
import router from '@/router';
import axios, { isAxiosError } from 'axios';
import { ApiError } from './api-error';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_CLIENT_URL,
  withCredentials: true,
});

// Interceptors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const code = error.response?.data?.code ?? 'UNEXPECTED_ERROR';

      if (status === 401) {
        const authStore = useAuthStore(pinia);
        authStore.clearSession();

        if (router.currentRoute.value.name !== 'sign-in') {
          router.push({ name: 'signIn' });
        }
      }

      return Promise.reject(new ApiError(code, status));
    }

    return Promise.reject(new ApiError('UNEXPECTED_ERROR'));
  },
);

export { apiClient };
