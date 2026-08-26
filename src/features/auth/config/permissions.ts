import type { Permission, UserRole } from '../types/auth';

export const permissionsByRole: Record<UserRole, Permission[]> = {
  admin: ['dashboard:view', 'contacts:view', 'contacts:create', 'contacts:delete'],
  'sales-manager': [
    'dashboard:view',
    'contacts:view',
    'contacts:create',
    'contacts:delete',
  ],
  'sales-rep': ['dashboard:view', 'contacts:view', 'contacts:create'],
};
