import { it, describe, expect } from 'vitest';
import { createContactSchema } from './createContactSchema';

//This unit test verifies the schema's happy path
describe('createContactSchema', () => {
  it('accepts valid contact data', () => {
    const result = createContactSchema.safeParse({
      fullName: 'Amelia Stone',
      email: 'amelia@northstar.com',
      company: 'Northstar Capital',
      stage: 'qualified',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email address', () => {
    const result = createContactSchema.safeParse({
      fullName: 'Amelia Stone',
      email: 'invalid-email',
      company: 'Northstar Capital',
      stage: 'qualified',
    });
    expect(result.success).toBe(false)

    if (!result.success){
        const errors = result.error.flatten().fieldErrors;

       expect(errors.email?.[0]).toBe(
        "Enter a valid email address",
);
    }
  });
});
