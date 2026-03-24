import { useState } from 'react';
import { Link } from 'react-router';
import {
  Users,
  FileText,
  Calculator,
  TrendingUp,
  Eye,
  AlertTriangle,
  Activity,
  Pill,
  Syringe,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  patientsData,
  chemoProtocols,
  medicalRecords,
  toxicityData,
  ChemoProtocol,
} from '../data/pioneersData';

export function DoctorInterface() {
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [selectedProtocol, setSelectedProtocol] = useState<ChemoProtocol | null>(null);
  const [bsa, setBsa] = useState('1.8'); // Body Surface Area
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');

  // حساب مساحة سطح الجسم (BSA) باستخدام معادلة Mosteller
  const calculateBSA = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w && h) {
      const calculatedBSA = Math.sqrt((w * h) / 3600);
      setBsa(calculatedBSA.toFixed(2));
    }
  };

  const patientRecord = medicalRecords[selectedPatient.id];
  const patientToxicity = toxicityData[selectedPatient.id] || [];

  // إيجاد البروتوكولات المناسبة للتشخيص
  const relevantProtocols = chemoProtocols.filter(protocol => 
    selectedPatient.diagnosis.includes(protocol.indication.split(' ')[1]) ||
    protocol.indication.includes(selectedPatient.diagnosis.split(' ')[1])
  );

  const getToxicityColor = (level: string) => {
    switch (level) {
      case 'عالي':
        return 'bg-red-100 text-red-700';
      case 'متوسط':
        return 'bg-yellow-100 text-yellow-700';
      case 'منخفض':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-deep-navy)' }}>
          واجهة الطبيب - إدارة المرضى
        </h1>
        <p className="text-gray-600">إدارة شاملة لسجلات المرضى والبروتوكولات العلاجية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div 
          className="bg-white rounded-lg border border-gray-200 p-6"
          style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
              قائمة المرضى
            </h2>
          </div>
          <div className="space-y-3">
            {patientsData.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-right p-3 rounded-lg border transition-all ${
                  selectedPatient.id === patient.id
                    ? 'border-current shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={selectedPatient.id === patient.id ? { 
                  borderColor: 'var(--color-primary-blue)',
                  backgroundColor: '#E3F2FD'
                } : {}}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary-blue)', color: 'white' }}
                  >
                    <span className="text-sm font-semibold">
                      {patient.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: 'var(--color-deep-navy)' }}>
                      {patient.name}
                    </p>
                    <p className="text-xs text-gray-600">{patient.age} سنة</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'تحت العلاج' ? 'bg-green-100 text-green-700' :
                    patient.status === 'متابعة' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {patient.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Medical Record (Sijil) */}
          <div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                  السجل الطبي - {selectedPatient.name}
                </h2>
              </div>
              <Link
                to={`/patients/${selectedPatient.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                style={{ backgroundColor: 'var(--color-primary-blue)' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-dark-blue)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-blue)'}
              >
                <Eye className="w-4 h-4" />
                عرض كامل
              </Link>
            </div>

            {patientRecord ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: 'var(--radius-md)' }}>
                  <p className="text-xs text-gray-600 mb-1">التشخيص</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patientRecord.diagnosis}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: 'var(--radius-md)' }}>
                  <p className="text-xs text-gray-600 mb-1">المرحلة</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patientRecord.stage}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: 'var(--radius-md)' }}>
                  <p className="text-xs text-gray-600 mb-1">الحساسية</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patientRecord.allergies.join(', ')}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: 'var(--radius-md)' }}>
                  <p className="text-xs text-gray-600 mb-1">فصيلة الدم</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {selectedPatient.bloodType}
                  </p>
                </div>
                <div className="md:col-span-2 p-3 bg-gray-50 rounded-lg" style={{ borderRadius: 'var(--radius-md)' }}>
                  <p className="text-xs text-gray-600 mb-1">خطة العلاج</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
                    {patientRecord.treatmentPlan}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">لا يوجد سجل طبي متاح</p>
            )}
          </div>

          {/* Smart Chemotherapy Protocol Cards */}
          <div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Syringe className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                بروتوكولات العلاج الكيماوي الذكية
              </h2>
            </div>

            {relevantProtocols.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relevantProtocols.map((protocol) => (
                  <button
                    key={protocol.id}
                    onClick={() => setSelectedProtocol(protocol)}
                    className={`text-right p-4 rounded-lg border transition-all ${
                      selectedProtocol?.id === protocol.id
                        ? 'border-current shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    style={selectedProtocol?.id === protocol.id ? { 
                      borderColor: 'var(--color-primary-blue)',
                      backgroundColor: '#E3F2FD'
                    } : {}}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                        {protocol.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getToxicityColor(protocol.toxicityLevel)}`}>
                        {protocol.toxicityLevel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{protocol.indication}</p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">الأدوية</p>
                        <p className="text-xs font-medium">{protocol.drugs.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">دورة العلاج</p>
                        <p className="text-xs font-medium">{protocol.cycle}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Pill className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600">لا توجد بروتوكولات متطابقة مع هذا التشخيص</p>
              </div>
            )}
          </div>

          {/* Dose Calculator Widget */}
          <div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                حاسبة الجرعات
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-deep-navy)' }}>
                  الوزن (كجم)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    borderRadius: 'var(--radius-md)',
                    '--tw-ring-color': 'var(--color-primary-blue)'
                  } as any}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-deep-navy)' }}>
                  الطول (سم)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    borderRadius: 'var(--radius-md)',
                    '--tw-ring-color': 'var(--color-primary-blue)'
                  } as any}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-deep-navy)' }}>
                  مساحة سطح الجسم (م²)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bsa}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <button
                    onClick={calculateBSA}
                    className="px-3 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ 
                      backgroundColor: 'var(--color-primary-blue)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    احسب
                  </button>
                </div>
              </div>
            </div>

            {selectedProtocol && (
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#E3F2FD', borderRadius: 'var(--radius-md)' }}
              >
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-deep-navy)' }}>
                  جرعات البروتوكول المحدد: {selectedProtocol.name}
                </p>
                <div className="space-y-2">
                  {selectedProtocol.drugs.map((drug, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{drug}</span>
                      <span className="text-sm font-medium">
                        {/* حساب تقريبي للجرعة */}
                        {(parseFloat(bsa) * (index === 0 ? 85 : index === 1 ? 400 : 200)).toFixed(1)} ملغ
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Toxicity Monitoring Graph */}
          {patientToxicity.length > 0 && (
            <div 
              className="bg-white rounded-lg border border-gray-200 p-6"
              style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-primary-blue)' }} />
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
                  مراقبة السمية
                </h2>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientToxicity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 5]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="nausea" 
                    name="الغثيان"
                    stroke="#2E7DBC" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fatigue" 
                    name="التعب"
                    stroke="#1A528E" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="neutropenia" 
                    name="نقص الكريات البيضاء"
                    stroke="#F59E0B" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="anemia" 
                    name="فقر الدم"
                    stroke="#EF4444" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 p-3 rounded-lg flex items-start gap-2" style={{ backgroundColor: '#FFF3E0' }}>
                <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-warning)' }} />
                <p className="text-sm text-gray-700">
                  القيم من 0-5 حيث 0 = لا توجد أعراض، 5 = أعراض شديدة جداً
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
