import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { 
  User, FileText, Activity, Beaker, History, 
  Plus, Save, ChevronRight, AlertCircle, Clock
} from 'lucide-react';
import { patients } from '../data/medicalCenterData'; // افترض وجود جلسات في بياناتك

export function PatientProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('summary');
  const [showAddSession, setShowAddSession] = useState(false);

  // جلب بيانات المريض
  const patient = patients.find(p => p.id === id);

  if (!patient) return <div className="p-10 text-center font-black">المريض غير موجود</div>;

  const tabs = [
    { id: 'summary', label: 'الملخص الطبي', icon: FileText },
    { id: 'sessions', label: 'الجلسات العلاجية', icon: Activity },
    { id: 'labs', label: 'التحاليل والأشعة', icon: Beaker },
    { id: 'history', label: 'تاريخ المرض', icon: History },
  ];

  return (
    <div className="p-8 space-y-6 font-['Cairo'] text-right" dir="rtl">
      {/* Header - شريط المسار والعودة */}
      <div className="flex items-center gap-2 text-gray-400 mb-4">
        <Link to="/my-patients" className="hover:text-[#25527E] transition-colors">قائمة المرضى</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-black text-[#25527E]">ملف المريض: {patient.name}</span>
      </div>

      {/* بطاقة تعريف المريض العلوية */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#2F6FA3] to-[#25527E] flex items-center justify-center text-white text-3xl font-black shadow-lg">
            {patient.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#25527E] mb-1">{patient.name}</h1>
            <div className="flex gap-4 text-sm font-bold text-gray-500">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {patient.age} سنة</span>
              <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> الحالة: {patient.status}</span>
              <span className="flex items-center gap-1 text-red-500"><AlertCircle className="w-4 h-4" /> فصيلة الدم: O+</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddSession(true)}
            className="flex items-center gap-2 bg-[#25527E] text-white px-6 py-3 rounded-2xl font-black hover:bg-[#1a3a5a] transition-all shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5" />
            إضافة جلسة علاجية
          </button>
        </div>
      </div>

      {/* نظام التبويبات (Tabs) */}
      <div className="flex gap-4 border-b border-gray-100 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-black text-sm transition-all relative ${
              activeTab === tab.id ? 'text-[#25527E]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#25527E] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* محتوى التبويبات */}
      <div className="mt-6">
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-black text-[#25527E] border-b pb-2">التشخيص الحالي</h3>
              <textarea 
                className="w-full bg-gray-50 rounded-2xl p-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none"
                defaultValue={patient.diagnosis}
                rows={4}
              />
              <button className="flex items-center gap-2 bg-[#F0F7FF] text-[#25527E] px-4 py-2 rounded-xl font-black text-xs hover:bg-blue-100 transition-all">
                <Save className="w-4 h-4" /> حفظ التعديلات
              </button>
            </div>
            
            <div className="bg-[#1e293b] text-white rounded-[2rem] p-6 shadow-sm space-y-4">
              <h3 className="font-black border-b border-white/10 pb-2 flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-4 h-4" /> ملاحظات طبية هامة
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                يجب الحذر من أدوية الضغط التي تسبب الحساسية للمريض. المريض لديه استجابة بطيئة لبروتوكول A.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            {/* عرض الجلسات السابقة (المتطلب 4) */}
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex flex-col items-center justify-center text-[#25527E]">
                    <span className="text-[10px] font-black italic">MAR</span>
                    <span className="text-lg font-black leading-none">{10-i}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-[#25527E]">جلسة علاج كيميائي - بروتوكول {i === 1 ? 'A' : 'B'}</h4>
                    <p className="text-xs text-gray-500 font-bold">بإشراف: د. {patient.assignedDoctorName}</p>
                  </div>
                </div>
                <div className="text-left font-bold">
                  <span className="block text-xs text-gray-400 italic">الجرعة</span>
                  <span className="text-sm text-slate-700">500mg / BSA 1.8</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: إضافة جلسة جديدة (المتطلب 4) */}
      {showAddSession && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-black text-[#25527E] mb-6 flex items-center gap-2 border-b pb-4">
              <Plus className="bg-blue-50 p-1 rounded-lg" /> تسجيل جلسة علاجية جديدة
            </h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-500 mr-2">تاريخ الجلسة</label>
                  <input type="date" className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-500 mr-2">نوع العلاج</label>
                  <select className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-sm focus:ring-2 focus:ring-blue-100 outline-none">
                    <option>علاج كيميائي</option>
                    <option>علاج مناعي</option>
                    <option>فحص دوري</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-500 mr-2">الجرعة الدوائية</label>
                <input type="text" placeholder="مثال: 500mg" className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-500 mr-2">ملاحظات الطبيب</label>
                <textarea rows={3} placeholder="اكتب ملاحظات الجلسة هنا..." className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-[#25527E] text-white py-3 rounded-2xl font-black shadow-lg hover:bg-[#1a3a5a] transition-all active:scale-95">حفظ الجلسة</button>
                <button 
                  type="button" 
                  onClick={() => setShowAddSession(false)}
                  className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-2xl font-black hover:bg-gray-200 transition-all"
                > إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}