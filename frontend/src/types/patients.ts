import * as z from 'zod';
import {
  emailValidation,
  requiredValidation,
} from '@/types/validation-constan';

export const PatientSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, requiredValidation),
  parentName: z.string().optional(),
  lastName: z.string().min(1, requiredValidation),
  gender: z.enum(['male', 'famale']).optional(),
  dateOfBirth: z.date().optional(),
  email: z.string().email(emailValidation).nullable().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type PatientSchema = z.infer<typeof PatientSchema>;
