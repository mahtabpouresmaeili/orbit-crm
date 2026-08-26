import type { Contact } from '../../contacts/types/contact';

export function getContactSummary(contacts: ReadonlyArray<Contact>) {
  return contacts.reduce(
    (summary, contact) => {
      summary.totalContacts += 1;
      summary.pipelineValue += contact.potentialValue;

      if (contact.stage === 'lead') {
        summary.leads += 1;
      }

      if (contact.stage === 'qualified') {
        summary.qualified += 1;
      }

      if (contact.stage === 'customer') {
        summary.customers += 1;
      }

      return summary;
    },
    {
      totalContacts: 0,
      leads: 0,
      qualified: 0,
      customers: 0,
      pipelineValue: 0,
    },
  );
}
