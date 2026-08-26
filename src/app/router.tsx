import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { ContactsPage } from '../pages/ContactsPage';
import { AppLayout } from '../layouts/AppLayout';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute permission="dashboard:view">
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contacts',
        element: (
          <ProtectedRoute permission="contacts:view">
            <ContactsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
