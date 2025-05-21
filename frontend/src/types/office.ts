import * as z from 'zod';

import { requiredValidation } from '@/types/validation-constan';

export const OfficeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, requiredValidation),
  description: z.string().optional(),
});

export type OfficeSchema = z.infer<typeof OfficeSchema>;
