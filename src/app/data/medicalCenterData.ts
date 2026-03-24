// بيانات نظام إدارة المركز الطبي

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super-doctor' | 'doctor' | 'secretary';
  specialty?: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'ذكر' | 'أنثى';
  diagnosis: string;
  assignedDoctorId: string;
  assignedDoctorName: string;
  registrationDate: string;
  status: 'نشط' | 'تحت العلاج' | 'متابعة' | 'محول' | 'مؤرشف';
  phone: string;
  email: string;
  bloodType: string;
  nationalId: string;
  address: string;
  emergencyContact: string;
  paymentStatus: 'مدفوع بالكامل' | 'مدفوع جزئياً' | 'غير مدفوع';
  totalAmount?: number;
  paidAmount?: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'مؤكد' | 'قيد الانتظار' | 'مكتمل' | 'ملغي' | 'بحاجة موافقة';
  notes?: string;
  requestedBy?: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  subject: string;
  message: string;
  reply?: string;
  status: 'جديد' | 'تم الرد' | 'قيد المراجعة';
  priority: 'عادي' | 'متوسط' | 'عاجل';
}

export interface MedicalAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'تفاعل دوائي' | 'تحذير سمية' | 'نتائج حرجة' | 'متابعة عاجلة';
  severity: 'منخفض' | 'متوسط' | 'عالي' | 'حرج';
  message: string;
  date: string;
  isRead: boolean;
}

export interface TreatmentProtocol {
  id: string;
  name: string;
  indication: string;
  drugs: Array<{
    name: string;
    dose: string;
    route: string;
    frequency: string;
  }>;
  cycle: string;
  duration: string;
  toxicityLevel: 'منخفض' | 'متوسط' | 'عالي';
  sideEffects: string[];
}

export interface AnalyticsData {
  patientProgress: Array<{
    date: string;
    improvement: number;
    symptoms: number;
    quality: number;
  }>;
  vitalSigns: Array<{
    date: string;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
  }>;
  treatmentResponse: Array<{
    cycle: number;
    tumorSize: number;
    biomarkers: number;
  }>;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'معلومة' | 'تحذير' | 'خطأ' | 'نجاح';
  date: string;
  isRead: boolean;
  isGlobal: boolean;
}

// المستخدمون المسجلون
export const users: User[] = [
  {
    id: 'u1',
    name: 'د. أميرة العلي',
    email: 'amira.ali@medcenter.com',
    role: 'super-doctor',
    specialty: 'أورام الثدي',
    phone: '0501234567',
    status: 'active',
  },
  {
    id: 'u2',
    name: 'د. محمد الأحمد',
    email: 'mohammed.ahmad@medcenter.com',
    role: 'doctor',
    specialty: 'أورام الجهاز الهضمي',
    phone: '0502345678',
    status: 'active',
  },
  {
    id: 'u3',
    name: 'د. سارة الخالدي',
    email: 'sarah.khaldi@medcenter.com',
    role: 'doctor',
    specialty: 'أورام الدم',
    phone: '0503456789',
    status: 'pending',
  },
  {
    id: 'u4',
    name: 'نورة السليمان',
    email: 'noura.s@medcenter.com',
    role: 'secretary',
    phone: '0504567890',
    status: 'active',
  },
];

// المرضى
export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'عمر بن سالم الزهراني',
    age: 58,
    gender: 'ذكر',
    diagnosis: 'سرطان القولون - المرحلة الثالثة',
    assignedDoctorId: 'u1',
    assignedDoctorName: 'د. أميرة العلي',
    registrationDate: '2025-12-10',
    status: 'تحت العلاج',
    phone: '0508901234',
    email: 'omar.z@email.com',
    bloodType: 'A+',
    nationalId: '1234567890',
    address: 'الرياض، حي النخيل',
    emergencyContact: '0509012345',
    paymentStatus: 'مدفوع بالكامل',
    totalAmount: 50000,
    paidAmount: 50000,
  },
  {
    id: 'p2',
    name: 'ليلى أحمد حسن',
    age: 52,
    gender: 'أنثى',
    diagnosis: 'سرطان الثدي - المرحلة الثانية',
    assignedDoctorId: 'u1',
    assignedDoctorName: 'د. أميرة العلي',
    registrationDate: '2026-01-15',
    status: 'تحت العلاج',
    phone: '0509012345',
    email: 'layla.h@email.com',
    bloodType: 'O+',
    nationalId: '1234567891',
    address: 'جدة، حي الروضة',
    emergencyContact: '0500123456',
    paymentStatus: 'مدفوع جزئياً',
    totalAmount: 60000,
    paidAmount: 30000,
  },
  {
    id: 'p3',
    name: 'يوسف محمد الغامدي',
    age: 64,
    gender: 'ذكر',
    diagnosis: 'سرطان البروستاتا - المرحلة الأولى',
    assignedDoctorId: 'u2',
    assignedDoctorName: 'د. محمد الأحمد',
    registrationDate: '2026-02-20',
    status: 'متابعة',
    phone: '0500123456',
    email: 'youssef.g@email.com',
    bloodType: 'B+',
    nationalId: '1234567892',
    address: 'الدمام، حي الفيصلية',
    emergencyContact: '0501234567',
    paymentStatus: 'مدفوع بالكامل',
    totalAmount: 35000,
    paidAmount: 35000,
  },
  {
    id: 'p4',
    name: 'منى خالد السبيعي',
    age: 47,
    gender: 'أنثى',
    diagnosis: 'سرطان المبيض - المرحلة الثانية',
    assignedDoctorId: 'u1',
    assignedDoctorName: 'د. أميرة العلي',
    registrationDate: '2026-03-01',
    status: 'نشط',
    phone: '0501234567',
    email: 'mona.s@email.com',
    bloodType: 'AB+',
    nationalId: '1234567893',
    address: 'مكة المكرمة، العزيزية',
    emergencyContact: '0502345678',
    paymentStatus: 'غير مدفوع',
    totalAmount: 55000,
    paidAmount: 0,
  },
  {
    id: 'p5',
    name: 'فهد عبدالله المطيري',
    age: 61,
    gender: 'ذكر',
    diagnosis: 'سرطان الرئة - المرحلة الثالثة',
    assignedDoctorId: 'u2',
    assignedDoctorName: 'د. محمد الأحمد',
    registrationDate: '2026-02-05',
    status: 'تحت العلاج',
    phone: '0503456789',
    email: 'fahad.m@email.com',
    bloodType: 'O-',
    nationalId: '1234567894',
    address: 'المدينة المنورة، العيون',
    emergencyContact: '0504567890',
    paymentStatus: 'مدفوع جزئياً',
    totalAmount: 75000,
    paidAmount: 40000,
  },
];

// المو��عيد
export const appointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'p1',
    patientName: 'عمر بن سالم الزهراني',
    doctorId: 'u1',
    doctorName: 'د. أميرة العلي',
    date: '2026-03-09',
    time: '09:00',
    type: 'جلسة علاج كيماوي',
    status: 'مؤكد',
  },
  {
    id: 'apt2',
    patientId: 'p2',
    patientName: 'ليلى أحمد حسن',
    doctorId: 'u1',
    doctorName: 'د. أميرة العلي',
    date: '2026-03-09',
    time: '11:00',
    type: 'متابعة بعد العلاج',
    status: 'مؤكد',
  },
  {
    id: 'apt3',
    patientId: 'p4',
    patientName: 'منى خالد السبيعي',
    doctorId: 'u1',
    doctorName: 'د. أميرة العلي',
    date: '2026-03-10',
    time: '10:00',
    type: 'استشارة أولية',
    status: 'بحاجة موافقة',
    requestedBy: 'السكرتارية',
  },
  {
    id: 'apt4',
    patientId: 'p3',
    patientName: 'يوسف محمد الغامدي',
    doctorId: 'u2',
    doctorName: 'د. محمد الأحمد',
    date: '2026-03-11',
    time: '14:00',
    type: 'فحص دوري',
    status: 'مؤكد',
  },
  {
    id: 'apt5',
    patientId: 'p5',
    patientName: 'فهد عبدالله المطيري',
    doctorId: 'u2',
    doctorName: 'د. محمد الأحمد',
    date: '2026-03-12',
    time: '09:30',
    type: 'جلسة علاج',
    status: 'قيد الانتظار',
  },
];

// الاستشارات
export const consultations: Consultation[] = [
  {
    id: 'cons1',
    patientId: 'p1',
    patientName: 'عمر بن سالم الزهراني',
    doctorId: 'u1',
    doctorName: 'د. أميرة العلي',
    date: '2026-03-08',
    subject: 'استفسار عن الأعراض الجانبية',
    message: 'أشعر بغثيان شديد بعد جلسة العلاج الأخيرة. ما هي النصائح للتخفيف من ذلك؟',
    status: 'جديد',
    priority: 'متوسط',
  },
  {
    id: 'cons2',
    patientId: 'p2',
    patientName: 'ليلى أحمد حسن',
    doctorId: 'u1',
    doctorName: 'د. أميرة العلي',
    date: '2026-03-07',
    subject: 'سؤال عن نتائج الفحوصات',
    message: 'متى ستكون نتائج الفحوصات الأخيرة جاهزة؟',
    reply: 'نتائج الفحوصات ستكون جاهزة خلال 48 ساعة. سنتواصل معك فور استلامها.',
    status: 'تم الرد',
    priority: 'عادي',
  },
  {
    id: 'cons3',
    patientId: 'p5',
    patientName: 'فهد عبدالله المطيري',
    doctorId: 'u2',
    doctorName: 'د. محمد الأحمد',
    date: '2026-03-09',
    subject: 'ألم في الصدر',
    message: 'أعاني من ألم شديد في الصدر منذ يومين. هل هذا طبيعي؟',
    status: 'جديد',
    priority: 'عاجل',
  },
];

// التنبيهات الطبية
export const medicalAlerts: MedicalAlert[] = [
  {
    id: 'alert1',
    patientId: 'p1',
    patientName: 'عمر بن سالم الزهراني',
    type: 'تحذير سمية',
    severity: 'متوسط',
    message: 'ارتفاع في إنزيمات الكبد - يتطلب متابعة',
    date: '2026-03-09',
    isRead: false,
  },
  {
    id: 'alert2',
    patientId: 'p5',
    patientName: 'فهد عبدالله المطيري',
    type: 'نتائج حرجة',
    severity: 'حرج',
    message: 'انخفاض حاد في عدد كريات الدم البيضاء',
    date: '2026-03-09',
    isRead: false,
  },
  {
    id: 'alert3',
    patientId: 'p2',
    patientName: 'ليلى أحمد حسن',
    type: 'متابعة عاجلة',
    severity: 'عالي',
    message: 'موعد المتابعة بعد الجراحة مستحق',
    date: '2026-03-08',
    isRead: true,
  },
];

// بروتوكولات العلاج
export const treatmentProtocols: TreatmentProtocol[] = [
  {
    id: 'proto1',
    name: 'FOLFOX',
    indication: 'سرطان القولون والمستقيم',
    drugs: [
      { name: 'Oxaliplatin', dose: '85 mg/m²', route: 'IV', frequency: 'يوم 1' },
      { name: 'Leucovorin', dose: '400 mg/m²', route: 'IV', frequency: 'يوم 1' },
      { name: '5-Fluorouracil', dose: '400 mg/m²', route: 'IV bolus', frequency: 'يوم 1' },
      { name: '5-Fluorouracil', dose: '2400 mg/m²', route: 'IV infusion', frequency: 'يوم 1-2' },
    ],
    cycle: 'كل أسبوعين',
    duration: '12 دورة',
    toxicityLevel: 'متوسط',
    sideEffects: ['غثيان', 'تعب', 'نقص كريات الدم البيضاء', 'اعتلال الأعصاب الطرفية'],
  },
  {
    id: 'proto2',
    name: 'AC-T',
    indication: 'سرطان الثدي',
    drugs: [
      { name: 'Doxorubicin', dose: '60 mg/m²', route: 'IV', frequency: 'يوم 1' },
      { name: 'Cyclophosphamide', dose: '600 mg/m²', route: 'IV', frequency: 'يوم 1' },
    ],
    cycle: 'كل 3 أسابيع (4 دورات)، ثم',
    duration: '4 دورات AC + 4 دورات T',
    toxicityLevel: 'عالي',
    sideEffects: ['تساقط الشعر', 'غثيان شديد', 'نقص المناعة', 'تعب'],
  },
];

// إحصائيات النظام
export const systemStats = {
  totalPatients: 124,
  activePatients: 89,
  todayAppointments: 12,
  pendingApprovals: 3,
  activeDoctors: 8,
  pendingDoctors: 2,
  totalAppointments: 892,
  completedSessions: 1240,
  monthlyRevenue: 485000,
  unpaidAmount: 125000,
};

// المستخدم الحالي
export const getCurrentUser = (): User | null => {
  const email = localStorage.getItem('userEmail');
  return users.find(u => u.email === email) || null;
};

export const setCurrentUser = (email: string) => {
  localStorage.setItem('userEmail', email);
  const user = users.find(u => u.email === email);
  if (user) {
    localStorage.setItem('userRole', user.role);
  }
};


