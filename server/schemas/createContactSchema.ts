import { z } from 'zod';

export const createContactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must contain at least 2 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  company: z.string().trim().min(2, 'Company must contain at least 2 characters.'),
  stage: z.enum(['lead', 'qualified', 'customer', 'inactive']),
});
