import { useState } from 'react';
import { 
  ArrowRightLeft, 
  User, 
  Stethoscope, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Search,
  ChevronLeft,
  Info,
  ShieldCheck
} from 'lucide-react';
import { patients, users } from '../data/medicalCenterData';

export function PatientTransfer() {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [transferType, setTransferType] = useState<'internal' | 'external'>('internal');
  const [isSuccess, setIsSuccess] = useState(false);

  const doctors = users.filter(u => u.role === 'doctor' || u.role === 'super-doctor');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-8 space-y-10 min-h-screen bg-white font-['Cairo'] text-right" dir="rtl">
      
      {/* 1. Header المضيء الموحد */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-l from-[#F0F7FF] to-[#E0E7FF] p-10 rounded-[3.5rem] shadow-sm border border-blue-50 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-[1.8rem] shadow-sm flex items-center justify-center text-[#25527E] border border-blue-100">
            <ArrowRightLeft className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-[900] text-[#25527E] tracking-tight">نظام تحويل الحالات</h1>
            <p className="text-[#4A7299] text-sm font-bold mt-1 tracking-wide">توزيع المرضى بين الأطباء أو توجيههم للمراكز الخارجية</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        
        {/* Form Section */}
        <form onSubmit={handleTransfer} className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-10 relative">
            
            {/* 1. اختيار المريض بتصميم أنيق */}
            <div className="space-y-4">
              <label className="text-[13px] font-[900] text-[#25527E] flex items-center gap-2 mr-2">
                <User className="w-4 h-4 text-[#4A7299]" /> اختيار المريض المراد تحويله
              </label>
              <div className="relative group">
                <select 
                  className="w-full p-5 bg-[#F8FAFF] rounded-[1.5rem] border border-blue-50 outline-none focus:ring-2 focus:ring-[#25527E]/10 font-bold text-[#25527E] appearance-none transition-all cursor-pointer"
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  required
                >
                  <option value="">ابحث عن اسم المريض من القائمة...</option>
                  {/* هنا تظهر قائمة المرضى */}
                </select>
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A7299]">
                   <ChevronLeft className="w-5 h-5 rotate-90" />
                </div>
              </div>
            </div>

            {/* 2. نوع التحويل - بطاقات تفاعلية */}
            <div className="space-y-4">
               <label className="text-[13px] font-[900] text-[#25527E] flex items-center gap-2 mr-2">
                <Info className="w-4 h-4 text-[#4A7299]" /> حدد نوع عملية التحويل
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setTransferType('internal')}
                  className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-3 text-center ${
                    transferType === 'internal' 
                    ? 'border-[#25527E] bg-[#F0F7FF] text-[#25527E] shadow-lg shadow-blue-900/5' 
                    : 'border-gray-50 bg-white text-gray-400 hover:border-blue-100'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${transferType === 'internal' ? 'bg-[#25527E] text-white' : 'bg-gray-50'}`}>
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="font-[900] text-sm tracking-wide">تحويل داخلي (بين الأطباء)</span>
                </button>

                <button 
                  type="button"
                  onClick={() => setTransferType('external')}
                  className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-3 text-center ${
                    transferType === 'external' 
                    ? 'border-[#25527E] bg-[#F0F7FF] text-[#25527E] shadow-lg shadow-blue-900/5' 
                    : 'border-gray-50 bg-white text-gray-400 hover:border-blue-100'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${transferType === 'external' ? 'bg-[#25527E] text-white' : 'bg-gray-50'}`}>
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <span className="font-[900] text-sm tracking-wide">تحويل خارجي (مركز طبي آخر)</span>
                </button>
              </div>
            </div>

            {/* 3. اختيار الوجهة */}
            <div className="pt-4">
              {transferType === 'internal' ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className="text-[13px] font-[900] text-[#25527E] flex items-center gap-2 mr-2">
                    <ShieldCheck className="w-4 h-4 text-[#4A7299]" /> اختيار الطبيب المستلم للحالة
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full p-5 bg-[#F8FAFF] rounded-[1.5rem] border border-blue-50 outline-none focus:ring-2 focus:ring-[#25527E]/10 font-bold text-[#25527E] appearance-none"
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      required
                    >
                      <option value="">اختر الطبيب المتخصص...</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name} - {d.specialty}</option>
                      ))}
                    </select>
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A7299]">
                       <ChevronLeft className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className="text-[13px] font-[900] text-[#25527E] flex items-center gap-2 mr-2">
                    <ExternalLink className="w-4 h-4 text-[#4A7299]" /> اسم المركز أو المستشفى الخارجي
                  </label>
                  <input 
                    type="text" 
                    placeholder="أدخل اسم الجهة الخارجية بدقة..."
                    className="w-full p-5 bg-[#F8FAFF] rounded-[1.5rem] border border-blue-50 outline-none focus:ring-2 focus:ring-[#25527E]/10 font-bold text-[#25527E]"
                    required
                  />
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-[#25527E] text-white rounded-[2rem] font-black text-sm shadow-xl shadow-blue-900/10 hover:bg-[#1a3a5a] transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              تأكيد عملية التحويل الآن
            </button>
          </div>
        </form>

        {/* Sidebar Info Section */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#25527E] to-[#4A7299] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-blue-200" /> بروتوكول التحويل
            </h3>
            <ul className="text-sm space-y-6 font-bold opacity-90 relative z-10">
              <li className="flex items-start gap-4">
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">1</div>
                 <p className="leading-relaxed">سيتم نقل كامل التاريخ المرضي والتقارير للطبيب الجديد تلقائياً.</p>
              </li>
              <li className="flex items-start gap-4">
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">2</div>
                 <p className="leading-relaxed">تأكد من إبلاغ المريض شفهياً قبل إتمام العملية رقمياً.</p>
              </li>
              <li className="flex items-start gap-4">
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">3</div>
                 <p className="leading-relaxed">التحويل الخارجي يتطلب تزويد المريض بتقرير مطبوع.</p>
              </li>
            </ul>
            <ArrowRightLeft className="absolute -bottom-10 -left-10 w-48 h-48 opacity-10 rotate-12" />
          </div>

          {isSuccess && (
            <div className="bg-green-50 border border-green-100 p-8 rounded-[2.5rem] text-green-700 animate-in zoom-in duration-300">
              <div className="flex items-center gap-4 font-black">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                   <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-lg">نجحت العملية!</p>
                   <p className="text-xs opacity-70">تم تحديث سجل المريض بنجاح.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}