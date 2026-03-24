import { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  Calendar, 
  CheckCircle2, 
  Search, 
  Filter,
  MoreHorizontal,
  Trash2,
  ShieldAlert,
  Clock,
  ArrowLeft,
  Phone,
  User
} from 'lucide-react';

export function NotificationsManager() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'medical' | 'system' | 'appointments'>('all');

  // بيانات محسنة تتناسب مع احتياجات عيادة الرواد
  const notifications = [
    { 
      id: 1, 
      type: 'medical', 
      title: 'تنبيه طبي حرج - حالة طارئة', 
      desc: 'المريض عمر بن سالم: انخفاض حاد في كريات الدم البيضاء بعد الجلسة الأخيرة.', 
      time: 'منذ 5 دقائق',
      priority: 'high',
      isRead: false
    },
    { 
      id: 2, 
      type: 'appointments', 
      title: 'طلب استشارة جديدة', 
      desc: 'المريضة منى خالد تطلب استشارة عاجلة بخصوص "أعراض جانبية".', 
      time: 'منذ 25 دقيقة',
      priority: 'medium',
      isRead: false
    },
    { 
      id: 3, 
      type: 'system', 
      title: 'تم تفعيل حساب طبيب جديد', 
      desc: 'تم الانتهاء من مراجعة وتفعيل حساب د. سارة الخالدي بنجاح.', 
      time: 'منذ ساعتين',
      priority: 'low',
      isRead: true
    },
  ];

  const getIconConfig = (type: string) => {
    switch(type) {
      case 'medical': return { icon: AlertTriangle, bg: 'bg-red-50', text: 'text-red-600', border: 'border-r-red-500' };
      case 'system': return { icon: ShieldAlert, bg: 'bg-blue-50', text: 'text-[#25527E]', border: 'border-r-[#25527E]' };
      case 'appointments': return { icon: Calendar, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-r-amber-500' };
      default: return { icon: Info, bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-r-gray-300' };
    }
  };

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen font-['Cairo'] text-right" dir="rtl">
      
      {/* 1. الترويسة مع إحصائيات سريعة */}
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-gradient-to-l from-[#367bbc] to-[#E0E7FF] p-8 rounded-[3rem] text-[#25527E] shadow-sm border border-blue-50">        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-[900]">مركز التنبيهات الذكي</h1>
              <p className="text-blue-100 text-sm font-bold mt-1">لديك (2) تنبيهات غير مقروءة تتطلب انتباهك</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <p className="text-[10px] font-black opacity-60 uppercase">إجمالي اليوم</p>
              <p className="text-lg font-black">24</p>
            </div>
            <div className="bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-500/20">
              <p className="text-[10px] font-black text-red-100 opacity-60 uppercase">حالات حرجة</p>
              <p className="text-lg font-black text-red-100">03</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-sm transition-all border border-white/20">
          <Trash2 className="w-4 h-4" /> مسح كافة التنبيهات
        </button>
      </div>

      {/* 2. شريط الفلترة الاحترافي */}
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 pb-4">
        {[
          { id: 'all', label: 'كافة الإشعارات', icon: Filter },
          { id: 'medical', label: 'تنبيهات طبية', icon: AlertTriangle },
          { id: 'appointments', label: 'المواعيد', icon: Calendar },
          { id: 'system', label: 'تحديثات النظام', icon: ShieldAlert },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all ${
              activeFilter === tab.id 
              ? 'bg-[#25527E] text-white shadow-lg shadow-blue-900/10' 
              : 'text-gray-400 hover:text-[#25527E] hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. قائمة الإشعارات */}
      <div className="max-w-5xl space-y-4">
        {notifications.map((note) => {
          const config = getIconConfig(note.type);
          const Icon = config.icon;
          
          return (
            <div 
              key={note.id} 
              className={`group bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden ${config.border} border-r-8`}
            >
              {/* أيقونة الحالة */}
              <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center shrink-0 ${config.bg} ${config.text} transition-transform group-hover:scale-110`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className={`font-[900] text-lg ${note.isRead ? 'text-gray-400' : 'text-[#25527E]'}`}>
                    {note.title}
                    {!note.isRead && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400">
                    <Clock className="w-3 h-3" /> {note.time}
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500 leading-relaxed max-w-3xl">
                  {note.desc}
                </p>
                
                {/* أزرار الإجراءات التفاعلية */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {note.type === 'medical' && (
                    <button className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-xl text-[10px] font-black hover:bg-red-600 transition-all shadow-md shadow-red-100">
                      <Phone className="w-3 h-3" /> اتصال فوري بالمريض
                    </button>
                  )}
                  {note.type === 'appointments' && (
                    <button className="flex items-center gap-2 px-5 py-2 bg-[#25527E] text-white rounded-xl text-[10px] font-black hover:bg-[#1a3a5a] transition-all">
                      <Calendar className="w-3 h-3" /> عرض الجدول
                    </button>
                  )}
                  <button className="px-5 py-2 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black hover:bg-gray-100 hover:text-[#25527E] transition-all">
                    تجاهل التنبيه
                  </button>
                  <button className="px-5 py-2 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black hover:bg-red-50 hover:text-red-500 transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* زر خيارات إضافية */}
              <button className="absolute left-6 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all">
                <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 4. تذييل بسيط */}
      <div className="text-center pt-8 border-t border-gray-50">
        <p className="text-xs font-bold text-gray-400">يتم الاحتفاظ بسجل التنبيهات لمدة 30 يوماً فقط</p>
      </div>
    </div>
  );
}