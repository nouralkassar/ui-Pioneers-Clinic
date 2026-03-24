import { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  TrendingUp, 
  FileText, 
  Calendar,
  Bell,
  Clock,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  pendingDoctorAccounts,
  staffMembers,
  globalAnalytics,
  appointmentsData,
  DoctorAccount,
} from '../data/pioneersData';

export function SuperDoctorDashboard() {
  const [selectedTab, setSelectedTab] = useState<'approvals' | 'staff' | 'analytics' | 'patients'>('approvals');

  const todayAppointments = appointmentsData.filter(apt => apt.date === '2026-03-09');
  const weekAppointments = appointmentsData.length;

  const handleApproval = (doctorId: string, action: 'approve' | 'reject') => {
    console.log(`${action} doctor ${doctorId}`);
    // في التطبيق الحقيقي، سيتم هنا استدعاء API
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
            لوحة تحكم المشرف العام
          </h1>
          <p className="text-gray-600">نظام إدارة عيادة رواد الاستشارية</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          className="bg-white rounded-lg p-6 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">إجمالي المرضى</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                {globalAnalytics.totalPatients}
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--color-success)' }}>
                +12 هذا الشهر
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#E3F2FD' }}
            >
              <Users className="w-6 h-6" style={{ color: 'var(--color-primary-blue)' }} />
            </div>
          </div>
        </div>

        <div 
          className="bg-white rounded-lg p-6 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">العلاجات النشطة</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                {globalAnalytics.activeTreatments}
              </p>
              <p className="text-sm text-gray-600 mt-2">حالياً قيد المتابعة</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#E8F5E9' }}
            >
              <Activity className="w-6 h-6" style={{ color: 'var(--color-success)' }} />
            </div>
          </div>
        </div>

        <div 
          className="bg-white rounded-lg p-6 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">الطلبات المعلقة</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                {globalAnalytics.pendingApprovals}
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--color-warning)' }}>
                بانتظار الموافقة
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FFF3E0' }}
            >
              <UserCheck className="w-6 h-6" style={{ color: 'var(--color-warning)' }} />
            </div>
          </div>
        </div>

        <div 
          className="bg-white rounded-lg p-6 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">رضا المرضى</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                {globalAnalytics.patientSatisfaction}/5
              </p>
              <p className="text-sm text-gray-600 mt-2">متوسط التقييمات</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#F3E5F5' }}
            >
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div 
            className="bg-white rounded-lg border border-gray-200"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <div className="border-b border-gray-200">
              <div className="flex gap-2 px-6">
                <button
                  onClick={() => setSelectedTab('approvals')}
                  className={`py-4 px-4 font-medium transition-colors border-b-2 ${
                    selectedTab === 'approvals'
                      ? 'border-current'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  style={selectedTab === 'approvals' ? { color: 'var(--color-primary-blue)' } : {}}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    الموافقات
                  </div>
                </button>
                <button
                  onClick={() => setSelectedTab('staff')}
                  className={`py-4 px-4 font-medium transition-colors border-b-2 ${
                    selectedTab === 'staff'
                      ? 'border-current'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  style={selectedTab === 'staff' ? { color: 'var(--color-primary-blue)' } : {}}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    طاقم العمل
                  </div>
                </button>
                <button
                  onClick={() => setSelectedTab('analytics')}
                  className={`py-4 px-4 font-medium transition-colors border-b-2 ${
                    selectedTab === 'analytics'
                      ? 'border-current'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  style={selectedTab === 'analytics' ? { color: 'var(--color-primary-blue)' } : {}}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    التحليلات
                  </div>
                </button>
                <button
                  onClick={() => setSelectedTab('patients')}
                  className={`py-4 px-4 font-medium transition-colors border-b-2 ${
                    selectedTab === 'patients'
                      ? 'border-current'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  style={selectedTab === 'patients' ? { color: 'var(--color-primary-blue)' } : {}}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    السجلات
                  </div>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Account Approvals Tab */}
              {selectedTab === 'approvals' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-deep-navy)' }}>
                    طلبات تفعيل حسابات الأطباء
                  </h2>
                  {pendingDoctorAccounts.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg" style={{ color: 'var(--color-deep-navy)' }}>
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          قيد المراجعة
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                          <p className="text-sm font-medium">{doctor.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">الهاتف</p>
                          <p className="text-sm font-medium">{doctor.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">تاريخ التسجيل</p>
                          <p className="text-sm font-medium">{doctor.registrationDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">المؤهلات</p>
                          <p className="text-sm font-medium">{doctor.credentials}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApproval(doctor.id, 'approve')}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                          style={{ 
                            backgroundColor: 'var(--color-success)',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          <CheckCircle className="w-4 h-4" />
                          قبول
                        </button>
                        <button
                          onClick={() => handleApproval(doctor.id, 'reject')}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                          style={{ 
                            backgroundColor: 'var(--color-error)',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          <XCircle className="w-4 h-4" />
                          رفض
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Staff Management Tab */}
              {selectedTab === 'staff' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-deep-navy)' }}>
                    إدارة طاقم العمل
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الاسم</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الدور</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">البريد</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الحالة</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffMembers.map((staff) => (
                          <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm font-medium">{staff.name}</td>
                            <td className="py-3 px-4 text-sm">{staff.role}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{staff.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                staff.status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {staff.status === 'active' ? 'نشط' : 'غير نشط'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button 
                                className="text-sm font-medium hover:underline"
                                style={{ color: 'var(--color-primary-blue)' }}
                              >
                                تعديل
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {selectedTab === 'analytics' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-deep-navy)' }}>
                    التحليلات العامة
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5" style={{ color: 'var(--color-success)' }} />
                        <p className="text-sm text-gray-600">الإيرادات الشهرية</p>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                        {globalAnalytics.monthlyRevenue.toLocaleString()} ريال
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
                        <p className="text-sm text-gray-600">متوسط وقت الانتظار</p>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                        {globalAnalytics.averageWaitTime}
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <p className="text-sm text-gray-600">استخدام الموظفين</p>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                        {globalAnalytics.staffUtilization}%
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5" style={{ color: 'var(--color-dark-blue)' }} />
                        <p className="text-sm text-gray-600">المواعيد المكتملة</p>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                        {globalAnalytics.completedAppointments}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Patient Records Tab */}
              {selectedTab === 'patients' && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600">سجلات المرضى متاحة من خلال واجهة الطبيب</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Calendar & Notifications */}
        <div className="space-y-6">
          {/* Today's Appointments */}
          <div 
            className="bg-white rounded-lg p-6 border border-gray-200"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                مواعيد اليوم
              </h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="border-r-4 pr-3" style={{ borderColor: 'var(--color-primary-blue)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {apt.time} - {apt.patientName}
                  </p>
                  <p className="text-xs text-gray-600">{apt.type}</p>
                  <p className="text-xs text-gray-500">الطبيب: {apt.doctorName}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Notifications */}
          <div 
            className="bg-white rounded-lg p-6 border border-gray-200"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                إشعارات النظام
              </h2>
              <AlertCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFF3E0' }}>
                <p className="text-sm font-medium text-gray-900">
                  {globalAnalytics.pendingApprovals} طلبات جديدة بحاجة للموافقة
                </p>
                <p className="text-xs text-gray-600 mt-1">منذ ساعة واحدة</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#E3F2FD' }}>
                <p className="text-sm font-medium text-gray-900">
                  تحديث النظام متاح
                </p>
                <p className="text-xs text-gray-600 mt-1">منذ 3 ساعات</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#E8F5E9' }}>
                <p className="text-sm font-medium text-gray-900">
                  تم إكمال النسخة الاحتياطية اليومية
                </p>
                <p className="text-xs text-gray-600 mt-1">منذ 5 ساعات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
