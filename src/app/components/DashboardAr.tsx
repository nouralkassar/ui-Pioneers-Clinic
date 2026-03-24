import { Users, Calendar, FlaskConical, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { mockPatients, mockAppointments } from '../data/mockDataAr';

export function DashboardAr() {
  const todayAppointments = mockAppointments.filter(apt => apt.date === '2026-03-07');
  const weeklyAppointments = mockAppointments.length;
  const newLabResults = 3;

  const recentActivity = [
    { patient: 'سارة أحمد محمد', action: 'إكمال جلسة علاج كيماوي', time: 'منذ ساعتين' },
    { patient: 'ليلى حسين', action: 'تحميل نتائج مختبر جديدة', time: 'منذ 3 ساعات' },
    { patient: 'محمد علي حسن', action: 'تأكيد موعد الغد', time: 'منذ 5 ساعات' },
    { patient: 'فاطمة عبدالله', action: 'تعديل الأدوية', time: 'منذ يوم واحد' },
  ];

  const notifications = [
    { type: 'urgent', message: 'ليلى حسين - نتائج مختبر حرجة تتطلب المراجعة', time: 'الآن' },
    { type: 'info', message: 'موعدان بانتظار التأكيد', time: 'منذ ساعة' },
    { type: 'info', message: 'التقرير الأسبوعي جاهز', time: 'منذ ساعتين' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-600">مرحباً بعودتك، د. أميرة</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">إجمالي المرضى</p>
              <p className="text-3xl font-bold text-gray-900">{mockPatients.length}</p>
              <p className="text-sm text-green-600 mt-2">الحالات النشطة</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">مواعيد اليوم</p>
              <p className="text-3xl font-bold text-gray-900">{todayAppointments.length}</p>
              <p className="text-sm text-blue-600 mt-2">2 مؤكدة</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">المواعيد الأسبوعية</p>
              <p className="text-3xl font-bold text-gray-900">{weeklyAppointments}</p>
              <p className="text-sm text-purple-600 mt-2">7 أيام القادمة</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">نتائج مختبر جديدة</p>
              <p className="text-3xl font-bold text-gray-900">{newLabResults}</p>
              <p className="text-sm text-orange-600 mt-2">بانتظار المراجعة</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">النشاط الأخير للمرضى</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.patient}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">الإشعارات</h2>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  notification.type === 'urgent'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/appointments"
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Calendar className="w-8 h-8 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">إضافة جلسة جديدة</p>
            <p className="text-sm text-gray-600 mt-1">جدولة علاج أو استشارة</p>
          </Link>
          
          <Link
            to="/patients"
            className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <Users className="w-8 h-8 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">عرض المرضى</p>
            <p className="text-sm text-gray-600 mt-1">إدارة سجلات المرضى</p>
          </Link>
          
          <Link
            to="/lab-results"
            className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <FlaskConical className="w-8 h-8 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">نتائج المختبر</p>
            <p className="text-sm text-gray-600 mt-1">مراجعة النتائج المعلقة</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
