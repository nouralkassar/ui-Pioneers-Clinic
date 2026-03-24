import { useState } from 'react';
import { Link,useNavigate } from 'react-router';

import { 
  Search, Filter, Eye, Edit, Users, Activity, 
  Heart, Clock, FileText, ClipboardList
} from 'lucide-react';
import { patients, getCurrentUser, users, Patient } from '../data/medicalCenterData';

export function MyPatientsPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
const navigate = useNavigate(); // 2. تعريف التابع
  // 1. تصفية المرضى بناءً على الصلاحيات (المتطلب رقم 4)
  const myPatients = currentUser?.role === 'super-doctor' 
    ? patients 
    : patients.filter(p => p.assignedDoctorId === currentUser?.id);

  // 2. البحث والفلترة المتقدمة
  const filteredPatients = myPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || patient.assignedDoctorId === doctorFilter;
    
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  // 3. الإحصائيات العلوية
  const stats = [
    { label: 'إجمالي المرضى', value: myPatients.length, color: '#25527E', icon: Users },
    { label: 'تحت العلاج', value: myPatients.filter(p => p.status === 'تحت العلاج').length, color: '#059669', icon: Activity },
    { label: 'متابعة', value: myPatients.filter(p => p.status === 'متابعة').length, color: '#F59E0B', icon: Clock },
    { label: 'حالات نشطة', value: myPatients.filter(p => p.status === 'نشط').length, color: '#8B5CF6', icon: Heart },
  ];

  return (
    <div className="p-8 space-y-8  min-h-screen font-['Cairo'] text-right" dir="rtl">
      
      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all" style={{ backgroundColor: `${stat.color}10` }}>
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-[#25527E]">{stat.value}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: stat.color }} />
          </div>
        ))}
      </div>

      {/* منطقة البحث والفلترة */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="text"
              placeholder="ابحث باسم المريض أو التشخيص..."
              className="w-full pr-12 pl-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#25527E]/10 font-bold text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="pr-4 pl-10 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#25527E]/10 font-bold text-sm appearance-none outline-none"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">جميع الحالات</option>
            <option value="نشط">نشط</option>
            <option value="تحت العلاج">تحت العلاج</option>
            <option value="متابعة">متابعة</option>
            <option value="محول">محول</option>
          </select>

          {/* فلتر الأطباء يظهر للسوبر طبيب فقط */}
          {currentUser?.role === 'super-doctor' && (
            <select
              className="pr-4 pl-10 py-3 bg-[#F0F7FF] text-[#25527E] rounded-2xl border-none focus:ring-2 focus:ring-[#25527E]/10 font-black text-sm appearance-none outline-none"
              onChange={(e) => setDoctorFilter(e.target.value)}
            >
              <option value="all">كل أطباء المركز</option>
              {users.filter(u => u.role === 'doctor').map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-xs font-black text-[#25527E]">المريض</th>
                <th className="px-6 py-5 text-xs font-black text-[#25527E]">التشخيص</th>
                <th className="px-6 py-5 text-xs font-black text-[#25527E]">الطبيب</th>
                <th className="px-6 py-5 text-xs font-black text-[#25527E]">الحالة</th>
                <th className="px-6 py-5 text-xs font-black text-[#25527E] text-center">الإجراءات</th>
              </tr>
            </thead>
           <tbody className="divide-y divide-gray-50">
      {filteredPatients.map((patient: Patient) => (
        <tr 
          key={patient.id} 
          // 3. جعل الصف بالكامل قابلاً للنقر
          onClick={() => navigate(`/patients/${patient.id}`)} 
          className="hover:bg-blue-50/50 transition-all group cursor-pointer active:scale-[0.99] transform"
        >
          {/* محتوى الخلية الأولى: المريض */}
          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#25527E] to-[#4A7299] text-white flex items-center justify-center font-black text-xs shadow-md">
                {patient.name[0]}
              </div>
              <div>
                <p className="font-black text-[#25527E] text-sm group-hover:underline transition-all">
                  {patient.name}
                </p>
                <p className="text-[10px] text-gray-400 font-bold">ملف رقم: {patient.id.slice(0,8)}</p>
              </div>
            </div>
          </td>

          {/* الخلية الثانية: التشخيص */}
          <td className="px-6 py-5 font-bold text-xs text-gray-500">
            {patient.diagnosis}
          </td>

          {/* الخلية الثالثة: الطبيب */}
          <td className="px-6 py-5">
            <span className="text-[10px] font-black text-[#4A7299] bg-[#F0F7FF] px-3 py-1 rounded-lg border border-blue-100">
              {patient.assignedDoctorName}
            </span>
          </td>

          {/* الخلية الرابعة: الحالة */}
          <td className="px-6 py-5">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
              patient.status === 'تحت العلاج' ? 'bg-green-50 text-green-600' : 
              patient.status === 'نشط' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
            }`}>
              {patient.status}
            </span>
          </td>

          {/* الخلية الخامسة: الإجراءات */}
          <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}> 
            {/* ملاحظة: stopPropagation تمنع تفعيل ضغطة الصف عند الضغط على الأزرار الداخلية فقط */}
            <div className="flex items-center justify-center gap-2">
              <button className="p-2 bg-gray-50 text-[#25527E] rounded-xl hover:bg-[#25527E] hover:text-white transition-all">
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}