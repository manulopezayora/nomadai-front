import { useMutation } from '@tanstack/vue-query';
import { generateAction } from '../actions/generate.action';

export const useGenerateMutation = () => {
  return useMutation({
    mutationFn: ({ prompt }: { prompt: string }) => generateAction(prompt),
  });
};
