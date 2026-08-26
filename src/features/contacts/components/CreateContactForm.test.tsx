import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CreateContactForm } from './CreateContactForm';

describe('CreateContactForm', () => {
  it('does not submit invalid contact data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CreateContactForm isSubmitting={false} onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /add contact/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
  });
});
