import { afterEach, describe, expect, it } from 'vitest';
import { deleteContact } from './deleteContact';
import { failNextMockRequest, resetMockApi } from './mockApi';

afterEach(resetMockApi);

describe('mock contact API', () => {
  it('exposes controlled request failures for error-state testing', async () => {
    failNextMockRequest('Network unavailable');
    await expect(deleteContact('1')).rejects.toThrow('Network unavailable');
  });
});
