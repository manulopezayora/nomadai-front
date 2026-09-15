import { useMutation } from '@tanstack/vue-query';
import { generateItineraryAction } from '../actions/generate-itinerary.action';

export const useGenerateItineraryMutation = () => {
  return useMutation({
    mutationFn: ({ prompt }: { prompt: string }) => generateItineraryAction(prompt),
  });
};
