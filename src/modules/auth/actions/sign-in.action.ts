import { apiClient } from '@/api/nomadai.api';
import { isAxiosError } from 'axios';
import type { AuthResponse, User } from '../interfaces';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccessfully {
  ok: true;
  user: User;
  accessToken: string;
}

export const signInAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccessfully> => {
  try {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });

    return {
      ok: true,
      user: data.user,
      accessToken: data.accessToken,
    };
  } catch (error) {
    console.error(error);
    // TODO: Create interceptor to handle errors globally
    if (isAxiosError(error) && error.response?.data.code) {
      return {
        ok: false,
        message: error.response.data.code,
      };
    }

    throw new Error('UNEXPECTED_ERROR');
  }
};
