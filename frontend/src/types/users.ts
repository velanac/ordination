import * as z from 'zod';

import { requiredValidation } from '@/types/validation-constan';

export const UserSchema = z.object({
  username: z.string().min(1, requiredValidation),
  password: z.string().min(8, requiredValidation),
  confirmPassword: z.string().min(8, requiredValidation),
  role: z.enum(['SuperAdmin', 'Admin', 'Doctor']),
});

export type UserPayload = {
  username: string;
  password: string;
  role: 'SuperAdmin' | 'Admin' | 'Doctor';
};

export type UserList = {
  id: string;
  username: string;
  role: string;
};

export type UserResponse = {
  id: string;
  email: string;
  role: string;
  active: boolean;
};

export const ChangePasswordSchema = z.object({
  password: z.string().min(8, requiredValidation),
  confirmPassword: z.string().min(8, requiredValidation),
});

export type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
export type UserSchema = z.infer<typeof UserSchema>;
