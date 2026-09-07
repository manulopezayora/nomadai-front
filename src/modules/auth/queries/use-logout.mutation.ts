import { useMutation } from '@tanstack/vue-query';
import { logoutAction } from '../actions';

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutAction,
  });
};
