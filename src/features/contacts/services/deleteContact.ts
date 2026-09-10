export async function deleteContact(contactId: string): Promise<string> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/${contactId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete contact.');
  }

  return contactId;
}
