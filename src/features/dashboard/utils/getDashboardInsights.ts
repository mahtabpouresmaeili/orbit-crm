import type { Contact, LifecycleStage } from '../../contacts/types/contact';

const stages: LifecycleStage[] = ['lead', 'qualified', 'customer', 'inactive'];

export function getDashboardInsights(contacts: Contact[]) {
  const stageCounts = stages.map((stage) => ({
    stage,
    count: contacts.filter((contact) => contact.stage === stage).length,
  }));

  return {
    recentContacts: [...contacts]
      .sort((first, second) => second.lastActivity.localeCompare(first.lastActivity))
      .slice(0, 3),
    highValueContacts: [...contacts]
      .sort((first, second) => second.potentialValue - first.potentialValue)
      .slice(0, 3),
    stageCounts,
  };
}
