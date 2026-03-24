import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from './components/LoginPage';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PatientsPage } from './components/PatientsPage';
import { PatientFilePage } from './components/PatientFilePage';
import { AppointmentsPage } from './components/AppointmentsPage';
import { ChatPage } from './components/ChatPage';
import { LabResultsPage } from './components/LabResultsPage';
import { ArchivePage } from './components/ArchivePage';

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'patients',
        Component: PatientsPage,
      },
      {
        path: 'patients/:id',
        Component: PatientFilePage,
      },
      {
        path: 'appointments',
        Component: AppointmentsPage,
      },
      {
        path: 'chat',
        Component: ChatPage,
      },
      {
        path: 'lab-results',
        Component: LabResultsPage,
      },
      {
        path: 'archive',
        Component: ArchivePage,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
