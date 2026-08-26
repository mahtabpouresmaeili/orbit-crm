import { mockContacts } from '../data/mockContacts';
import type { Contact } from '../types/contact';

const REQUEST_DELAY_MS = 350;
let contacts = [...mockContacts];
let nextRequestError: Error | undefined;

export function failNextMockRequest(message = 'The mock API is temporarily unavailable') {
  nextRequestError = new Error(message);
}

export function resetMockApi() {
  contacts = [...mockContacts];
  nextRequestError = undefined;
}

export async function mockRequest<T>(operation: () => T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS));

  if (nextRequestError) {
    const error = nextRequestError;
    nextRequestError = undefined;
    throw error;
  }

  return operation();
}

export function readContacts() {
  return [...contacts];
}

export function addContact(contact: Contact) {
  contacts = [contact, ...contacts];
  return contact;
}

export function removeContact(contactId: string) {
  const contactExists = contacts.some((contact) => contact.id === contactId);

  if (!contactExists) {
    throw new Error('Contact not found');
  }

  contacts = contacts.filter((contact) => contact.id !== contactId);
  return contactId;
}
