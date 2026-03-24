import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  User, 
  Search,
  Filter,
  CheckCircle2,
  MoreVertical,
  Activity
} from 'lucide-react';

export function DoctorSchedule() {
  const [selectedDoctor, setSelectedDoctor] = useState('د. أحمد سليمان');
  
  const doctors = [
    { id: 1, name: 'د. أحمد سليمان', specialty: 'استشاري باطنة', color: 'bg-blue-600' },
    { id: 2, name: 'د. سارة المنصور', specialty: 'أخصائية أطفال', color: 'bg-emerald-600' },
    { id: 3, name: 'د. خالد العمري', specialty: 'جراحة عامة', color: 'bg-purple-600' },
  ];

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00'];

  const appointments = [
    { id: 1, patient: 'فهد العتيبي', time: '08:30', duration: '45 min', type: 'كشف جديد', status: 'confirmed' },
    { id: 2, patient: 'ريم الشمري', time: '10:00', duration: '30 min', type: 'مراجعة', status: 'in-progress' },
    { id: 3, patient: 'ياسر القحطاني', time: '11:15', duration: '60 min', type: 'استشارة', status: 'pending' },
  ];

  return (
    <div className="p-10  min-h-screen text-right font-sans" dir="rtl">
      
      {/* Top Navigation & Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-[900] text-slate-900 tracking-tight flex items-center gap-3">
            جدول المواعيد اليومي
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">9 مارس، 2026</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1">إدارة وتنظيم فترات الكشف للأطباء المتاحين.</p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
           <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
           <div className="flex items-center gap-2 px-4 border-x border-slate-100">
              <CalendarIcon className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-black text-slate-700">اليوم</span>
           </div>
           <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        
        {/* Left Sidebar: Doctors List */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">الأطباء المناوبون</h3>
            <div className="space-y-3">
              {doctors.map((doc) => (
                <button 
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.name)}
                  className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${selectedDoctor === doc.name ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-slate-50 text-slate-600 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-inner ${selectedDoctor === doc.name ? 'bg-white/20' : doc.color}`}>
                    {doc.name[2]}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">{doc.name}</p>
                    <p className={`text-[10px] font-bold ${selectedDoctor === doc.name ? 'text-slate-400' : 'text-slate-400'}`}>{doc.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
            <Plus className="w-5 h-5" /> إضافة موعد يدوي
          </button>
        </div>

        {/* Main Schedule: Timeline Grid */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
          
          {/* Timeline Header */}
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
               <h2 className="font-black text-slate-800 text-lg">مواعيد {selectedDoctor}</h2>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white rounded-xl text-slate-400 transition-all shadow-sm border border-transparent hover:border-slate-100"><Search className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-white rounded-xl text-slate-400 transition-all shadow-sm border border-transparent hover:border-slate-100"><Filter className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Schedule Body */}
          <div className="relative p-8 h-[600px] overflow-y-auto custom-scrollbar">
            
            {/* Time Indicators (Background Lines) */}
            <div className="absolute inset-0 p-8 pt-10">
              {hours.map((hour) => (
                <div key={hour} className="h-20 border-t border-slate-100 flex items-start pt-2">
                  <span className="text-[10px] font-black text-slate-300 w-12">{hour}</span>
                </div>
              ))}
            </div>

            {/* Current Time Indicator Line */}
            <div className="absolute left-0 right-0 border-t-2 border-red-400 z-10 flex items-center gap-2" style={{ top: '240px' }}>
               <span className="bg-red-400 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full mr-8">الآن</span>
            </div>

            {/* Appointment Cards (Absolute Positioned) */}
            <div className="relative mr-16">
               {/* Example Card 1 */}
               <div className="absolute top-[40px] w-full bg-blue-50/80 border-r-4 border-blue-500 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-blue-900 text-sm">فهد العتيبي</h4>
                        <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md uppercase">كشف جديد</span>
                      </div>
                      <p className="text-[10px] font-bold text-blue-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 08:30 - 09:15 (45 دقيقة)
                      </p>
                    </div>
                    <MoreVertical className="w-4 h-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
               </div>

               {/* Example Card 2 (In Progress) */}
               <div className="absolute top-[160px] w-full bg-emerald-50 border-r-4 border-emerald-500 p-4 rounded-2xl shadow-lg shadow-emerald-100/20 border border-emerald-100 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-emerald-900 text-sm">ريم الشمري</h4>
                        <span className="flex items-center gap-1 text-[9px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-md animate-pulse">
                           <Activity className="w-2.5 h-2.5" /> حالياً بالداخل
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 10:00 - 10:30 (مراجعة)
                      </p>
                    </div>
                  </div>
               </div>

               {/* Example Card 3 (Pending) */}
               <div className="absolute top-[280px] w-full bg-slate-50 border-r-4 border-slate-300 p-4 rounded-2xl opacity-60 hover:opacity-100 transition-all border border-slate-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-slate-700 text-sm">ياسر القحطاني</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 11:15 - 12:15 (استشارة)
                      </p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}