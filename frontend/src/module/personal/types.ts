import { z } from 'zod';

export const PersonalFormSchema = z.object({
  titles: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

export type PersonalFormPayload = z.infer<typeof PersonalFormSchema>;
