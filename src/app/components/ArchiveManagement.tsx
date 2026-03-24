import { useState } from 'react';
import { 
  Archive, FileCheck, UserMinus, Search, 
  BarChart3, FileText, Download, History,
  AlertCircle, CheckCircle2, ChevronLeft
} from 'lucide-react';

const archivedCases = [
  { id: 'ARC-001', name: 'خالد عبد الله', type: 'شفاء', date: '2026-02-15', report: 'تم استكمال كافة جرعات البروتوكول بنجاح واستقرار الحالة.' },
  { id: 'ARC-002', name: 'منيرة أحمد', type: 'وفاة', date: '2026-03-01', report: 'توقف مفاجئ في عضلة القلب نتيجة مضاعفات متقدمة.' },
  { id: 'ARC-003', name: 'سعد العتيبي', type: 'شفاء', date: '2026-03-10', report: 'استجابة ممتازة للعلاج الكيماوي وتلاشي الورم بنسبة 95%.' },
];

export function ArchiveManagement() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [archiveType, setArchiveType] = useState<'شفاء' | 'وفاة' | null>(null);

  return (
    <div className="p-6 md:p-10 space-y-10 font-['Cairo'] text-right bg-white min-h-screen" dir="rtl">
      
      {/* ترويسة الصفحة - احترافية وبسيطة */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#25527E] rounded-2xl text-white shadow-lg shadow-blue-900/20">
            <Archive className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-[900] text-[#25527E]">مركز أرشفة الحالات</h1>
            <p className="text-gray-400 font-bold text-xs mt-1">إدارة السجلات النهائية والتقارير الطبية</p>
          </div>
        </div>

        <div className="flex gap-3">
           <div className="flex flex-col items-center px-5 py-2 rounded-2xl border border-emerald-100 bg-emerald-50/30">
              <span className="text-[10px] font-black text-emerald-600">نسبة الشفاء العامة</span>
              <span className="text-lg font-black text-[#25527E]">84%</span>
           </div>
           <div className="flex flex-col items-center px-5 py-2 rounded-2xl border border-red-100 bg-red-50/30">
              <span className="text-[10px] font-black text-red-600">نسبة الوفيات</span>
              <span className="text-lg font-black text-[#25527E]">6%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* نموذج الأرشفة - الجانب الأيمن */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-1 rounded-3xl border border-gray-100 shadow-xl shadow-gray-500/5 sticky top-10">
            <div className="p-7 space-y-6">
              <h3 className="text-md font-black text-[#25527E] flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                أرشفة ملف جديد
              </h3>
              
              <div className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 mr-1">اسم المريض</label>
                    <select className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-blue-200 focus:bg-white outline-none font-bold text-sm text-[#25527E] transition-all">
                      <option>أحمد العتيبي (ملف: #5521)</option>
                      <option>سارة محمد (ملف: #4490)</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 mr-1">نوع الأرشفة</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setArchiveType('شفاء')}
                        className={`py-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${archiveType === 'شفاء' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-emerald-200'}`}
                      >
                        <FileCheck className="w-5 h-5" />
                        <span className="font-black text-xs">تعافي تام</span>
                      </button>
                      <button 
                         onClick={() => setArchiveType('وفاة')}
                         className={`py-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${archiveType === 'وفاة' ? 'border-red-500 bg-red-50 text-red-700 shadow-md shadow-red-100' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-red-200'}`}
                      >
                        <UserMinus className="w-5 h-5" />
                        <span className="font-black text-xs">حالة وفاة</span>
                      </button>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 mr-1">التقرير الطبي الختامي</label>
                    <textarea 
                      className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-blue-200 focus:bg-white outline-none font-bold text-sm h-32 resize-none transition-all"
                      placeholder="لخص الحالة السريرية والنتائج النهائية هنا..."
                    ></textarea>
                 </div>

                 <button 
                  onClick={() => setShowConfirm(true)}
                  className="w-full py-4 bg-[#25527E] text-white rounded-2xl font-black shadow-lg shadow-blue-900/20 hover:bg-[#1a3a5a] transition-all flex items-center justify-center gap-2 text-sm"
                 >
                   إتمام عملية الأرشفة
                   <ChevronLeft className="w-4 h-4" />
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* سجل الحالات المؤرشفة - الجانب الأيسر */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-[#25527E] flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                السجلات المؤرشفة حديثاً
              </h3>
              <div className="relative w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input type="text" placeholder="بحث باسم المريض..." className="w-full bg-white border border-gray-100 pr-9 pl-4 py-2 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-100" />
              </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {archivedCases.map((caseItem) => (
              <div key={caseItem.id} className="p-6 bg-white rounded-[2rem] border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${caseItem.type === 'شفاء' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {caseItem.type === 'شفاء' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-[900] text-[#25527E] text-sm group-hover:text-blue-600 transition-colors">{caseItem.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-gray-400 font-black">كود: {caseItem.id}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className="text-[10px] text-gray-400 font-black">{caseItem.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-[#25527E] hover:text-white transition-all">
                     <Download className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                  <p className="text-xs text-gray-500 font-bold leading-relaxed italic">
                    "{caseItem.report}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* تذييل للتحليل الإحصائي */}
          <div className="p-6 bg-[#25527E] rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-4 text-white">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                   <h4 className="font-black text-sm">التقارير التحليلية</h4>
                   <p className="text-[10px] text-blue-100 font-bold opacity-80">جاهز للتصدير كملف Excel للتحليل الطبي السنوي</p>
                </div>
             </div>
             <button className="w-full md:w-auto px-8 py-3 bg-white text-[#25527E] rounded-xl font-black text-xs hover:bg-blue-50 transition-all shadow-lg">
                تصدير البيانات
             </button>
          </div>
        </div>
      </div>

      {/* مودال التأكيد */}
      {showConfirm && (
        <div className="fixed inset-0 bg-[#25527E]/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-[2.5rem] max-w-sm w-full p-10 text-center space-y-6 shadow-2xl border border-white">
              <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-black text-[#25527E]">تأكيد الأرشفة</h2>
              <p className="text-gray-400 font-bold text-xs leading-relaxed">
                سيتم إغلاق ملف المريض ونقله للسجلات التاريخية. هذا الإجراء سيوقف كافة العمليات الجارية على الملف.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 bg-[#25527E] text-white rounded-2xl font-black shadow-lg shadow-blue-900/20"
                >
                   نعم، إغلاق الملف
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black hover:bg-gray-100"
                >
                   إلغاء
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}