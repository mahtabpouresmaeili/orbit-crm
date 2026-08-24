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
import type { CreateContactInput } from '../features/contacts/schemas/createContactSchema';
import { CreateContactForm } from '../features/contacts/components/CreateContactForm';
import { useCreateContact } from '../features/contacts/hooks/useCreateContact';

export function ContactsPage() {
  const { data: contacts = [], isPending, isError } = useContacts();
  const createContactmutation = useCreateContact()

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

  async function handleCreateContact(contact: CreateContactInput) {
     await createContactmutation.mutateAsync(contact)
  }
  

  return (
    <main className="contacts-page">
      <header className="contacts-header">
        <div>
          <p className="eyebrow">Relationship desk</p>
          <h1>People, not rows.</h1>
          <p className="page-intro">Keep the context around every customer close at hand.</p>
        </div>
        <div className="contact-count" aria-label={`${contacts.length} contacts`}>
          <strong>{contacts.length}</strong>
          <span>contacts in view</span>
        </div>
      </header>

      <section className="create-contact-panel" aria-labelledby="add-contact-title">
        <div className="panel-heading">
          <p className="eyebrow">New connection</p>
          <h2 id="add-contact-title">Add someone to your orbit</h2>
        </div>
        <CreateContactForm 
        onSubmit={handleCreateContact} 
        isSubmitting={createContactmutation.isPending}/>
        {createContactmutation.isError && (
          <p role='alret'>Unable to add the contact. Please try again</p>
        )}
      </section>

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
        <ContactTable contacts={filteredContacts} />
      )}
      </section>
    </main>
  );
}
