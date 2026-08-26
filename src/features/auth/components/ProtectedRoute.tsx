import type { ReactNode } from 'react';
import type { Permission } from '../types/auth';
import { useAuth } from '../hooks/useAuth';
import { hasPermission } from '../utils/hasPermission';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  permission: Permission;
}

export function ProtectedRoute({ children, permission }: ProtectedRouteProps) {
  const { user } = useAuth();

  const isAllowed = hasPermission(user.role, permission);

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/**Difference between the two permission components:
Component	Purpose
PermissionGate	Hides a button, form, or UI section
ProtectedRoute	Prevents access to an entire page
 */
