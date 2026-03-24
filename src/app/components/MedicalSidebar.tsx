import { Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard, Users, Calendar, MessageSquare, Syringe,
  TrendingUp, Bell, UserCheck, FileText, DollarSign,
  Activity, LogOut, ChevronDown, Shield, User as UserIcon,
  Icon,
  HeartPulse,
  Archive,
} from 'lucide-react';
import { useState } from 'react';
import { getCurrentUser } from '../data/medicalCenterData';
import { Label } from 'recharts';

interface MedicalSidebarProps {
  onLogout: () => void;
}

export function MedicalSidebar({ onLogout }: MedicalSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  // ... (نفس مصفوفات المنيو السابقة دون تغيير في المنطق)
  const superDoctorMenu = [
    { path: '/super-dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { path: '/my-patients', icon: Users, label: 'مرضائي' },
    { path: '/appointments', icon: Calendar, label: 'المواعيد' },
    { path: '/consultations', icon: MessageSquare, label: 'الاستشارات' },
    { path: '/protocols', icon: Syringe, label: 'البروتوكولات' },
    // { path: '/analytics', icon: TrendingUp, label: 'التحليلات' },
    { path: '/alerts', icon: Bell, label: 'التنبيهات' },
    { path: '/account-management', icon: UserCheck, label: 'إدارة الحسابات' },
    { path: '/doctor-management', icon: Activity, label: 'إدارةالاطباء' },
    { path: '/case-management', icon: FileText, label: 'إدارة الحالات' },
    {path : '/healthTipsManager', icon: HeartPulse, label: 'النصائح والدعم النفسي'},
  ];

  const secretaryMenu = [
    { path: '/secretary-dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { path: '/appointment-requests', icon: Calendar, label: 'طلبات المواعيد' },
    { path: '/patient-registration', icon: Users, label: 'تسجيل المرضى' },
    { path: '/payments', icon: DollarSign, label: 'إدارة المدفوعات' },
    { path: '/financial-reports', icon: FileText, label: 'التقارير المالية' },
    { path: '/doctor-schedule', icon: Activity, label: 'جداول الأطباء' },
  ];

  const doctorMenu = [
    { path: '/doctor-dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { path: '/my-patients', icon: Users, label: 'مرضائي' },
    { path: '/appointments', icon: Calendar, label: 'المواعيد' },
    { path: '/consultations', icon: MessageSquare, label: 'الاستشارات' },
    { path: '/protocols', icon: Syringe, label: 'البروتوكولات' },
    { path: '/analytics', icon: TrendingUp, label: 'التحليلات الطبية' },
    { path: '/alerts', icon: Bell, label: 'التنبيهات' },
        { path: '/archive-management', icon: Archive, label: 'ارشفة الحالات ' },

  ];

  const menuItems = currentUser?.role === 'super-doctor' ? superDoctorMenu : currentUser?.role === 'secretary' ? secretaryMenu : doctorMenu;
return (
    <div className="h-screen w-72 flex flex-col bg-white border-l border-gray-100 shadow-sm font-['Cairo']">
      
      {/* قسم الشعار - عيادة الرواد */}
      <div className="p-8 pb-4 text-right">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-[#25527E]/10 overflow-hidden group">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-[900] text-[#25527E] text-2xl leading-tight tracking-tight">
              عيادة الرواد
            </h1>
            <p className="text-[11px] font-extrabold text-[#4A7299] tracking-[0.15em] uppercase opacity-80">
              Consulting Clinic
            </p>
          </div>
        </div>
      </div>

      {/* الخط الفاصل المتمركز الخفيف */}
      <div className="px-12 mb-6"> 
        {/* زيادة الـ px لـ 12 تجعل الخط قصيراً ومتمركزاً في المنتصف */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* قائمة التنقل */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        {/* <div className="px-5 mb-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] opacity-50">
          القائمة الرئيسية
        </div> */}
        
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 relative group ${
                    isActive 
                    ? 'bg-[#F0F7FF] text-[#25527E]' 
                    : 'text-[#25527E] hover:bg-gray-50/80'
                  }`}
                >
                  {isActive && (
                    <div className="absolute right-0 w-1 h-6 bg-[#25527E] rounded-l-full" />
                  )}
                  
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#25527E]' : 'text-[#25527E] opacity-70 group-hover:opacity-100'}`} />
                  <span className={`text-[15px] font-[800] ${isActive ? 'text-[#25527E]' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* زر تسجيل الخروج - مرتفع قليلاً ومنسق */}
      <div className="p-4 mt-auto border-t border-gray-50 bg-white">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-5 py-4 rounded-2xl transition-all w-full text-[#25527E] hover:bg-red-50 hover:text-red-500 font-[800] text-[15px] group shadow-sm border border-gray-50"
        >
          <div className="p-1.5 bg-red-50 text-[#25527E] rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <span>تسجيل الخروج</span>
        </button>
      </div>
      
    </div>
  );
}