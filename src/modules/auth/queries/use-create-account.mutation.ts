import { useMutation } from '@tanstack/vue-query';
import { createAccountAction } from '../actions';
import type { CreateAccount } from '../interfaces';

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: ({ email, password, name, lastName }: CreateAccount) =>
      createAccountAction({ email, password, name, lastName }),
  });
};
