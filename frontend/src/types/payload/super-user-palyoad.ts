import { z } from 'zod';

export const SuperUserFormSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type SuperUserFormPayload = z.infer<typeof SuperUserFormSchema>;
