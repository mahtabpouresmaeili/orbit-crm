import { getApiBaseUrl } from './getApiBaseUrl';

export async function deleteContact(contactId: string): Promise<string> {
  const response = await fetch(`${getApiBaseUrl()}/api/contacts/${contactId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete contact.');
  }

  return contactId;
}
