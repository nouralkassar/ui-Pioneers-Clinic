import { Link } from 'react-router';
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { appointments, patients } from '../data/medicalCenterData';

export function SecretaryDashboard() {
  const pendingAppointments = appointments.filter(a => a.status === 'بحاجة موافقة');
  const todayAppointments = appointments.filter(a => a.date === '2026-03-09');
  const unpaidPatients = patients.filter(p => p.paymentStatus === 'غير مدفوع');
  const partiallyPaid = patients.filter(p => p.paymentStatus === 'مدفوع جزئياً');

  const stats = [
    {
      title: 'طلبات معلقة',
      value: pendingAppointments.length,
      detail: 'تحتاج معالجة فورية',
      icon: AlertCircle,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      link: '/appointment-requests',
    },
    {
      title: 'مواعيد اليوم',
      value: todayAppointments.length,
      detail: `${todayAppointments.filter(a => a.status === 'مؤكد').length} مؤكدة`,
      icon: Calendar,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      link: '/doctor-schedule',
    },
    {
      title: 'دفعات معلقة',
      value: partiallyPaid.length + unpaidPatients.length,
      detail: 'مراجعة السجل المالي',
      icon: CreditCard,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      link: '/payments',
    },
    {
      title: 'المرضى النشطون',
      value: patients.length,
      detail: 'إجمالي المسجلين',
      icon: Users,
      color: '#059669',
      bgColor: '#ECFDF5',
      link: '/patients',
    },
  ];

  return (
    <div className="p-8  min-h-screen space-y-8 text-right" dir="rtl">
      
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-[900] text-[#1E293B] tracking-tight">لوحة تحكم السكرتارية</h1>
          {/* <p className="text-slate-500 font-medium mt-1">مرحباً بك، إليك ملخص العمليات الإدارية اليوم.</p> */}
        </div>
        <div className="flex gap-3">
          <Link to="/patient-registration" className="px-5 py-2.5 bg-[#25527E] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#1a3a5a] transition-all flex items-center gap-2">
            <Users className="w-4 h-4" /> تسجيل مريض جديد
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-300"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-[900] text-[#1E293B]">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-slate-500">{stat.detail}</span>
                </div>
              </div>

              <div 
                className="absolute bottom-0 left-0 h-1.5 transition-all duration-500 group-hover:w-full w-0"
                style={{ backgroundColor: stat.color }}
              />
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pending Appointment Requests */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-[900] text-[#1E293B]">طلبات الحجز المعلقة</h2>
            </div>
            <Link to="/appointment-requests" className="text-xs font-black text-blue-600 hover:text-blue-800 transition-colors">عرض الكل</Link>
          </div>

          <div className="p-6">
            {pendingAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingAppointments.slice(0, 4).map((apt) => (
                  <div key={apt.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-black text-[#1E293B] group-hover:text-blue-700 transition-colors">{apt.patientName}</h3>
                        <p className="text-xs font-bold text-slate-500 mt-0.5">{apt.type}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-100 text-amber-700 uppercase">
                        {apt.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold mb-5">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {apt.date}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {apt.time}</div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-[#059669] text-white rounded-xl text-xs font-black hover:bg-[#047857] transition-colors shadow-sm shadow-emerald-200">تأكيد</button>
                      <button className="flex-1 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-black hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">إلغاء</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-12 text-slate-300">
                <CheckCircle className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-bold">لا توجد طلبات معلقة حالياً</p>
              </div>
            )}
          </div>
        </div>

        {/* Today's Schedule - Vertical List */}
        <div className="bg-[#25527E] rounded-[2rem] shadow-xl text-white overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" /> جدول اليوم
            </h2>
            <span className="text-[10px] font-black bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">9 مارس</span>
          </div>

          <div className="p-6 space-y-4 flex-1">
            {todayAppointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="relative pr-4 border-r-2 border-blue-500/30 hover:border-blue-400 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-black text-blue-400">{apt.time}</p>
                    <h4 className="text-sm font-bold mt-1">{apt.patientName}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">مع د. {apt.doctorName}</p>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>

          <Link to="/doctor-schedule" className="p-4 bg-white/5 text-center text-xs font-black hover:bg-white/10 transition-colors border-t border-white/10">
            فتح الجدول الكامل
          </Link>
        </div>
      </div>

      {/* Payment Tracking - Professional Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-[900] text-[#1E293B]">تحصيل المدفوعات</h2>
          </div>
        </div>
        
        <div className="overflow-x-auto p-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-50">
                <th className="py-4 px-6 text-right font-black uppercase text-[10px]">المريض</th>
                <th className="py-4 px-6 text-right font-black uppercase text-[10px]">الإجمالي</th>
                <th className="py-4 px-6 text-right font-black uppercase text-[10px]">المتبقي</th>
                <th className="py-4 px-6 text-right font-black uppercase text-[10px]">الحالة</th>
                <th className="py-4 px-6 text-center font-black uppercase text-[10px]">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[...unpaidPatients, ...partiallyPaid].slice(0, 5).map((patient) => {
                const remaining = (patient.totalAmount || 0) - (patient.paidAmount || 0);
                return (
                  <tr key={patient.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="py-4 px-6 font-black text-slate-700">{patient.name}</td>
                    <td className="py-4 px-6 font-bold text-slate-500">{patient.totalAmount?.toLocaleString()} ريال</td>
                    <td className="py-4 px-6">
                       <span className="text-red-600 font-black">{remaining.toLocaleString()} ريال</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-[900] ${
                        patient.paymentStatus === 'غير مدفوع' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {patient.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-black hover:bg-blue-600 hover:text-white transition-all">
                        تسجيل دفعة
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}