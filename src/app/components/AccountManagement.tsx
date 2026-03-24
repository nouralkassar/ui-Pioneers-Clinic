import { useState } from 'react';
import { 
  UserCheck, UserX, ShieldCheck, Mail, Search, 
  Filter, CheckCircle2, XCircle, Clock, MoreVertical,
  ShieldAlert, UserPlus, Users, BadgeCheck
} from 'lucide-react';
import { users } from '../data/medicalCenterData';

export function AccountManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesTab = 
      activeTab === 'all' ? true : 
      activeTab === 'pending' ? user.status === 'pending' : 
      user.status === 'active';
    
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return user.role !== 'super-doctor' && matchesTab && matchesSearch;
  });

  return (
    <div className="p-8 space-y-10 min-h-screen bg-white font-['Cairo'] text-right" dir="rtl">
      
      {/* 1. Header المضيء - نفس نمط صفحة الإشعارات الجديد */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-l from-[#F0F7FF] to-[#E0E7FF] p-10 rounded-[3.5rem] shadow-sm border border-blue-50 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-[1.8rem] shadow-sm flex items-center justify-center text-[#25527E] border border-blue-100">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-[900] text-[#25527E] tracking-tight">إدارة الكادر الطبي</h1>
            <p className="text-[#4A7299] text-sm font-bold mt-1 tracking-wide">التحكم في طلبات الانضمام وصلاحيات موظفي الرواد</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A7299] w-5 h-5 transition-colors group-focus-within:text-[#25527E]" />
            <input 
              type="text" 
              placeholder="ابحث بالاسم أو المسمى..." 
              className="pr-12 pl-4 py-3.5 rounded-2xl border-none bg-white/80 backdrop-blur-md shadow-sm focus:ring-2 focus:ring-[#25527E]/20 outline-none w-72 transition-all font-bold text-sm text-[#25527E]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[#25527E] text-white rounded-2xl font-black text-xs hover:bg-[#1a3a5a] transition-all shadow-lg shadow-blue-900/10 active:scale-95">
            <UserPlus className="w-4 h-4" /> إضافة موظف
          </button>
        </div>
      </div>

      {/* 2. نظام التبويبات (Tabs) - أبيض كريستالي */}
      <div className="flex gap-2 p-1.5 bg-gray-50 rounded-3xl w-fit border border-gray-100 shadow-sm">
        {[
          { id: 'all', label: 'كافة الموظفين', icon: Filter },
          { id: 'pending', label: 'طلبات معلقة', icon: Clock },
          { id: 'active', label: 'الحسابات النشطة', icon: BadgeCheck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-8 py-3 rounded-[1.4rem] font-black text-xs transition-all duration-300 ${
              activeTab === tab.id 
              ? 'bg-white text-[#25527E] shadow-sm border border-gray-100' 
              : 'text-gray-400 hover:text-[#25527E]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. شبكة الموظفين (Users Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="group bg-white rounded-[2.8rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/[0.03] transition-all duration-500 relative flex flex-col h-full">
              
              {/* ترويسة البطاقة */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFF] flex items-center justify-center text-[#25527E] border border-blue-50 group-hover:scale-110 transition-transform">
                    {/* صورة رمزية بسيطة أو أول حرف */}
                    <span className="text-xl font-black">{user.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-[900] text-[#25527E] text-lg leading-tight mb-1.5">{user.name}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A7299] bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-100/50">
                      {user.role === 'doctor' ? 'طبيب متخصص' : user.role === 'secretary' ? 'إداري' : user.role}
                    </span>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-[#25527E] p-2 hover:bg-gray-50 rounded-xl transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* معلومات التواصل */}
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center gap-3 text-xs font-[800] text-gray-500 bg-gray-50/50 p-3.5 rounded-2xl border border-gray-50/50">
                  <Mail className="w-4 h-4 text-[#4A7299]" />
                  <span className="truncate">{user.email}</span>
                </div>
                
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-black text-gray-400">حالة الحساب</span>
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${
                    user.status === 'active' 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-amber-50 text-amber-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                    {user.status === 'active' ? 'نشط ومفعل' : 'قيد المراجعة'}
                  </span>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex gap-3 mt-auto">
                {user.status === 'pending' ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#059669] text-white rounded-2xl font-black text-[11px] hover:bg-[#047857] shadow-md shadow-green-100 transition-all">
                      <CheckCircle2 className="w-4 h-4" /> قبول الطلب
                    </button>
                    <button className="px-4 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl font-black text-[11px] hover:bg-red-100 transition-all">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-[11px] transition-all border ${
                    user.status === 'active' 
                    ? 'bg-white text-red-500 border-red-100 hover:bg-red-50 shadow-sm' 
                    : 'bg-[#25527E] text-white border-transparent hover:bg-[#1a3a5a]'
                  }`}>
                    {user.status === 'active' ? <UserX className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    {user.status === 'active' ? 'إيقاف الصلاحيات' : 'تفعيل الحساب'}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          /* حالة عدم وجود نتائج */
          <div className="col-span-full py-24 text-center bg-[#F8FAFF] rounded-[3.5rem] border border-dashed border-blue-100">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-100 shadow-sm">
                <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-[#25527E] mb-2">لا يوجد موظفين بهذا الاسم</h3>
            <p className="text-[#4A7299] font-bold max-w-xs mx-auto text-sm">تأكد من كتابة الاسم بشكل صحيح أو تغيير فلتر البحث.</p>
          </div>
        )}
      </div>
    </div>
  );
}