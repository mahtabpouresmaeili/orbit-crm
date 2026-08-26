import { mockRequest, readContacts } from './mockApi';
import type { Contact } from '../types/contact';

export async function getContacts(): Promise<Contact[]> {
  return mockRequest(readContacts);
}
