import type { Contact } from '../types/contact';
import { getApiBaseUrl } from './getApiBaseUrl';

export async function getContacts(): Promise<Contact[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/contacts`);

  if (!response.ok) {
    throw new Error('Unable to load contacts.');
  }

  return response.json() as Promise<Contact[]>;
}
