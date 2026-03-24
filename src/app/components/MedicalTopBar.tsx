import { Bell, Settings, HelpCircle, ChevronDown,Activity } from 'lucide-react';
import { useState } from 'react';
import { getCurrentUser } from '../data/medicalCenterData';

export function MedicalTopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const currentUser = getCurrentUser();

  const notifications = [
    { id: 1, title: 'موعد جديد', message: 'طلب موعد من المريض عمر الزهراني', time: 'منذ 5 دقائق', unread: true },
    { id: 2, title: 'تنبيه طبي', message: 'نتائج حرجة للمريض فهد المطيري', time: 'منذ 15 دقيقة', unread: true },
    { id: 3, title: 'استشارة جديدة', message: 'استفسار من المريض ليلى حسن', time: 'منذ ساعة', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="h-25 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30 font-['Cairo']">
      
      {/* جهة اليمين - رسالة ترحيبية بدلاً من حقل البحث المحذوف */}
     <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* أيقونة تعبيرية بسيطة تتغير حسب الوقت أو تبقى ثابتة كرمز للعيادة */}
      {/* <div className="w-12 h-12 bg-[#F8FAFC] border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
        <Activity className="w-6 h-6 text-[#25527E] opacity-80" />
      </div> */}

        <div className="flex flex-col">
          {/* عرض اسم الصفحة الحالية بشكل ديناميكي أو ثابت */}
          <h2 className="text-[#25527E] font-[900] text-base leading-tight">
            نظام الإدارة المتكامل
          </h2>
    
    <div className="flex items-center gap-2 mt-1">
      {/* التاريخ اليومي - مناسب جداً للكل لمتابعة المواعيد والعمليات */}
      <span className="text-[15px] font-[800] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
        {new Date().toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long' })}
      </span>
      
      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
      
      {/* حالة النظام - تعطي ثقة للمستخدم أن كل شيء يعمل */}
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse"></div>
        <span className="text-[13px] font-bold text-[#4A7299] uppercase tracking-wide">العيادة متصلة</span>
      </div>
    </div>
  </div>
</div>

      {/* جهة اليسار - الأكشن والبروفايل */}
      <div className="flex items-center gap-6">
        
        {/* أيقونات الوصول السريع */}
        <div className="flex items-center gap-5 border-l border-gray-100 pl-6">
          {/* <button title="المساعدة" className="p-2.5 text-gray-400 hover:bg-gray-50 hover:text-[#25527E] rounded-xl transition-all">
            <HelpCircle className="w-5 h-5" />
          </button> */}
          
          <button title="الإعدادات" className="p-2.5 text-[#25527E] hover:bg-gray-50 hover:text-[#25527E] rounded-xl transition-all">
            <Settings className="w-7 h-7" />
          </button>

          {/* التنبيهات */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2.5 rounded-xl transition-all group ${
                showNotifications ? 'bg-[#F0F7FF] text-[#25527E]' : 'text-[#25527E] hover:bg-gray-50'
              }`}
            >
              <Bell className="w-7 h-7" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
              )}
            </button>

            {/* دروب داون الإشعارات بتصميم "WeCare" */}
            {showNotifications && (
              <div className="absolute left-0 mt-4 w-80 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-50 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-5 py-4 bg-[#FBFDFF] border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-[800] text-[#25527E] text-sm">الإشعارات</h3>
                  <span className="bg-[#25527E] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {unreadCount} جديد
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                        notif.unread ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      {notif.unread && <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#25527E]" />}
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-[800] text-xs text-[#25527E]">{notif.title}</p>
                        <span className="text-[10px] text-gray-400 font-bold">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed font-medium">{notif.message}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-[11px] font-[800] text-[#25527E] bg-white hover:bg-gray-50 transition-colors border-t border-gray-50">
                  عرض الكل
                </button>
              </div>
            )}
          </div>
        </div>

        {/* بروفايل المستخدم */}
        <div className="flex items-center gap-4">
          <div className="text-left hidden md:block">
            <div className="text-sm font-[800] text-[#25527E] leading-tight flex items-center gap-1 justify-end">
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 order-first" />
              {currentUser?.name}
            </div>
            <div className="text-[10px] font-bold text-[#4A7299] uppercase tracking-wide opacity-70">
              {currentUser?.specialty || 'طاقم العيادة'}
            </div>
          </div>
          
          <div className="relative group cursor-pointer">
            <div className="w-11 h-11 bg-[#F0F7FF] border border-[#25527E]/10 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <span className="text-[#25527E] font-[800] text-sm">
                {currentUser?.name.charAt(0)}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
}