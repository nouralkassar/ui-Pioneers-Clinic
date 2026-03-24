import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  Search,
  CalendarDays,
  MoreVertical,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { users, appointments as initialAppointments } from '../data/medicalCenterData';

export function GeneralAppointments() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [searchTerm, setSearchTerm] = useState('');

  // نستخدم البيانات من ملفك الأصلي ليكون الكود واقعياً
  const appointments = initialAppointments;

  return (
    <div className="p-8 space-y-8 min-h-screen bg-white font-['Cairo'] text-right" dir="rtl">
      
      {/* Header القسم العلوي */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#25527E]/5 p-8 rounded-[2.5rem] border border-[#25527E]/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#25527E] rounded-lg text-white">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-[900] text-[#25527E]">جدول المواعيد المركزي</h1>
          </div>
          <p className="text-gray-500 font-bold text-sm">لديك {appointments.length} مواعيد مجدولة لهذا اليوم</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* محول العرض (يوم/أسبوع/شهر) */}
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
            {[
              { id: 'day', label: 'اليوم' },
              { id: 'week', label: 'الأسبوع' },
              { id: 'month', label: 'الشهر' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setView(t.id as any)}
                className={`px-6 py-2 rounded-xl font-black text-xs transition-all ${
                  view === t.id ? 'bg-[#25527E] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-[#25527E] text-white rounded-2xl font-black text-sm hover:bg-[#1a3a5a] transition-all shadow-lg shadow-blue-900/10">
            <Plus className="w-4 h-4" /> حجز موعد جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters - الجانب الأيمن */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm sticky top-8">
            <h3 className="font-black text-[#25527E] mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
              <Filter className="w-4 h-4 text-[#4A7299]" /> أدوات التصفية
            </h3>
            
            <div className="space-y-6">
              {/* البحث */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">بحث سريع</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="اسم المريض أو الرقم..."
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#25527E]/20 outline-none font-bold text-xs transition-all"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* تصفية الأطباء */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">اختيار الطبيب</label>
                <div className="space-y-2">
                  <select className="w-full p-3 bg-gray-50 rounded-xl border border-transparent outline-none font-bold text-xs text-[#25527E]">
                    <option>جميع الكادر الطبي</option>
                    {users.filter(u => u.role === 'doctor').map(d => (
                      <option key={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* حالة الموعد */}
              <div className="space-y-3 pt-4">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">حالة الحجز</label>
                 <div className="flex flex-wrap gap-2">
                    {['مؤكد', 'انتظار', 'ملغي'].map(status => (
                      <button key={status} className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 rounded-lg text-[10px] font-black text-gray-500 transition-all border border-gray-100">
                        {status}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List - قائمة المواعيد */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6 px-4">
            <h2 className="font-[900] text-[#25527E] text-lg">جدول اليوم: الاثنين، 9 مارس 2026</h2>
            <div className="flex gap-2">
               <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"><ChevronRight className="w-4 h-4 text-gray-400"/></button>
               <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"><ChevronLeft className="w-4 h-4 text-gray-400"/></button>
            </div>
          </div>

          <div className="space-y-4">
            {appointments.map((app) => (
              <div key={app.id} className="group bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* الوقت والمعلومات الأساسية */}
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center min-w-[80px] py-2 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-[#25527E] group-hover:text-white transition-all duration-300">
                      <span className="text-sm font-[900]">{app.time}</span>
                      <span className="text-[9px] font-black opacity-60 uppercase">صباحاً</span>
                    </div>

                    <div className="h-10 w-[1px] bg-gray-100 hidden md:block" />

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-[900] text-[#25527E] text-base group-hover:text-blue-700 transition-colors">{app.patientName}</h4>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                          app.status === 'مؤكد' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                          <Stethoscope className="w-3.5 h-3.5 text-[#4A7299]" /> {app.doctorName}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                          <Activity className="w-3.5 h-3.5 text-[#4A7299]" /> {app.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* إجراءات الموعد */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    {app.status === 'بحاجة موافقة' ? (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-[10px] font-black hover:bg-green-600 transition-all shadow-md shadow-green-100">قبول الموعد</button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-xl text-[10px] font-black hover:bg-red-50 hover:text-red-500 transition-all">رفض</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                         <button className="flex items-center gap-2 px-4 py-2 bg-[#F0F7FF] text-[#25527E] rounded-xl text-[11px] font-black hover:bg-[#25527E] hover:text-white transition-all">
                           تعديل الوقت
                         </button>
                         <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-all">
                           <MoreVertical className="w-4 h-4" />
                         </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* خط جانبي جمالي */}
                <div className={`absolute right-0 top-0 h-full w-1.5 ${
                  app.status === 'مؤكد' ? 'bg-green-500' : 'bg-amber-400'
                } opacity-40`} />
              </div>
            ))}

            {/* حالة عدم وجود مواعيد */}
            {appointments.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CalendarIcon className="w-8 h-8 text-gray-200" />
                </div>
                <p className="text-gray-400 font-bold">لا توجد مواعيد مسجلة في هذا اليوم</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// أيقونة النشاط التي تم استخدامها
function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}