import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  TrendingUp,
  FileText,
  LogOut,
  Activity,
} from 'lucide-react';

interface PioneersSidebarProps {
  onLogout: () => void;
  isSuperDoctor?: boolean;
}

export function PioneersSidebar({ onLogout, isSuperDoctor = false }: PioneersSidebarProps) {
  const location = useLocation();

  const superDoctorMenu = [
    { path: '/super-dashboard', icon: LayoutDashboard, label: 'لوحة المشرف' },
    { path: '/account-approvals', icon: UserCheck, label: 'الموافقات' },
    { path: '/staff-management', icon: Users, label: 'طاقم العمل' },
    { path: '/analytics', icon: TrendingUp, label: 'التحليلات العامة' },
    { path: '/all-patients', icon: FileText, label: 'سجلات المرضى' },
  ];

  const doctorMenu = [
    { path: '/doctor-dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { path: '/my-patients', icon: Users, label: 'مرضائي' },
    { path: '/protocols', icon: Activity, label: 'البروتوكولات' },
    { path: '/medical-records', icon: FileText, label: 'السجلات الطبية' },
  ];

  const menuItems = isSuperDoctor ? superDoctorMenu : doctorMenu;

  return (
    <div 
      className="h-screen w-64 flex flex-col"
      style={{ backgroundColor: 'var(--color-sidebar)' }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-lg">عيادة رواد</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {isSuperDoctor ? 'المشرف العام' : 'واجهة الطبيب'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'hover:bg-opacity-10'
                  }`}
                  style={isActive ? {
                    backgroundColor: 'var(--color-primary-blue)',
                  } : {
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="mb-3 px-4 py-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
            >
              <span className="text-white font-semibold">أع</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">د. أميرة العلي</p>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {isSuperDoctor ? 'مشرف عام' : 'طبيب أورام'}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full"
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#FCA5A5';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
          }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
