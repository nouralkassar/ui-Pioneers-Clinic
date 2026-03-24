import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, Eye } from 'lucide-react';
import { mockPatients, Patient } from '../data/mockDataAr';

export function PatientsPageAr() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'نشط':
        return 'bg-blue-100 text-blue-700';
      case 'تحت العلاج':
        return 'bg-green-100 text-green-700';
      case 'متابعة':
        return 'bg-yellow-100 text-yellow-700';
      case 'حرج':
        return 'bg-red-100 text-red-700';
      case 'متعافي':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المرضى</h1>
          <p className="text-gray-600">إدارة وعرض المرضى المعينين لك</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث بالاسم أو التشخيص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="نشط">نشط</option>
              <option value="تحت العلاج">تحت العلاج</option>
              <option value="متابعة">متابعة</option>
              <option value="حرج">حرج</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Patient Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {patient.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {patient.age} سنة • {patient.gender}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                {patient.status}
              </span>
            </div>

            {/* Patient Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium text-gray-700">التشخيص:</span>
                <span className="text-sm text-gray-600">{patient.diagnosis}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">فصيلة الدم:</span>
                <span className="text-sm text-gray-600">{patient.bloodType}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">آخر زيارة:</span>
                <span className="text-sm text-gray-600">{patient.lastVisit}</span>
              </div>
              {patient.nextAppointment && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">الموعد القادم:</span>
                  <span className="text-sm text-blue-600">{patient.nextAppointment}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <Link
              to={`/patients/${patient.id}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>عرض الملف الطبي</span>
            </Link>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPatients.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">لم يتم العثور على مرضى مطابقين لمعاييرك.</p>
        </div>
      )}
    </div>
  );
}
