import { useState } from 'react';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LadingState';
import { ContactTable } from '../features/contacts/components/ContactTable';
import { useContacts } from '../features/contacts/hooks/useContacts';
import { ContactSearch } from '../features/contacts/components/ContactSearch';
import { filterContacts } from '../features/contacts/utils/filterContacts';
import type { ContactStageFilterValue } from '../features/contacts/types/contactFilter';
import { ContactStageFilter } from '../features/contacts/components/ContactStageFilter';

export function ContactsPage() {
  const { data: contacts = [], isPending, isError } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] =
    useState<ContactStageFilterValue>('all');
  const filteredContacts = filterContacts(contacts, searchTerm, stageFilter);

  if (isPending) {
    return <LoadingState message="Loading contacts..." />;
  }

  if (isError) {
    return <ErrorState message="Unable to load contacts." />;
  }

  if (contacts.length === 0) {
    return (
      <EmptyState
        title="No contacts found"
        description="Add your first contact to get started."
      />
    );
  }

  return (
    <main>
      <h1>Contacts</h1>
      <p>Manage customers and companies.</p>

      <ContactSearch value={searchTerm} onChange={setSearchTerm} />
      <ContactStageFilter value={stageFilter} onChange={setStageFilter} />

      {filteredContacts.length === 0 ? (
        <EmptyState
          title="No matching contacts"
          description="Try a different search term."
        />
      ) : (
        <ContactTable contacts={filteredContacts} />
      )}
    </main>
  );
}
