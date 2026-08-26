import type { User } from '../types/auth';
export const mockUsers: User[] = [
  {
    id: 'user-1',
    fullName: 'Emma Admin',
    role: 'admin',
  },
  {
    id: 'user-2',
    fullName: 'Michael Manager',
    role: 'sales-manager',
  },
  {
    id: 'user-3',
    fullName: 'Sophia Representative',
    role: 'sales-rep',
  },
];
