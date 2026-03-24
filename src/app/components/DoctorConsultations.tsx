import { useState, useMemo, ChangeEvent, FormEvent } from 'react';
import { 
  MessageSquare, Search, CheckCircle2, 
  Clock, Send, MailOpen, Mail, Calendar, MoreVertical, AlertCircle
} from 'lucide-react';

// بيانات تجريبية (لإظهار جمالية الواجهة)
const mockConsultations = [
  {
    id: "CON-9821",
    patientName: "أحمد محمد العتيبي",
    doctorId: "D1", // افترضنا أن هذا ID الطبيب الحالي
    message: "دكتور، أشعر بوخز خفيف في منطقة الصدر جهة اليسار عند التنفس بعمق، هل هذا مرتبط بالجرعة الأخيرة؟",
    date: "اليوم، 10:30 ص",
    status: "جديد",
    reply: null
  },
  {
    id: "CON-7742",
    patientName: "سارة عبد الرحمن",
    doctorId: "D1",
    message: "هل يمكنني تناول المسكنات العادية مع الدواء الذي وصفته لي في الزيارة السابقة؟ أشعر بصداع مستمر منذ يومين.",
    date: "اليوم، 09:15 ص",
    status: "جديد",
    reply: null
  },
  {
    id: "CON-3321",
    patientName: "محمود ياسين",
    doctorId: "D1",
    message: "الحمد لله دكتور، أشعر بتحسن كبير بعد الالتزام بالبروتوكول الجديد. متى موعد الفحص القادم؟",
    date: "أمس، 08:45 م",
    status: "تم الرد",
    reply: "ممتاز جداً يا محمود، استمر على نفس الجدول. موعدنا القادم يوم الثلاثاء لإجراء التحاليل الدورية."
  },
  {
    id: "CON-1109",
    patientName: "ليلى خالد",
    doctorId: "D1",
    message: "ظهرت بعض البقع الحمراء على الجلد بعد تناول الجرعة الثالثة، هل أوقف الدواء فوراً أم أنتظر؟",
    date: "أمس، 04:20 م",
    status: "جديد",
    reply: null
  },
  {
    id: "CON-5560",
    patientName: "عبد الله الشمري",
    doctorId: "D1",
    message: "أريد التأكد من مواعيد عمل المختبر الخارجي الذي تم تحويلي إليه، هل يعملون يوم السبت؟",
    date: "15 مارس 2026",
    status: "تم الرد",
    reply: "نعم يا عبد الله، المختبر يعمل من السبت إلى الخميس من الساعة 8 صباحاً وحتى 4 عصراً."
  },
  {
    id: "CON-2290",
    patientName: "فاطمة الزهراء",
    doctorId: "D1",
    message: "دكتور، طفلي يرفض تناول الدواء السائل بسبب الطعم، هل يوجد بديل على شكل أقراص أو كبسولات صغيرة؟",
    date: "14 مارس 2026",
    status: "جديد",
    reply: null
  }
];

export function DoctorConsultations() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(mockConsultations[0].id); // اختيار أول مريض تلقائياً
  const [replyText, setReplyText] = useState<string>('');

  // الفلترة بناءً على البحث
  const filteredConsultations = useMemo(() => {
    return mockConsultations.filter(con => 
      con.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedConsultation = useMemo(() => {
    return filteredConsultations.find(c => c.id === selectedId) || null;
  }, [selectedId, filteredConsultations]);

  const handleSendReply = (e: FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConsultation) return;
    alert(`تم إرسال الرد إلى المريض: ${selectedConsultation.patientName}`);
    setReplyText('');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 font-['Cairo'] text-right  min-h-screen" dir="rtl">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-blue-50">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black text-[#25527E]">مركز الاستشارات</h1>
          </div>
          <p className="text-gray-400 font-bold text-xs mt-2 mr-1">لديك {mockConsultations.filter(c => c.status === 'جديد').length} استشارات جديدة تتطلب رداً</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن مريض..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-200 focus:bg-white outline-none font-bold text-sm transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-280px)]">
        
        {/* القائمة الجانبية (قائمة المرضى) */}
        <div className="lg:col-span-4 space-y-3 overflow-y-auto pr-1 pl-2 custom-scrollbar">
          {filteredConsultations.map((con) => (
            <div
              key={con.id}
              onClick={() => setSelectedId(con.id)}
              className={`group p-4 rounded-[1.8rem] border-2 transition-all cursor-pointer relative ${
                selectedId === con.id 
                ? 'bg-[#25527E] border-[#25527E] shadow-xl translate-x-1' 
                : 'bg-white border-white hover:border-blue-100 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${
                      selectedId === con.id ? 'bg-white/20 text-white scale-110' : 'bg-blue-50 text-[#25527E]'
                    }`}>
                      {con.patientName?.[0]}
                    </div>
                    <div>
                      <h3 className={`font-black text-sm ${selectedId === con.id ? 'text-white' : 'text-[#25527E]'}`}>
                        {con.patientName}
                      </h3>
                      <p className={`text-[10px] mt-0.5 ${selectedId === con.id ? 'text-white/60' : 'text-gray-400'}`}>
                        {con.date}
                      </p>
                    </div>
                 </div>
                 {con.status === 'جديد' && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className={`text-[9px] font-black ${selectedId === con.id ? 'text-white' : 'text-red-500'}`}>جديد</span>
                    </div>
                 )}
              </div>
            </div>
          ))}
        </div>

        {/* منطقة الدردشة الرئيسية */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          {selectedConsultation ? (
            <>
              {/* ترويسة الدردشة */}
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#25527E] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-900/10">
                    {selectedConsultation.patientName?.[0]}
                  </div>
                  <div>
                    <h2 className="font-black text-[#25527E] text-lg">{selectedConsultation.patientName}</h2>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mt-1">
                      <span className="bg-white border border-gray-200 px-2 py-0.5 rounded-md flex items-center gap-1 uppercase">
                         <Calendar className="w-3 h-3 text-blue-500" /> {selectedConsultation.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>

              {/* منطقة الرسائل */}
              <div className="p-8 flex-1 overflow-y-auto space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                {/* رسالة المريض */}
                <div className="flex flex-col items-start space-y-2">
                   <div className="bg-white border-2 border-blue-50 text-[#25527E] p-6 rounded-[2rem] rounded-tr-none max-w-[85%] shadow-sm relative">
                      <p className="text-sm font-bold leading-relaxed">
                        {selectedConsultation.message}
                      </p>
                      <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[9px] px-3 py-1 rounded-full font-black">رسالة المريض</div>
                   </div>
                </div>

                {/* رد الطبيب (إن وجد) */}
                {selectedConsultation.reply && (
                   <div className="flex flex-col items-end space-y-2">
                      <div className="bg-[#25527E] text-white p-6 rounded-[2rem] rounded-tl-none max-w-[85%] shadow-lg shadow-blue-900/10 relative">
                        <p className="text-sm font-bold leading-relaxed">{selectedConsultation.reply}</p>
                        <div className="absolute -top-3 left-6 bg-emerald-500 text-white text-[9px] px-3 py-1 rounded-full font-black flex items-center gap-1">
                           تم الرد <CheckCircle2 className="w-3 h-3" />
                        </div>
                      </div>
                   </div>
                )}
              </div>

              {/* منطقة الكتابة */}
              <div className="p-6 bg-white border-t border-gray-100">
                <form onSubmit={handleSendReply} className="relative flex items-center gap-4">
                  <div className="relative flex-1 group">
                    <textarea 
                      rows={2}
                      value={replyText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReplyText(e.target.value)}
                      placeholder="اكتب ردك الطبي المفصل هنا..."
                      className="w-full rounded-[1.5rem] py-5 pr-6 pl-16 bg-gray-50 border-2 border-transparent focus:border-blue-100 focus:bg-white outline-none font-bold text-sm resize-none transition-all shadow-inner"
                    />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2">
                       <MessageSquare className="w-5 h-5 text-gray-200 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={!replyText.trim()}
                    className="p-5 bg-[#25527E] text-white rounded-[1.5rem] hover:bg-[#1A3A5A] hover:shadow-2xl transition-all disabled:opacity-20 disabled:grayscale shadow-lg shadow-blue-900/20 active:scale-95"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <MailOpen className="w-16 h-16 text-gray-200" />
              </div>
              <p className="font-black text-[#25527E]">اختر مريضاً لبدء المحادثة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}