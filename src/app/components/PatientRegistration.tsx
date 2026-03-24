import React, { useState } from 'react';
import { 
  UserPlus, 
  User, 
  Phone, 
  MapPin, 
  ClipboardList, 
  Activity, 
  Save, 
  ArrowRight,
  ChevronLeft,
  Calendar,
  HeartPulse
} from 'lucide-react';

export function PatientRegistration() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="p-10  min-h-screen text-right font-sans" dir="rtl">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[900] text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            تسجيل مريض جديد
          </h1>
          <p className="text-slate-500 font-bold mt-2">يرجى ملء كافة البيانات بدقة لضمان جودة الخدمة الطبية.</p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-2xl border border-slate-100 shadow-sm">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {s}
              </div>
              {s < 3 && <div className="w-4 h-0.5 bg-slate-100 rounded-full"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500">
        
        <div className="p-10">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex items-center gap-2 text-blue-600 font-black mb-4">
                <User className="w-5 h-5" /> المعلومات الشخصية
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 mr-2 uppercase tracking-wider">الاسم الكامل للمريض</label>
                  <input type="text" placeholder="مثال: محمد أحمد العتيبي" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-bold outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 mr-2">العمر</label>
                  <input type="number" placeholder="00" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-bold outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 mr-2">الجنس</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-bold outline-none appearance-none">
                    <option>ذكر</option>
                    <option>أنثى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 mr-2">رقم الهوية / الجواز</label>
                  <input type="text" placeholder="10XXXXXX" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-bold outline-none transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex items-center gap-2 text-emerald-600 font-black mb-4">
                <Phone className="w-5 h-5" /> معلومات التواصل
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 mr-2">رقم الهاتف الجوال</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input type="tel" placeholder="05XXXXXXXX" className="w-full pr-12 pl-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 text-slate-700 font-bold outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 mr-2">العنوان السكني</label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input type="text" placeholder="المدينة، الحي، الشارع" className="w-full pr-12 pl-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 text-slate-700 font-bold outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Medical History (Crucial for Al-Rowad Clinic) */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex items-center gap-2 text-red-600 font-black mb-4">
                <HeartPulse className="w-5 h-5" /> السجل الطبي الأولي
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-red-50/50 rounded-[2rem] border border-red-50 space-y-4">
                  <h4 className="text-sm font-black text-red-800">هل يعاني المريض من أمراض مزمنة؟</h4>
                  <div className="flex gap-4">
                    {['ضغط الدم', 'السكري', 'أمراض القلب', 'أخرى'].map((disease) => (
                      <label key={disease} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-red-100 cursor-pointer hover:bg-red-50 transition-all">
                        <input type="checkbox" className="w-4 h-4 accent-red-600" />
                        <span className="text-xs font-bold text-red-700">{disease}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 mr-2">ملاحظات طبية هامة (اختياري)</label>
                  <textarea rows={4} placeholder="اكتب أي ملاحظات يحتاج الطبيب لمعرفتها قبل الكشف..." className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 text-slate-700 font-bold outline-none resize-none"></textarea>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-10 py-8 bg-slate-50 flex justify-between items-center">
          {step > 1 ? (
            <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-black text-sm hover:text-slate-600 transition-all">
              <ArrowRight className="w-4 h-4 rotate-180" /> السابق
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button onClick={nextStep} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
              التالي <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <button className="px-10 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
              <Save className="w-4 h-4" /> إتمام التسجيل وحفظ الملف
            </button>
          )}
        </div>

      </div>

      {/* Helper Info */}
      <div className="max-w-4xl mx-auto mt-6 flex justify-center gap-6">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <Activity className="w-3 h-3" /> نظام مشفر وآمن 100%
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <ClipboardList className="w-3 h-3" /> متوافق مع معايير الـ SRS
        </div>
      </div>

    </div>
  );
}