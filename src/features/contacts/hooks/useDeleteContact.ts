import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContact } from '../services/deleteContact';
import type { Contact } from '../types/contact';

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    retry: 1,
    retryDelay: 400,

    onSuccess: (deletedContactId) => {
      queryClient.setQueryData<Contact[]>(['contacts'], (prevContacts = []) =>
        prevContacts.filter((contact) => contact.id !== deletedContactId),
      );
    },
  });
}
