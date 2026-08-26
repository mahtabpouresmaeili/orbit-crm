import { useState } from 'react';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { ContactTable } from '../features/contacts/components/ContactTable';
import { useContacts } from '../features/contacts/hooks/useContacts';
import { ContactSearch } from '../features/contacts/components/ContactSearch';
import { filterContacts } from '../features/contacts/utils/filterContacts';
import type { ContactStageFilterValue } from '../features/contacts/types/contactFilter';
import { ContactStageFilter } from '../features/contacts/components/ContactStageFilter';
import type { CreateContactInput } from '../features/contacts/schemas/createContactSchema';
import { CreateContactForm } from '../features/contacts/components/CreateContactForm';
import { useCreateContact } from '../features/contacts/hooks/useCreateContact';
import { LoadingState } from '../components/ui/LoadingState';
import { useDeleteContact } from '../features/contacts/hooks/useDeleteContact';
import { PermissionGate } from '../features/auth/components/PermissionGate';

export function ContactsPage() {
  const { data: contacts = [], isPending, isError, refetch } = useContacts();
  const createContactMutation = useCreateContact();
  const deleteContactMutation = useDeleteContact();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<ContactStageFilterValue>('all');
  const filteredContacts = filterContacts(contacts, searchTerm, stageFilter);

  function handleDeleteContact(contactId: string) {
    deleteContactMutation.mutate(contactId);
  }

  if (isPending) {
    return <LoadingState message="Loading contacts..." />;
  }

  if (isError) {
    return (
      <ErrorState message="Unable to load contacts." onRetry={() => void refetch()} />
    );
  }

  async function handleCreateContact(contact: CreateContactInput) {
    await createContactMutation.mutateAsync(contact);
  }

  return (
    <main className="contacts-page">
      <header className="contacts-header">
        <div>
          <p className="eyebrow">Relationship desk</p>
          <h1>People, not rows.</h1>
          <p className="page-intro">
            Keep the context around every customer close at hand.
          </p>
        </div>
        <div
          className="contact-count"
          aria-label={`${filterContacts.length} contacts in view`}
        >
          <strong>{filterContacts.length}</strong>
          <span>contacts in view</span>
        </div>
      </header>
      <PermissionGate permission="contacts:create">
        <section className="create-contact-panel" aria-labelledby="add-contact-title">
          <div className="panel-heading">
            <p className="eyebrow">New connection</p>
            <h2 id="add-contact-title">Add someone to your orbit</h2>
          </div>
          <CreateContactForm
            onSubmit={handleCreateContact}
            isSubmitting={createContactMutation.isPending}
          />
          {createContactMutation.isError && (
            <p role="alert">Unable to add the contact. Please try again</p>
          )}
        </section>
      </PermissionGate>

      <section className="contacts-directory" aria-labelledby="directory-title">
        <div className="directory-topline">
          <div>
            <p className="eyebrow">Directory</p>
            <h2 id="directory-title">Your active relationships</h2>
          </div>
          <div className="directory-controls">
            <ContactSearch value={searchTerm} onChange={setSearchTerm} />
            <ContactStageFilter value={stageFilter} onChange={setStageFilter} />
          </div>
        </div>

        {contacts.length === 0 ? (
          <EmptyState
            title="Your directory is ready"
            description="Add the first person above to begin building a useful picture of your market."
          />
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            title="No matching contacts"
            description="Try a different search term."
          />
        ) : (
          <>
            <ContactTable
              contacts={filteredContacts}
              onDelete={handleDeleteContact}
              deletingContactId={
                deleteContactMutation.isPending
                  ? deleteContactMutation.variables
                  : undefined
              }
            />
            {deleteContactMutation.isError && (
              <p role="alert">Unable to delete the contact. Please try again.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
