//Schema-driven validation
//Runtime validation
import { z } from 'zod';


//yani => یک مجموعه قانون برای اطلاعات فرم ساخت مشتری ایجاد کن.
export const createContactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must contain at least 2 characters.'),

  email: z.string().trim().email('Enter a valid email address'),

  stage: z.enum(['lead', 'qualified', 'customer', 'inactive']),

  company: z.string().trim().min(2,"Company must contain at least 2 characters.")
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
