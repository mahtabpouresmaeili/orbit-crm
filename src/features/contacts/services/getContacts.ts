import type { Contact } from '../types/contact';

export async function getContacts(): Promise<Contact[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`);

  if (!response.ok) {
    throw new Error('Unable to load contacts.');
  }

  return response.json() as Promise<Contact[]>;
}
