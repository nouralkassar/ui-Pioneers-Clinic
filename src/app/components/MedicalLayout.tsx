import { Outlet, useNavigate } from 'react-router';
import { MedicalSidebar } from './MedicalSidebar';
import { MedicalTopBar } from './MedicalTopBar';

export function MedicalLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/login');
  };
return (
    // تم تغيير bg-gray-50 إلى bg-white
    // أضفنا font-['Cairo'] لضمان مظهر الخط العربي الاحترافي لمركز الرواد
    <div className="flex h-screen bg-white font-['Cairo']" dir="rtl">
      
      {/* القائمة الجانبية - يفضل إضافة border-l لتمييزها عن الخلفية البيضاء */}
      <div className="border-l border-gray-100 shadow-sm">
        <MedicalSidebar onLogout={handleLogout} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* البار العلوي - يفضل إضافة shadow خفيف ليظهر فوق الخلفية البيضاء */}
        <div className="z-10 shadow-sm border-b border-gray-50">
          <MedicalTopBar />
        </div>

        <main className="flex-1 overflow-y-auto bg-white p-2">
          {/* Outlet هو المكان الذي تظهر فيه صفحاتك (المرضى، الإحصائيات، إلخ) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
