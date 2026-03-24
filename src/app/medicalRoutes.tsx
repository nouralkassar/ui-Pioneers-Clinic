import { createBrowserRouter, Navigate } from 'react-router';
import { MedicalLogin } from './components/MedicalLogin';
import { MedicalLayout } from './components/MedicalLayout';
import { DoctorDashboard } from './components/DoctorDashboard';
import { SuperDoctorDash } from './components/SuperDoctorDash';
import { SecretaryDashboard } from './components/SecretaryDashboard';
import { DoctorInterface } from './components/DoctorInterface';
import { MyPatientsPage } from './components/MyPatientsPage';
import { AccountManagement } from './components/AccountManagement';
import { PatientTransfer } from './components/PatientTransfer';
import { GeneralAppointments } from './components/GeneralAppointments';
import { DoctorsManagement } from './components/DoctorsManagement';
import { NotificationsManager } from './components/NotificationsManager';
import { HealthTipsManager } from './components/HealthTipsManager';
import { PatientProfile } from './components/PatientProfile';
import { DoctorConsultations } from './components/DoctorConsultations';
import { TreatmentProtocols } from './components/Protocol';
import { ArchiveManagement } from './components/ArchiveManagement';
import { LabSystem } from './components/LabSystem';
import { AppointmentRequests } from './components/AppointmentRequests';
import { PatientRegistration } from './components/PatientRegistration';
import { PaymentManagement } from './components/PaymentManagement';
import { DoctorSchedule } from './components/DoctorSchedule';
// Protected route component
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles?: string[];
}) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'super-doctor') {
      return <Navigate to="/super-dashboard" replace />;
    } else if (userRole === 'secretary') {
      return <Navigate to="/secretary-dashboard" replace />;
    } else {
      return <Navigate to="/doctor-dashboard" replace />;
    }
  }
  
  return <>{children}</>;
}

// Simple placeholder component
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <div 
        className="bg-white rounded-lg p-12 text-center border border-gray-200"
        style={{ 
          boxShadow: 'var(--shadow-md)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-dark-navy)' }}>
          {title}
        </h1>
        <p className="text-gray-600">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  );
}

export const medicalRouter = createBrowserRouter([
  {
    path: '/login',
    Component: MedicalLogin,
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
      <ProtectedRoute allowedRoles={['super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: SuperDoctorDash },
    ],
  },
{
    path: '/account-management',
    element: (
      <ProtectedRoute allowedRoles={['super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      // استبدل PlaceholderPage بالمكون الحقيقي هنا
      { index: true, Component: AccountManagement }, 
    ],
  },
  {
    path: '/patients/:id',
    element: (
      <ProtectedRoute allowedRoles={['doctor','super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      // استبدل PlaceholderPage بالمكون الحقيقي هنا
      { index: true, Component: PatientProfile }, 
    ],
  },
 
 
  // Doctor Routes
  {
    path: '/doctor-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['doctor', 'super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DoctorDashboard },
    ],
  },
  {
    path: '/my-patients',
    element: (
      <ProtectedRoute allowedRoles={['doctor', 'super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: MyPatientsPage },
    ],
  },
 {
  path: '/appointments', // أو أي مسار تراه مناسباً للمواعيد العامة
  element: (
    <ProtectedRoute allowedRoles={['doctor','super-doctor']}>
      <MedicalLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, Component: GeneralAppointments }, // استبدل PlaceholderPage هنا
  ],
},
{
  path:'/doctor-management', // أو أي مسار تراه مناسباً للمواعيد العامة
  element: (
    <ProtectedRoute allowedRoles={['super-doctor']}>
      <MedicalLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, Component: DoctorsManagement }, // استبدل PlaceholderPage هنا
  ],
},
{
  path: '/HealthTipsManager', // أو أي مسار تراه مناسباً للمواعيد العامة
  element: (
    <ProtectedRoute allowedRoles={['super-doctor']}>
      <MedicalLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, Component: HealthTipsManager }, // استبدل PlaceholderPage هنا
  ],
},
  {
    path: '/consultations',
    element: (
      <ProtectedRoute allowedRoles={['doctor', 'super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,Component:DoctorConsultations },
    ],
  },
  {
    path: '/protocols',
    element: (
      <ProtectedRoute allowedRoles={['doctor', 'super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component:TreatmentProtocols },
    ],
  },
  {
    path: '/analytics',
    element: (
      <ProtectedRoute allowedRoles={['doctor', 'super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component:LabSystem },
    ],
  },
{
  path: '/alerts', 
  element: (
    <ProtectedRoute allowedRoles={['doctor', 'super-doctor']}>
      <MedicalLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, Component: NotificationsManager }, 
  ],
},
  // Secretary Routes
  {
    path: '/secretary-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['secretary']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: SecretaryDashboard },
    ],
  },
  {
    path: '/appointment-requests',
    element: (
      <ProtectedRoute allowedRoles={['secretary']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,Component:AppointmentRequests },
    ],
  },
  {
    path: '/patient-registration',
    element: (
      <ProtectedRoute allowedRoles={['secretary']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: PatientRegistration},
    ],
  },
  {
    path: '/payments',
    element: (
      <ProtectedRoute allowedRoles={['secretary']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,Component:PaymentManagement },
    ],
  },
  {
    path: '/financial-reports',
    element: (
      <ProtectedRoute allowedRoles={['secretary']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <PlaceholderPage title="التقارير المالية" /> },
    ],
  },
  {
    path: '/doctor-schedule',
    element: (
      <ProtectedRoute allowedRoles={['secretary']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,Component:DoctorSchedule },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/case-management', // هذا المسار الموجود في السايدبار عندك
    element: (
      <ProtectedRoute allowedRoles={['super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      // 2. استبدل الـ PlaceholderPage بهذا السطر:
      { index: true, Component: PatientTransfer }, 
    ],
  },


  {
    path: '/archive-management', // هذا المسار الموجود في السايدبار عندك
    element: (
      <ProtectedRoute allowedRoles={['doctor','super-doctor']}>
        <MedicalLayout />
      </ProtectedRoute>
    ),
    children: [
      // 2. استبدل الـ PlaceholderPage بهذا السطر:
      { index: true, Component: ArchiveManagement }, 
    ],
  },


]);