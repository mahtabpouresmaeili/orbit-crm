import type { Contact } from '../types/contact';

interface contactTableProps {
  contacts: Contact[];
}
export function ContactTable({ contacts }: contactTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>company</th>
          <th>Stage</th>
          <th>Owner</th>
          <th>Potential Value</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>{contact.fullName}</td>
            <td>{contact.company}</td>
            <td>{contact.stage}</td>
            <td>{contact.owner}</td>
            <td>${contact.potentialValue.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
