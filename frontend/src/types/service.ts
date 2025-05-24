import * as z from 'zod';
import { requiredValidation } from '@/types/validation-constan';

export const ServiceSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, requiredValidation),
  price: z.string(),
});

export const ServicePayloadScheme = z.object({
  description: z.string(),
  price: z.number(),
});

export const ServiceResponse = z.object({
  id: z.string(),
  description: z.string(),
  price: z.number(),
});

export type ServiceResponse = z.infer<typeof ServiceResponse>;
export type ServicePayload = z.infer<typeof ServicePayloadScheme>;
export type ServiceSchema = z.infer<typeof ServiceSchema>;
