import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  FlaskConical,
  Archive,
  LogOut,
  Activity,
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export function SidebarAr({ onLogout }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { path: '/patients', icon: Users, label: 'المرضى' },
    { path: '/appointments', icon: Calendar, label: 'المواعيد' },
    { path: '/chat', icon: MessageSquare, label: 'الاستشارات' },
    { path: '/lab-results', icon: FlaskConical, label: 'نتائج المختبر' },
    { path: '/archive', icon: Archive, label: 'الأرشيف' },
  ];

  return (
    <div className="h-screen w-64 bg-white border-l border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">بوابة الأورام</div>
            <div className="text-xs text-gray-500">لوحة تحكم الطبيب</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
