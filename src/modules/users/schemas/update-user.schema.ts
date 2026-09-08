import { RoleEnum } from '@/modules/auth/enums';
import { z } from 'zod';

export const updateUserSchema = z.object({
  firstName: z.string().min(3, { error: 'user.errors.firstNameMin' }),
  lastName: z.string().min(2, { error: 'user.errors.lastNameMin' }),
  email: z.email({ error: 'user.errors.emailRequired' }).optional(),
  avatarPublicId: z.string().nullable().optional(),
  role: z.enum(RoleEnum),
  isActive: z.boolean(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
