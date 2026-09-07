import { useMutation } from '@tanstack/vue-query';
import { signInAction } from '../actions';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInAction(email, password),
  });
};
