import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Receipt
} from 'lucide-react';
import { patients } from '../data/medicalCenterData';

export function PaymentManagement() {
  const unpaidPatients = patients.filter(p => p.paymentStatus !== 'مدفوع بالكامل');

  return (
    <div className="p-10  min-h-screen text-right font-sans" dir="rtl">
      
      {/* Header & Financial Stats */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-[900] text-slate-900 tracking-tight">إدارة الشؤون المالية</h1>
            <p className="text-slate-500 font-bold mt-2 text-sm">تتبع المداخيل، الفواتير، وحالات التحصيل اليومية.</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
            <Plus className="w-5 h-5" /> إنشاء فاتورة جديدة
          </button>
        </div>

        {/* Mini Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">إجمالي المحصل (اليوم)</p>
                <h3 className="text-3xl font-[900] text-slate-900 mt-2">12,450 <span className="text-sm font-bold text-slate-400">ريال</span></h3>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <ArrowDownLeft className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-full -mr-10 -mb-10 group-hover:scale-110 transition-transform"></div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">المبالغ المعلقة</p>
                <h3 className="text-3xl font-[900] text-red-600 mt-2">4,820 <span className="text-sm font-bold text-slate-400">ريال</span></h3>
              </div>
              <div className="p-3 bg-red-50 rounded-2xl text-red-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-50/50 rounded-full -mr-10 -mb-10 group-hover:scale-110 transition-transform"></div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group border-b-4 border-b-blue-500">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">الفواتير النشطة</p>
                <h3 className="text-3xl font-[900] text-blue-900 mt-2">{unpaidPatients.length} <span className="text-sm font-bold text-slate-400">فاتورة</span></h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <Receipt className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="البحث برقم الفاتورة أو اسم المريض..."
              className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-50">
                <th className="py-5 px-8 text-right">المريض</th>
                <th className="py-5 px-6 text-right">رقم الفاتورة</th>
                <th className="py-5 px-6 text-right">المبلغ الكلي</th>
                <th className="py-5 px-6 text-right">المسدد</th>
                <th className="py-5 px-6 text-right">المتبقي</th>
                <th className="py-5 px-6 text-right">الحالة</th>
                <th className="py-5 px-8 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {unpaidPatients.map((patient, index) => {
                const remaining = (patient.totalAmount || 0) - (patient.paidAmount || 0);
                return (
                  <tr key={patient.id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                          {patient.name[0]}
                        </div>
                        <span className="font-black text-slate-800 text-sm">{patient.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xs font-bold text-slate-400">#INV-2026-{100 + index}</span>
                    </td>
                    <td className="py-5 px-6 font-bold text-slate-700 text-sm">{patient.totalAmount?.toLocaleString()} ريال</td>
                    <td className="py-5 px-6 font-bold text-emerald-600 text-sm">{patient.paidAmount?.toLocaleString()} ريال</td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className="font-black text-red-600 text-sm">{remaining.toLocaleString()} ريال</span>
                        {remaining > 500 && (
                          <span className="text-[9px] font-black text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-2.5 h-2.5" /> ديون مرتفعة
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center w-fit gap-1.5 ${
                        patient.paymentStatus === 'مدفوع جزئياً' 
                        ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                        : 'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${patient.paymentStatus === 'مدفوع جزئياً' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                        {patient.paymentStatus}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-center">
                      <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all shadow-sm flex items-center gap-2 mx-auto group-hover:scale-105">
                        <CreditCard className="w-3.5 h-3.5" /> تسجيل دفعة
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
          <p className="text-xs font-bold text-slate-400">عرض {unpaidPatients.length} من أصل 24 فاتورة معلقة</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-all">السابق</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-all">التالي</button>
          </div>
        </div>
      </div>

    </div>
  );
}