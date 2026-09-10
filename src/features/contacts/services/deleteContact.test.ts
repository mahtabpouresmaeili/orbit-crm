import { afterEach, describe, expect, it, vi } from 'vitest';
import { deleteContact } from './deleteContact';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('deleteContact', () => {
  it('throws an error when the API rejects the request', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    await expect(deleteContact('1')).rejects.toThrow('Unable to delete contact.');
  });
});
