import { apiClient } from '@/api/nomadai-api';

export const logoutAction = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};
