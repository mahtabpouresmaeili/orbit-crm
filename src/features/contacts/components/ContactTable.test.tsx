import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AuthContext } from '../../auth/context/AuthContext';
import { mockUsers } from '../../auth/data/mockUsers';
import type { Contact } from '../types/contact';
import { ContactTable } from './ContactTable';

const contact: Contact = {
  id: 'contact-1',
  fullName: 'Sara Johnson',
  email: 'sara@example.com',
  company: 'Acme',
  stage: 'lead',
  owner: 'Current User',
  potentialValue: 5000,
  lastActivity: '2026-01-25',
  marketingConsent: false,
};

function renderTable(userIndex: number, onDelete = vi.fn()) {
  return {
    onDelete,
    ...render(
      <AuthContext.Provider
        value={{ user: mockUsers[userIndex], users: mockUsers, setUser: vi.fn() }}
      >
        <ContactTable contacts={[contact]} onDelete={onDelete} />
      </AuthContext.Provider>,
    ),
  };
}

describe('ContactTable', () => {
  it('displays contact information', () => {
    renderTable(0);
    expect(screen.getByText(contact.fullName)).toBeInTheDocument();
    expect(screen.getByText(contact.email)).toBeInTheDocument();
  });

  it('calls onDelete with the contact id', async () => {
    const user = userEvent.setup();
    const { onDelete } = renderTable(0);
    await user.click(screen.getByRole('button', { name: `Delete ${contact.fullName}` }));
    expect(onDelete).toHaveBeenCalledWith(contact.id);
  });

  it('hides the delete action from a sales representative', () => {
    renderTable(2);
    expect(
      screen.queryByRole('button', { name: `Delete ${contact.fullName}` }),
    ).not.toBeInTheDocument();
  });
});
