import { apiClient } from '@/api/nomadai-api';
import type { CreateAccount, User } from '../interfaces';

export const createAccountAction = async ({
  email,
  password,
  name,
  lastName,
}: CreateAccount): Promise<{ user: User }> => {
  const { data } = await apiClient.post<User>('/auth/register', {
    email,
    password,
    firstName: name,
    lastName,
  });

  return { user: data };
};
