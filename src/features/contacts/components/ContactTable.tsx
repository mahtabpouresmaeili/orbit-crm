import { PermissionGate } from '../../auth/components/PermissionGate';
import type { Contact } from '../types/contact';

interface ContactTableProps {
  contacts: Contact[];
  onDelete: (contactId: string) => void;
  deletingContactId?: string;
}
export function ContactTable({
  contacts,
  onDelete,
  deletingContactId,
}: ContactTableProps) {
  return (
    <div className="contact-table-wrap">
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Relationship</th>
            <th>Owner</th>
            <th>Potential Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <div className="person-cell">
                  <span className="person-initials" aria-hidden="true">
                    {contact.fullName
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <span>
                    <strong>{contact.fullName}</strong>
                    <small>{contact.email}</small>
                  </span>
                </div>
              </td>
              <td>{contact.company}</td>
              <td>
                <span className={`stage-pill stage-pill--${contact.stage}`}>
                  {contact.stage}
                </span>
              </td>
              <td>{contact.owner}</td>
              <td>${contact.potentialValue.toLocaleString()}</td>
              <td>
                <PermissionGate permission="contacts:delete">
                  <button
                    className="delete-contact-button"
                    type="button"
                    onClick={() => onDelete(contact.id)}
                    aria-label={`Delete ${contact.fullName}`}
                    disabled={deletingContactId === contact.id}
                  >
                    {deletingContactId === contact.id ? 'Deleting...' : 'Delete'}
                  </button>
                </PermissionGate>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
