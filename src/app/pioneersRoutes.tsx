import { createBrowserRouter, Navigate } from 'react-router';
import { PioneersLogin } from './components/PioneersLogin';
import { PioneersLayout } from './components/PioneersLayout';
import { SuperDoctorDashboard } from './components/SuperDoctorDashboard';
import { DoctorInterface } from './components/DoctorInterface';
import { PatientDetailPage } from './components/PatientDetailPage';

// Protected route component
function ProtectedRoute({ children, requireSuper = false }: { children: React.ReactNode; requireSuper?: boolean }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isSuperDoctor = localStorage.getItem('isSuperDoctor') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireSuper && !isSuperDoctor) {
    return <Navigate to="/doctor-dashboard" replace />;
  }
  
  return <>{children}</>;
}

export const pioneersRouter = createBrowserRouter([
  {
    path: '/login',
    Component: PioneersLogin,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Navigate to="/doctor-dashboard" replace />
      </ProtectedRoute>
    ),
  },
  // Super Doctor Routes
  {
    path: '/super-dashboard',
    element: (
      <ProtectedRoute requireSuper={true}>
        <PioneersLayout isSuperDoctor={true} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: SuperDoctorDashboard,
      },
    ],
  },
  {
    path: '/account-approvals',
    element: (
      <ProtectedRoute requireSuper={true}>
        <PioneersLayout isSuperDoctor={true} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: SuperDoctorDashboard,
      },
    ],
  },
  {
    path: '/staff-management',
    element: (
      <ProtectedRoute requireSuper={true}>
        <PioneersLayout isSuperDoctor={true} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: SuperDoctorDashboard,
      },
    ],
  },
  {
    path: '/analytics',
    element: (
      <ProtectedRoute requireSuper={true}>
        <PioneersLayout isSuperDoctor={true} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: SuperDoctorDashboard,
      },
    ],
  },
  // Doctor Routes
  {
    path: '/doctor-dashboard',
    element: (
      <ProtectedRoute>
        <PioneersLayout isSuperDoctor={false} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: DoctorInterface,
      },
    ],
  },
  {
    path: '/my-patients',
    element: (
      <ProtectedRoute>
        <PioneersLayout isSuperDoctor={false} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: DoctorInterface,
      },
    ],
  },
  {
    path: '/patients/:id',
    element: (
      <ProtectedRoute>
        <PioneersLayout isSuperDoctor={false} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: PatientDetailPage,
      },
    ],
  },
  {
    path: '/protocols',
    element: (
      <ProtectedRoute>
        <PioneersLayout isSuperDoctor={false} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: DoctorInterface,
      },
    ],
  },
  {
    path: '/medical-records',
    element: (
      <ProtectedRoute>
        <PioneersLayout isSuperDoctor={false} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: DoctorInterface,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/doctor-dashboard" replace />,
  },
]);