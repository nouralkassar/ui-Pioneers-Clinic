import { useParams, Link } from 'react-router';
import { ArrowRight, Phone, Mail, Calendar, User, Droplet, Activity, FileText, Pill } from 'lucide-react';
import { patientsData, medicalRecords } from '../data/pioneersData';

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const patient = patientsData.find((p) => p.id === id);
  const record = patient ? medicalRecords[patient.id] : null;

  if (!patient) {
    return (
      <div className="p-6">
        <div 
          className="bg-white rounded-lg p-12 text-center"
          style={{ 
            boxShadow: 'var(--shadow-md)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <p className="text-gray-500">لم يتم العثور على المريض.</p>
          <Link 
            to="/my-patients" 
            className="inline-block mt-4 font-medium"
            style={{ color: 'var(--color-primary-blue)' }}
          >
            العودة إلى المرضى
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link
        to="/my-patients"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowRight className="w-5 h-5" />
        <span>العودة إلى المرضى</span>
      </Link>

      {/* Patient Profile Card */}
      <div 
        className="bg-white rounded-lg p-6"
        style={{ 
          boxShadow: 'var(--shadow-md)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Patient Avatar */}
          <div className="flex-shrink-0">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
            >
              <span className="text-white font-bold text-3xl">
                {patient.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          {/* Patient Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
                  {patient.name}
                </h1>
                <p className="text-gray-600">{patient.diagnosis}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                patient.status === 'تحت العلاج' ? 'bg-green-100 text-green-700' :
                patient.status === 'متابعة' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {patient.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">العمر / الجنس</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patient.age} سنة • {patient.gender}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">فصيلة الدم</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patient.bloodType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">تاريخ التسجيل</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patient.registrationDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">الهاتف</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patient.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">الطبيب المعالج</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patient.assignedDoctor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Record Details */}
      {record && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical History */}
          <div 
            className="bg-white rounded-lg p-6"
            style={{ 
              boxShadow: 'var(--shadow-md)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                التاريخ المرضي
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">الأمراض السابقة</p>
                <ul className="list-disc list-inside">
                  {record.historyOfDiseases.map((disease, index) => (
                    <li key={index} className="text-sm" style={{ color: 'var(--color-deep-navy)' }}>
                      {disease}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">الحساسية</p>
                <ul className="list-disc list-inside">
                  {record.allergies.map((allergy, index) => (
                    <li key={index} className="text-sm text-red-600">
                      {allergy}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Current Medications */}
          <div 
            className="bg-white rounded-lg p-6"
            style={{ 
              boxShadow: 'var(--shadow-md)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Pill className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                الأدوية الحالية
              </h2>
            </div>
            
            <div className="space-y-2">
              {record.currentMedications.length > 0 ? (
                record.currentMedications.map((med, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#E3F2FD', borderRadius: 'var(--radius-md)' }}
                  >
                    <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                      {med}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">لا توجد أدوية حالية</p>
              )}
            </div>
          </div>

          {/* Treatment Plan */}
          <div 
            className="lg:col-span-2 bg-white rounded-lg p-6"
            style={{ 
              boxShadow: 'var(--shadow-md)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                خطة العلاج
              </h2>
            </div>
            
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#F5F5F5', borderRadius: 'var(--radius-md)' }}
            >
              <p className="text-sm" style={{ color: 'var(--color-deep-navy)' }}>
                {record.treatmentPlan}
              </p>
            </div>

            {record.notes && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">ملاحظات الطبيب</p>
                <div 
                  className="p-4 rounded-lg border-r-4"
                  style={{ 
                    backgroundColor: '#FFF9C4',
                    borderColor: 'var(--color-warning)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <p className="text-sm" style={{ color: 'var(--color-deep-navy)' }}>
                    {record.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
