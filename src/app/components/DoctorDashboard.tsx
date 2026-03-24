import { Link } from 'react-router';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Bell,
  Clock,
  Activity,
  FileText,ArrowUpRight,ArrowDownRight
} from 'lucide-react';
import { patients, appointments, consultations, getCurrentUser } from '../data/medicalCenterData';

export function DoctorDashboard() {
  const currentUser = getCurrentUser();
  
  // Filter data for current doctor
  const myPatients = patients.filter(p => p.assignedDoctorId === currentUser?.id);
  const myAppointments = appointments.filter(a => a.doctorId === currentUser?.id);
  const todayAppointments = myAppointments.filter(a => a.date === '2026-03-09');
  const myConsultations = consultations.filter(c => c.doctorId === currentUser?.id);
  const newConsultations = myConsultations.filter(c => c.status === 'جديد');

  const stats = [
    {
      title: 'إجمالي المرضى',
      value: myPatients.length,
      change: '+3 هذا الشهر',
      icon: Users,
      color: '#2F6FA3',
      bgColor: '#E8F4F8',
      link:'/my-patients',
      isPositive:true
    },
    {
      title: 'مواعيد اليوم',
      value: todayAppointments.length,
      change: 'من أصل ' + myAppointments.length,
      icon: Calendar,
      color: '#059669',
      bgColor: '#D1FAE5',
            isPositive:true,
            link:'/'

    },
    {
      title: 'استشارات جديدة',
      value: newConsultations.length,
      change: 'تحتاج رد',
      icon: MessageSquare,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
            isPositive:true,
            link:'/'

    },
    {
      title: 'مرضى تحت العلاج',
      value: myPatients.filter(p => p.status === 'تحت العلاج').length,
      change: 'نشط حالياً',
      icon: Activity,
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
            isPositive:true,
                        link:'/'


    },
  ];

  const recentPatients = myPatients.slice(0, 5);
  const upcomingAppointments = todayAppointments.slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      
      {/* Stats Grid */}
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
    {/* Today's Appointments */}
<div
  className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200"
  style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}
>
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      {/* الحل للخطأ الأول: استخدام Calendar بدلاً من CalendarIcon */}
      <Calendar className="w-5 h-5" style={{ color: 'var(--color-medical-blue)' }} />
      <h2 className="text-lg font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
        مواعيد اليوم
      </h2>
    </div>
    <Link
      to="/appointments"
      className="text-sm font-medium"
      style={{ color: 'var(--color-medical-blue)' }}
    >
      عرض الكل
    </Link>
  </div>

  <div className="space-y-3">
    {appointments && appointments.length > 0 ? (
      appointments.slice(0, 3).map((apt) => (
        <div
          key={apt.id}
          className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div
            className="w-16 h-16 rounded-lg flex flex-col items-center justify-center"
            style={{ backgroundColor: '#E8F4F8' }}
          >
            <Clock className="w-5 h-5 mb-1" style={{ color: 'var(--color-medical-blue)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--color-medical-blue)' }}>
              {apt.time}
            </span>
          </div>
          <div className="flex-1 text-right">
            <h3 className="font-semibold text-sm" style={{ color: 'var(--color-dark-navy)' }}>
              {apt.patientName}
            </h3>
            <p className="text-xs text-gray-600">{apt.type}</p>
          </div>
          
          {/* الحل للخطأ الثاني: استخدام القيم الصحيحة الموجودة في الـ Types لديك */}
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-medium ${
              apt.status === 'مكتمل'
                ? 'bg-green-100 text-green-700'
                : apt.status === 'قيد الانتظار' || apt.status === 'بحاجة موافقة'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {apt.status}
          </span>
        </div>
      ))
    ) : (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">لا توجد مواعيد اليوم</p>
      </div>
    )}
  </div>
</div>

        {/* Notifications & Alerts */}
        <div
          className="bg-white rounded-lg p-6 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" style={{ color: 'var(--color-medical-blue)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
              التنبيهات
            </h2>
          </div>

          <div className="space-y-3">
            <div
              className="p-3 rounded-lg border-r-4"
              style={{
                backgroundColor: '#FEF3C7',
                borderColor: 'var(--color-warning)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p className="text-sm font-medium text-gray-900 mb-1">تحذير سمية</p>
              <p className="text-xs text-gray-600">المريض عمر الزهراني - ارتفاع إنزيمات الكبد</p>
            </div>

            <div
              className="p-3 rounded-lg border-r-4"
              style={{
                backgroundColor: '#DBEAFE',
                borderColor: 'var(--color-medical-blue)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p className="text-sm font-medium text-gray-900 mb-1">استشارة جديدة</p>
              <p className="text-xs text-gray-600">استفسار من المريض ليلى حسن</p>
            </div>

            <div
              className="p-3 rounded-lg border-r-4"
              style={{
                backgroundColor: '#FEE2E2',
                borderColor: 'var(--color-error)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p className="text-sm font-medium text-gray-900 mb-1">نتائج حرجة</p>
              <p className="text-xs text-gray-600">تحليل دم المريض فهد المطيري</p>
            </div>
          </div>

          <Link
            to="/alerts"
            className="block text-center mt-4 text-sm font-medium"
            style={{ color: 'var(--color-medical-blue)' }}
          >
            عرض جميع التنبيهات
          </Link>
        </div>
      </div>

      {/* Recent Patients */}
      <div
        className="bg-white rounded-lg p-6 border border-gray-200"
        style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" style={{ color: 'var(--color-medical-blue)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-dark-navy)' }}>
              المرضى المسجلون حديثاً
            </h2>
          </div>
          <Link
            to="/my-patients"
            className="text-sm font-medium"
            style={{ color: 'var(--color-medical-blue)' }}
          >
            عرض الكل
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الاسم</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">العمر</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التشخيص</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الحالة</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link
                      to={`/patients/${patient.id}`}
                      className="text-sm font-medium hover:underline"
                      style={{ color: 'var(--color-medical-blue)' }}
                    >
                      {patient.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{patient.age} سنة</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{patient.diagnosis}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'تحت العلاج'
                          ? 'bg-green-100 text-green-700'
                          : patient.status === 'متابعة'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{patient.registrationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
    </div>
  );
}
