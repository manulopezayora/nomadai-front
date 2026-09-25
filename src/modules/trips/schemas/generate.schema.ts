import { z } from 'zod';

export const generateSchema = z.object({
  prompt: z.string().min(8, { error: 'auth.errors.passwordMin' }),
});

export type GenerateValues = z.infer<typeof generateSchema>;
