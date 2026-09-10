import type { CreateContactInput } from '../schemas/createContactSchema';
import type { Contact } from '../types/contact';

export async function createContact(input: CreateContactInput): Promise<Contact> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Unable to create contact.');
  }

  return response.json() as Promise<Contact>;
}
