// Filters contacts by search text and lifecycle stage.
import type { Contact } from '../types/contact';
import type { ContactStageFilterValue } from '../types/contactFilter';

export function filterContacts(
  contacts: Contact[],
  searchTerm: string,
  stageFilter: ContactStageFilterValue,
): Contact[] {
  // Normalize the query for case-insensitive matching.
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return contacts.filter((contact) => {
    // Match against name, email, or company.
    const matchesSearch = `${contact.fullName} ${contact.email}${contact.company}`
      .toLocaleLowerCase()
      .includes(normalizedSearch);

    // "all" includes every stage; otherwise the stage must match.
    const matchesStage = stageFilter === 'all' || contact.stage === stageFilter;

    return matchesSearch && matchesStage;
  });
}
