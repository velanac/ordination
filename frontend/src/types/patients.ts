import * as z from 'zod';

export const PatientSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  parentName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['male', 'famale']).optional(),
  dateOfBirth: z.date().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type PatientSchema = z.infer<typeof PatientSchema>;
