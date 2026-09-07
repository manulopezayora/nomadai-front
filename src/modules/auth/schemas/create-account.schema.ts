import { z } from 'zod';

export const createAccountSchema = z.object({
  email: z.email({ error: 'auth.errors.emailRequired' }),
  password: z.string().min(8, { error: 'auth.errors.passwordMin' }),
  firstName: z.string().min(3, { error: 'auth.errors.firstNameMin' }),
  lastName: z.string().min(2, { error: 'auth.errors.lastNameMin' }),
});

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;
