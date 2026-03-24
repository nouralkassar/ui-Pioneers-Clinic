import { Bell, Settings, HelpCircle, ChevronDown } from 'lucide-react';
import { getCurrentUser } from '../data/medicalCenterData';

export function Navbar() {
  const currentUser = getCurrentUser();

  return (
    <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30 font-['Cairo']">
      
      {/* جهة اليمين - رسالة ترحيبية هادئة بدلاً من البحث */}
      <div>
        <h3 className="text-[#25527E] font-[800] text-lg">
          مرحباً بك، {currentUser?.name.split(' ')[0]}
        </h3>
        <p className="text-[11px] text-gray-400 font-bold">نتمنى لك يوماً سعيداً في عيادة الرواد</p>
      </div>

      {/* جهة اليسار - الإشعارات والبروفايل كما في الصورة */}
      <div className="flex items-center gap-6">
        
        {/* أيقونات الإجراءات السريعة */}
        <div className="flex items-center gap-3 ml-2">
          <button title="المساعدة" className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <button title="الإعدادات" className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
          </button>

          {/* التنبيهات مع النقطة الحمراء */}
          <button className="relative p-2 text-gray-400 hover:bg-[#F0F7FF] hover:text-[#25527E] rounded-xl transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* هوية المستخدم - مطابقة لتنسيق الصورة */}
        <div className="flex items-center gap-4 pr-6 border-r border-gray-100">
          <div className="text-left"> {/* اتجاه النص لليسار لتنسيق الصورة */}
            <div className="text-sm font-[800] text-[#25527E] leading-tight flex items-center gap-1">
              {currentUser?.name}
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
            <div className="text-[10px] font-bold text-[#4A7299] uppercase tracking-wide opacity-70">
              {currentUser?.specialty || 'طاقم العيادة'}
            </div>
          </div>
          
          {/* الصورة الشخصية أو الحروف */}
          <div className="relative">
            <div className="w-11 h-11 bg-[#F0F7FF] border border-[#25527E]/10 rounded-2xl flex items-center justify-center shadow-sm">
              <span className="text-[#25527E] font-bold text-sm">
                {currentUser?.name.charAt(0)}
              </span>
            </div>
            {/* مؤشر الحالة (نشط) */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}