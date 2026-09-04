import { apiClient } from '@/api/nomadai-api';
import type { AuthResponse, User } from '../interfaces';

interface SignInResult {
  user: User;
  accessToken: string;
}
export const signInAction = async (email: string, password: string): Promise<SignInResult> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });

  return {
    user: data.user,
    accessToken: data.accessToken,
  };
};
