import { mockRequest, removeContact } from './mockApi';

export async function deleteContact(contactId: string): Promise<string> {
  return mockRequest(() => removeContact(contactId));
}
