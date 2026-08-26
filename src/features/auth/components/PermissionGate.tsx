import type { ReactNode } from 'react';
import type { Permission } from '../types/auth';
import { hasPermission } from '../utils/hasPermission';
import { useAuth } from '../hooks/useAuth';

interface PermissionGateProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}
export function PermissionGate({ permission, children, fallback }: PermissionGateProps) {
  const { user } = useAuth();

  const isAllowed = hasPermission(user.role, permission);
  if (!isAllowed) {
    return fallback;
  }
  return children;
}
