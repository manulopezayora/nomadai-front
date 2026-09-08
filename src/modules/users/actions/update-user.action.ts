import { apiClient } from '@/api/nomadai-api';
import type { User } from '@/modules/auth/interfaces';
import type { UserToSave } from '../interfaces/UserToSave.interface';

export const updateUserAction = async ({
  userId,
  user,
}: {
  userId: string;
  user: UserToSave;
}): Promise<User> => {
  const { data } = await apiClient.patch<User>(`/users/${userId}`, user);

  return data;
};
