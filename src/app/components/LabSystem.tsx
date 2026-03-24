import { useState } from 'react';
import { 
  Beaker, ClipboardList, ExternalLink, 
  CheckCircle2, Clock, Search, Filter, 
  FlaskConical, AlertCircle, UploadCloud
} from 'lucide-react';

const labOrders = [
  { id: 'LAB-552', patient: 'أحمد العتيبي', testName: 'وظائف كبد (ALT/AST)', status: 'قيد التنفيذ', priority: 'عاجل' },
  { id: 'LAB-553', patient: 'سارة عبد الرحمن', testName: 'صورة دم كاملة (CBC)', status: 'بانتظار العينة', priority: 'عادي' },
  { id: 'LAB-554', patient: 'ليلى خالد', testName: 'فحص جيني (Genotype)', status: 'غير متوفر - تحويل خارجي', priority: 'عادي' },
];

export function LabSystem() {
  return (
    <div className="p-6 md:p-10 space-y-8 font-['Cairo'] text-right min-h-screen" dir="rtl">
      
      {/* الترويسة */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-white">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-violet-600 rounded-2xl shadow-lg shadow-violet-100">
            <FlaskConical className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#25527E]">قسم المختبر والتحاليل</h1>
            <p className="text-gray-400 font-bold text-xs">إدارة الفحوصات الطبية وتتبع النتائج</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="ابحث عن مريض أو رقم طلب..."
            className="w-full pr-10 pl-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-violet-400 outline-none font-bold text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* قائمة الطلبات الواردة */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-black text-[#25527E] flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-violet-500" />
              طلبات التحاليل الحالية
            </h3>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-violet-50 text-violet-600 rounded-lg text-[10px] font-black">إجمالي: {labOrders.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                <tr>
                  <th className="p-5">رقم الطلب</th>
                  <th className="p-5">المريض</th>
                  <th className="p-5">نوع التحليل</th>
                  <th className="p-5">الحالة</th>
                  <th className="p-5">الإجراء</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-[#25527E]">
                {labOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-violet-50/30 transition-colors">
                    <td className="p-5">{order.id}</td>
                    <td className="p-5">{order.patient}</td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px]">{order.testName}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          order.status.includes('خارجي') ? 'bg-amber-500' : 'bg-blue-500'
                        }`}></span>
                        <span className="text-[11px]">{order.status}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      {order.status.includes('خارجي') ? (
                        <button className="flex items-center gap-1 text-amber-600 hover:underline">
                          <ExternalLink className="w-4 h-4" /> تحويل لمختبر خارجي
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 text-violet-600 hover:underline">
                          <UploadCloud className="w-4 h-4" /> رفع النتيجة
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* مخزون الأدوية (الجرعات) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white">
            <h3 className="font-black text-[#25527E] mb-6 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-emerald-500" />
              مخزن الأدوية والجرعات
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex justify-between items-start mb-2">
                   <h4 className="font-black text-xs text-[#25527E]">جرعات الكيماوي (A)</h4>
                   <span className="text-[10px] font-black text-emerald-600">متوفر: 15 وحدة</span>
                </div>
                <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[70%]"></div>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex justify-between items-start mb-2">
                   <h4 className="font-black text-xs text-[#25527E]">جرعات النوع (C)</h4>
                   <span className="text-[10px] font-black text-red-600">مخزون منخفض: 2</span>
                </div>
                <div className="w-full bg-red-200 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-red-500 h-full w-[15%] animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 text-gray-400 rounded-xl text-[10px] font-black hover:border-violet-300 hover:text-violet-500 transition-all">
               + إضافة شحنة أدوية جديدة
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}