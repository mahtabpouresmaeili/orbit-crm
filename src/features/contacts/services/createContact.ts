import type { CreateContactInput } from '../schemas/createContactSchema';
import type { Contact } from '../types/contact';
import { addContact, mockRequest } from './mockApi';

export async function createContact(input: CreateContactInput): Promise<Contact> {
  return mockRequest(() =>
    addContact({
      id: crypto.randomUUID(),
      ...input,
      owner: 'Current User',
      potentialValue: 0,
      lastActivity: new Date().toISOString().slice(0, 10),
      marketingConsent: false,
    }),
  );
}
