import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPageAr } from './components/LoginPageAr';
import { LayoutAr } from './components/LayoutAr';
import { DashboardAr } from './components/DashboardAr';
import { PatientsPageAr } from './components/PatientsPageAr';
import { PatientFilePageAr } from './components/PatientFilePageAr';
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

export const routerAr = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPageAr,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LayoutAr />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        Component: DashboardAr,
      },
      {
        path: 'patients',
        Component: PatientsPageAr,
      },
      {
        path: 'patients/:id',
        Component: PatientFilePageAr,
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