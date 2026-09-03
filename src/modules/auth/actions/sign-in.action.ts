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
    // TODO:
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }

    throw new Error('No se pudo realizar la petición');
  }
};
