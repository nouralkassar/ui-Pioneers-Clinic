import { useState } from 'react';
import { 
  Stethoscope, Users, CalendarCheck, TrendingUp, 
  MoreHorizontal, Star, Award, Filter,
  ChevronLeft, LayoutGrid, Search
} from 'lucide-react';
import { users } from '../data/medicalCenterData';

export function DoctorsManagement() {
  // تصفية الأطباء فقط من البيانات
  const doctorsList = users.filter(u => u.role === 'doctor');

  return (
    <div className="p-8 space-y-10 min-h-screen bg-white font-['Cairo'] text-right" dir="rtl">
      
      {/* 1. Header المضيء الموحد للنظام */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-l from-[#F0F7FF] to-[#E0E7FF] p-10 rounded-[3.5rem] shadow-sm border border-blue-50 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-[1.8rem] shadow-sm flex items-center justify-center text-[#25527E] border border-blue-100">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-[900] text-[#25527E] tracking-tight">إدارة الكادر الطبي والتقييم</h1>
            <p className="text-[#4A7299] text-sm font-bold mt-1 tracking-wide">مراقبة أداء الأطباء وتوزيع الحالات والمواعيد</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
           {/* إحصائية سريعة في الهيدر */}
           <div className="hidden md:flex items-center gap-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white">
              <Award className="w-5 h-5 text-amber-500" />
              <div className="leading-tight">
                 <p className="text-[10px] font-black text-gray-400 uppercase">أعلى تقييم اليوم</p>
                 <p className="text-sm font-[900] text-[#25527E]">د. أحمد محمد (4.9)</p>
              </div>
           </div>
        </div>
      </div>

      {/* 2. شريط الأدوات المصغر */}
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-[#25527E]" />
          <span className="font-black text-[#25527E] text-sm">قائمة الأطباء ({doctorsList.length})</span>
        </div>
        <div className="flex gap-2">
           <button className="p-2 text-gray-400 hover:text-[#25527E] transition-all"><Search className="w-5 h-5" /></button>
           <button className="p-2 text-gray-400 hover:text-[#25527E] transition-all"><Filter className="w-5 h-5" /></button>
        </div>
      </div>

      {/* 3. شبكة بطاقات الأطباء - تصميم زجاجي أنيق */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctorsList.map((doc) => (
          <div key={doc.id} className="group bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/[0.04] transition-all duration-500 relative overflow-hidden flex flex-col">
            
            {/* أيقونة خيارات سريعة */}
            <button className="absolute left-6 top-8 text-gray-300 hover:text-[#25527E] transition-all">
              <MoreHorizontal className="w-6 h-6" />
            </button>

            {/* معلومات الطبيب */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-br from-[#F8FAFF] to-[#E0EFFF] flex items-center justify-center text-[#25527E] text-2xl font-black border border-blue-50 group-hover:scale-105 transition-transform duration-500">
                  {doc.name[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" title="متصل الآن" />
              </div>
              <div>
                <h3 className="font-[900] text-[#25527E] text-xl mb-1.5">{doc.name}</h3>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black text-[#4A7299] bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-100/50">
                      {doc.specialty || 'استشاري عام'}
                   </span>
                </div>
              </div>
            </div>

            {/* إحصائيات الأداء - بطاقات مدمجة */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-[#F8FAFF] rounded-2xl border border-blue-50/50 transition-colors group-hover:bg-white group-hover:border-blue-100">
                <div className="flex items-center gap-2 text-[#4A7299] mb-2 opacity-70">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">المرضى</span>
                </div>
                <p className="text-2xl font-[900] text-[#25527E]">24</p>
              </div>
              <div className="p-4 bg-[#F8FAFF] rounded-2xl border border-blue-50/50 transition-colors group-hover:bg-white group-hover:border-blue-100">
                <div className="flex items-center gap-2 text-[#4A7299] mb-2 opacity-70">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">الجلسات</span>
                </div>
                <p className="text-2xl font-[900] text-[#25527E]">142</p>
              </div>
            </div>

            {/* تقييم الأداء مع شريط التقدم */}
            <div className="space-y-4 pt-6 border-t border-gray-50 mt-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                   <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                   <span className="text-sm font-[900] text-[#25527E]">4.9</span>
                   <span className="text-[10px] font-black text-gray-400 mr-1">(120 تقييم)</span>
                </div>
                <div className="flex items-center gap-1 text-green-500 font-black text-[10px]">
                   <TrendingUp className="w-3 h-3" />
                   +12% هذا الشهر
                </div>
              </div>
              
              <div className="relative w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                <div 
                  className="absolute top-0 right-0 h-full bg-[#25527E] rounded-full transition-all duration-1000 group-hover:bg-blue-500" 
                  style={{ width: '90%' }} 
                />
              </div>
            </div>

            {/* زر التفاصيل */}
            <button className="w-full mt-8 py-4 bg-white border border-gray-100 text-[#25527E] rounded-[1.4rem] font-black text-xs hover:bg-[#25527E] hover:text-white hover:border-[#25527E] transition-all shadow-sm flex items-center justify-center gap-2 group/btn">
              تحليل الأداء المفصل
              <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}