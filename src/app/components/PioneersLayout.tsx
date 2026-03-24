import { Outlet, useNavigate } from 'react-router';
import { PioneersSidebar } from './PioneersSidebar';
import { PioneersTopBar } from './PioneersTopBar';

interface PioneersLayoutProps {
  isSuperDoctor?: boolean;
}

export function PioneersLayout({ isSuperDoctor = false }: PioneersLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isSuperDoctor');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <PioneersSidebar onLogout={handleLogout} isSuperDoctor={isSuperDoctor} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PioneersTopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
