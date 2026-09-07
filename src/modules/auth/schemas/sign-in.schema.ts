import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email({ error: 'auth.errors.emailRequired' }),
  password: z.string().min(8, { error: 'auth.errors.passwordMin' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
