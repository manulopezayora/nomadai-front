import { apiClient } from '@/api/nomadai-api';
import type { User } from '../interfaces';

export const checkStatusAction = async (): Promise<{ user: User }> => {
  const { data } = await apiClient.get<User>('/auth/check-status');

  return { user: data };
};
