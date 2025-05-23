import { z } from 'zod';

export const SuperUserFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type SuperUserFormPayload = z.infer<typeof SuperUserFormSchema>;

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignInFormPayload = z.infer<typeof SignInFormSchema>;
