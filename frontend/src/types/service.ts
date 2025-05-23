import * as z from 'zod';
import { requiredValidation } from '@/types/validation-constan';

export const ServiceSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, requiredValidation),
  price: z.string(),
});

export type ServiceSchema = z.infer<typeof ServiceSchema>;
