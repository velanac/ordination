import * as z from 'zod';

export const PatientSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  gender: z.enum(['male', 'famale']).optional(),
  dateOfBirth: z.date().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type PatientSchema = z.infer<typeof PatientSchema>;

export type PatientList = {
  id: string;
  fullName: string;
  email: string;
  city: string;
};
