import { permissionsByRole } from '../config/permissions';
import type { Permission, UserRole } from '../types/auth';

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return permissionsByRole[role].includes(permission);
}
