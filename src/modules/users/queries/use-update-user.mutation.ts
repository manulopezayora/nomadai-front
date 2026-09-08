import { useMutation } from '@tanstack/vue-query';
import { updateUserAction } from '../actions/update-user.action';
import type { UserToSave } from '../interfaces/UserToSave.interface';

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: ({ userId, user }: { userId: string; user: UserToSave }) =>
      updateUserAction({ userId, user }),
  });
};
