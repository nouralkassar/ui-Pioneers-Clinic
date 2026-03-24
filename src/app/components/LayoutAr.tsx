import { Outlet, useNavigate } from 'react-router';
import { SidebarAr } from './SidebarAr';
import { NavbarAr } from './NavbarAr';

export function LayoutAr() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <SidebarAr onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarAr />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
