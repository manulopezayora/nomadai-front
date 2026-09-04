import { useQuery } from '@tanstack/vue-query';
import { checkStatusAction } from '../actions';

export const useCheckStatusQuery = () => {
  return useQuery({
    queryKey: ['auth', 'check-status'],
    queryFn: checkStatusAction,
    retry: false,
  });
};
