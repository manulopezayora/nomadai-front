import { apiClient } from '@/api/nomadai-api';
import type { User } from '../interfaces';

export const signInAction = async (email: string, password: string): Promise<{ user: User }> => {
  const { data } = await apiClient.post<{ user: User }>('/auth/login', { email, password });

  return { user: data.user };
};
