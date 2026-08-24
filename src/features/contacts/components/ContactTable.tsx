import type { Contact } from '../types/contact';

interface contactTableProps {
  contacts: Contact[];
}
export function ContactTable({ contacts }: contactTableProps) {
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
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>
              <div className="person-cell">
                <span className="person-initials" aria-hidden="true">
                  {contact.fullName.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </span>
                <span><strong>{contact.fullName}</strong><small>{contact.email}</small></span>
              </div>
            </td>
            <td>{contact.company}</td>
            <td><span className={`stage-pill stage-pill--${contact.stage}`}>{contact.stage}</span></td>
            <td>{contact.owner}</td>
            <td>${contact.potentialValue.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
