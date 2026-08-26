export type UserRole = 'admin' | 'sales-manager' | 'sales-rep';

export type Permission =
  'dashboard:view' | 'contacts:view' | 'contacts:create' | 'contacts:delete';

export interface User {
  id: string;
  fullName: string;
  role: UserRole;
}
