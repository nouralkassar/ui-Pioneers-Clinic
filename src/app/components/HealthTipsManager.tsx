import { useState } from 'react';
import { 
  PenLine, HeartPulse, BrainCircuit, Sparkles, 
  Send, Trash2, List, Calendar, User, 
  Lightbulb, MessageSquareHeart, CheckCircle 
} from 'lucide-react';

export function HealthTipsManager() {
  const [tipType, setTipType] = useState<'medical' | 'psychological'>('medical');

  return (
    <div className="p-8 space-y-10 min-h-screen bg-white font-['Cairo'] text-right" dir="rtl">
      
      {/* 1. Header المضيء الموحد للنظام */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-l from-[#F0F7FF] to-[#E0E7FF] p-10 rounded-[3.5rem] shadow-sm border border-blue-50 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-[1.8rem] shadow-sm flex items-center justify-center text-[#25527E] border border-blue-100">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-[900] text-[#25527E] tracking-tight">إدارة المحتوى التوعوي</h1>
            <p className="text-[#4A7299] text-sm font-bold mt-1 tracking-wide">انشر المعرفة الطبية والدعم النفسي لمرضى العيادة</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* 2. نموذج الإضافة (Add Form) - تصميم مثبت وأنيق */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm sticky top-8">
            <h3 className="font-black text-[#25527E] text-lg mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#25527E]">
                <PenLine className="w-5 h-5" />
              </div>
              إنشاء محتوى جديد
            </h3>
            
            <div className="space-y-8">
              {/* اختيار نوع المحتوى */}
              <div className="flex gap-2 p-1.5 bg-[#F8FAFF] rounded-2xl border border-blue-50/50">
                <button 
                  onClick={() => setTipType('medical')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-xs transition-all duration-300 ${
                    tipType === 'medical' 
                    ? 'bg-[#25527E] text-white shadow-lg shadow-blue-900/10' 
                    : 'text-gray-400 hover:text-[#25527E]'
                  }`}
                >
                  <HeartPulse className="w-4 h-4" /> نصيحة طبية
                </button>
                <button 
                  onClick={() => setTipType('psychological')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-xs transition-all duration-300 ${
                    tipType === 'psychological' 
                    ? 'bg-[#25527E] text-white shadow-lg shadow-blue-900/10' 
                    : 'text-gray-400 hover:text-[#25527E]'
                  }`}
                >
                  <BrainCircuit className="w-4 h-4" /> دعم نفسي
                </button>
              </div>

              {/* حقول الإدخال */}
              <div className="space-y-4">
                <div className="space-y-2 px-1">
                  <label className="text-[11px] font-[900] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5" /> عنوان المحتوى
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-5 bg-[#F8FAFF] rounded-2xl border border-transparent outline-none font-bold text-sm text-[#25527E] focus:ring-2 focus:ring-[#25527E]/10 transition-all" 
                    placeholder="مثال: أهمية النوم الصحي..." 
                  />
                </div>

                <div className="space-y-2 px-1">
                  <label className="text-[11px] font-[900] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MessageSquareHeart className="w-3.5 h-3.5" /> نص النصيحة بالتفصيل
                  </label>
                  <textarea 
                    className="w-full p-5 bg-[#F8FAFF] rounded-2xl border border-transparent outline-none font-bold text-sm h-40 resize-none text-[#25527E] focus:ring-2 focus:ring-[#25527E]/10 transition-all leading-relaxed" 
                    placeholder="اكتب رسالتك للمرضى هنا..." 
                  />
                </div>
              </div>

              <button className="w-full py-5 bg-[#25527E] text-white rounded-[2rem] font-black text-sm shadow-xl shadow-blue-900/10 hover:bg-[#1a3a5a] transition-all flex items-center justify-center gap-3 active:scale-95">
                <Send className="w-4 h-4" /> نشر النصيحة الآن
              </button>
            </div>
          </div>
        </div>

        {/* 3. عرض النصائح المنشورة - بطاقات بتصميم اجتماعي */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-4 mb-2">
              <h3 className="font-black text-[#25527E] text-lg flex items-center gap-2">
                <List className="w-6 h-6" /> السجل التوعوي
              </h3>
              <span className="text-[11px] font-black text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">إجمالي المنشورات: 24</span>
           </div>

           {[1, 2, 3].map((i) => (
             <div key={i} className="group bg-white rounded-[2.8rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/[0.03] transition-all duration-500 relative flex flex-col md:flex-row gap-6 overflow-hidden">
                
                {/* أيقونة الحالة الجانبية */}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-500 ${
                  i === 1 ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {i === 1 ? <HeartPulse className="w-10 h-10 md:w-12 md:h-12" /> : <BrainCircuit className="w-10 h-10 md:w-12 md:h-12" />}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                         <span className={`text-[10px] font-black px-3 py-0.5 rounded-full ${i === 1 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {i === 1 ? 'إرشادات طبية' : 'تطوير نفسي'}
                         </span>
                         <span className="text-[10px] font-black text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> تم النشر للمرضى
                         </span>
                      </div>
                      <h4 className="font-[900] text-[#25527E] text-xl mb-2">{i === 1 ? 'أهمية التغذية المتوازنة بعد الجرعات' : 'كيف تحافظ على هدوئك النفسي خلال العلاج؟'}</h4>
                    </div>
                    <button className="text-gray-200 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-xl">
                       <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm font-bold text-[#4A7299] leading-[1.8] opacity-80">
                    هذا المحتوى التوعوي يهدف إلى تحسين جودة حياة المرضى من خلال اتباع نظام غذائي غني بالبروتينات والألياف، مع مراعاة شرب كميات كافية من السوائل لتعويض الفاقد...
                  </p>

                  <div className="pt-6 border-t border-gray-50 flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-300" />
                      <span>نُشر في: 12 مارس 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400">
                      <User className="w-3.5 h-3.5 text-blue-300" />
                      <span>بواسطة: د. محمود</span>
                    </div>
                  </div>
                </div>
                
                {/* ديكور خلفي بسيط */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gray-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}