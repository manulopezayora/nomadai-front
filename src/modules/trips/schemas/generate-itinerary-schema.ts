import { z } from 'zod';

export const generateItinerarySchema = z.object({
  prompt: z.string().min(8, { error: 'auth.errors.passwordMin' }),
});

export type GenerateItineraryValues = z.infer<typeof generateItinerarySchema>;
