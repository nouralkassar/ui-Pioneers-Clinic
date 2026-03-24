import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope,
  MoreHorizontal,
  FileText,
  AlertCircle
} from 'lucide-react';
import { appointments } from '../data/medicalCenterData';

export function AppointmentRequests() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="p-10  min-h-screen text-right font-sans" dir="rtl">
      
      {/* Header - Minimalist */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">الطلبات الواردة</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-slate-500 font-semibold text-sm">يوجد حالياً {appointments.length} طلبات نشطة</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="ابحث عن مريض..."
              className="w-80 pr-12 pl-4 py-3 bg-white border-none rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Tabs */}
        <div className="flex gap-8 border-b border-slate-200 mb-8 px-2">
          {['pending', 'confirmed', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-black transition-all relative ${
                activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'pending' ? 'طلبات جديدة' : tab === 'confirmed' ? 'تمت الموافقة' : 'الملغاة'}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full shadow-[0_-4px_10px_rgba(37,99,235,0.4)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {appointments.slice(0, 5).map((apt, index) => (
            <div 
              key={apt.id} 
              className="group bg-white rounded-3xl border border-transparent hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500 flex items-center p-2 pr-6"
            >
              {/* Vertical Priority Indicator */}
              <div className={`w-1.5 h-12 rounded-full ${index === 0 ? 'bg-red-500' : 'bg-blue-200'}`}></div>

              {/* Patient Info Section */}
              <div className="flex-1 grid grid-cols-12 items-center gap-6 mr-6">
                
                {/* Name & Avatar */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
                    {apt.patientName[0]}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-black text-slate-800">{apt.patientName}</h3>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                      <FileText className="w-3 h-3" /> رقم الملف: {1000 + index}
                    </p>
                  </div>
                </div>

                {/* Medical Details */}
                <div className="col-span-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold text-slate-700">{apt.type}</span>
                  </div>
                  <span className="text-[11px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">مع د. {apt.doctorName}</span>
                </div>

                {/* Date & Time */}
                <div className="col-span-3 flex items-center gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" /> {apt.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mt-1">
                      <Clock className="w-4 h-4" /> {apt.time}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="col-span-2">
                  <div className="flex flex-col items-center">
                    {index === 0 ? (
                      <span className="flex items-center gap-1 text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                        <AlertCircle className="w-3 h-3" /> حالة طارئة
                      </span>
                    ) : (
                      <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                        طلب روتيني
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Minimalist Action Buttons */}
              <div className="flex items-center gap-2 p-2">
                <button className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm">
                  <Check className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm">
                  <X className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-200 hover:text-slate-600 transition-all duration-300">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-slate-500 font-black text-xs hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                تحميل المزيد من الطلبات
            </button>
        </div>
      </div>

    </div>
  );
}