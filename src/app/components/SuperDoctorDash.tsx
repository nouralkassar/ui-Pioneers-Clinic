import { Link } from 'react-router';
import {
  Users,
  UserCheck,
  Activity,
  TrendingUp,
  Calendar,
  DollarSign,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import { systemStats, users, patients, appointments } from '../data/medicalCenterData';

export function SuperDoctorDash() {
  const pendingDoctors = users.filter(u => u.status === 'pending' && u.role === 'doctor');
  const activeDoctors = users.filter(u => u.status === 'active' && (u.role === 'doctor' || u.role === 'super-doctor'));
  const todayAppointments = appointments.filter(a => a.date === '2026-03-09');
  const stats = [
    {
      title: 'إجمالي المرضى',
      value: systemStats.totalPatients.toLocaleString(),
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      color: '#25527E',
      bgColor: '#F0F7FF',
      link: '/my-patients',
    },
    {
      title: 'الأطباء النشطون',
      value: systemStats.activeDoctors,
      change: '+3',
      isPositive: true,
      icon: Activity,
      color: '#059669',
      bgColor: '#ECFDF5',
      link: '/account-management',
    },
    {
      title: 'مواعيد اليوم',
      value: systemStats.todayAppointments,
      change: '-8.2%',
      isPositive: false,
      icon: Calendar,
      color: '#D97706',
      bgColor: '#FFFBEB',
      link: '/appointments',
    },
    {
      title: 'الإيرادات الشهرية',
      value: `$${(systemStats.monthlyRevenue).toLocaleString()}`,
      change: '+18.4%',
      isPositive: true,
      icon: DollarSign,
      color: '#7C3AED',
      bgColor: '#F5F3FF',
      link: '/financial-reports',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      {/* <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-dark-navy)' }}>
          لوحة تحكم المشرف العام
        </h1>
        <p className="text-gray-600">نظرة شاملة على النظام الطبي</p>
      </div> */}

    {/* Stats Grid - البطاقات الأنيقة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white rounded-[1.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                {/* Icon Container */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>

                {/* Percentage Change Badge */}
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black ${
                  stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-[900] text-[#25527E]">
                  {stat.value}
                </h3>
              </div>

              {/* Decorative line at the bottom */}
              <div 
                className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:w-full w-0"
                style={{ backgroundColor: stat.color }}
              />
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div
          className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" style={{ color: 'var(--color-medical-blue)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
                طلبات الموافقة المعلقة
              </h2>
            </div>
            <Link
              to="/doctor-management"
              className="text-sm font-medium"
              style={{ color: 'var(--color-medical-blue)' }}
            >
              عرض الكل
            </Link>
          </div>

          {pendingDoctors.length > 0 ? (
            <div className="space-y-3">
              {pendingDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-medical-blue)', color: 'white' }}
                  >
                    <span className="font-semibold">
                      {doctor.name.split(' ').slice(1, 2).map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500">{doctor.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: 'var(--color-success)' }}
                    >
                      قبول
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: 'var(--color-error)' }}
                    >
                      رفض
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <UserCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>لا توجد طلبات معلقة</p>
            </div>
          )}
        </div>

        {/* System Activity */}
        <div
          className="bg-white rounded-lg p-6 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" style={{ color: 'var(--color-medical-blue)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
              نشاط النظام
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E8F4F8' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium" style={{ color: 'var(--color-dark-navy)' }}>
                  جلسات علاجية
                </p>
                <span className="text-sm font-bold" style={{ color: 'var(--color-medical-blue)' }}>
                  {systemStats.completedSessions}
                </span>
              </div>
              <p className="text-xs text-gray-600">إجمالي الجلسات المكتملة</p>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium" style={{ color: 'var(--color-dark-navy)' }}>
                  معدل الحضور
                </p>
                <span className="text-sm font-bold" style={{ color: 'var(--color-success)' }}>
                  92%
                </span>
              </div>
              <p className="text-xs text-gray-600">التزام المرضى بالمواعيد</p>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium" style={{ color: 'var(--color-dark-navy)' }}>
                  متوسط الانتظار
                </p>
                <span className="text-sm font-bold" style={{ color: 'var(--color-warning)' }}>
                  15 دقيقة
                </span>
              </div>
              <p className="text-xs text-gray-600">وقت انتظار المرضى</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Performance */}
      <div
        className="bg-white rounded-lg p-6 border border-gray-200"
        style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-medical-blue)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
              أداء الأطباء
            </h2>
          </div>
          <Link
            to="/doctor-management"
            className="text-sm font-medium"
            style={{ color: 'var(--color-medical-blue)' }}
          >
            تقرير مفصل
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الطبيب</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التخصص</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المرضى</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الجلسات</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {activeDoctors.map((doctor) => {
                const doctorPatients = patients.filter(p => p.assignedDoctorId === doctor.id);
                const sessions = Math.floor(Math.random() * 100) + 50;
                
                return (
                  <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-dark-navy)' }}>
                      {doctor.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{doctor.specialty}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{doctorPatients.length}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{sessions}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        نشط
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          to="/account-management"
          className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:shadow-lg transition-shadow text-center"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          <UserCheck className="w-8 h-8" style={{ color: 'var(--color-medical-blue)' }} />
          <p className="font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
            إدارة الحسابات
          </p>
        </Link>

        <Link
          to="/system-monitoring"
          className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:shadow-lg transition-shadow text-center"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          <Activity className="w-8 h-8" style={{ color: 'var(--color-medical-blue)' }} />
          <p className="font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
            مراقبة النظام
          </p>
        </Link>

        <Link
          to="/case-management"
          className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:shadow-lg transition-shadow text-center"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          <FileText className="w-8 h-8" style={{ color: 'var(--color-medical-blue)' }} />
          <p className="font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
            إدارة الحالات
          </p>
        </Link>

        <Link
          to="/my-patients"
          className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:shadow-lg transition-shadow text-center"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          <Users className="w-8 h-8" style={{ color: 'var(--color-medical-blue)' }} />
          <p className="font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
            مرضائي
          </p>
        </Link>
      </div> */}
    </div>
  );
}
