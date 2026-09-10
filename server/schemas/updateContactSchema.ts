import { z } from 'zod';

export const updateContactSchema = z.object({
  stage: z.enum(['lead', 'qualified', 'customer', 'inactive']),
});
