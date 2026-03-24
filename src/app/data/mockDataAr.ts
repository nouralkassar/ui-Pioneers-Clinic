// البيانات التجريبية للوحة التحكم الطبية

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'ذكر' | 'أنثى';
  diagnosis: string;
  status: 'نشط' | 'تحت العلاج' | 'متابعة' | 'متعافي' | 'حرج';
  phone: string;
  email: string;
  bloodType: string;
  assignedDate: string;
  lastVisit: string;
  nextAppointment?: string;
  avatar?: string;
}

export interface TreatmentSession {
  id: string;
  date: string;
  type: string;
  notes: string;
  status: 'مكتمل' | 'مجدول' | 'ملغي';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'نشط' | 'مكتمل';
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: 'طبيعي' | 'غير طبيعي' | 'حرج';
  results: string;
  uploadedBy: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'مؤكد' | 'قيد الانتظار' | 'ملغي' | 'مكتمل';
  notes?: string;
}

export interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'document';
  fileUrl?: string;
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'سارة أحمد محمد',
    age: 54,
    gender: 'أنثى',
    diagnosis: 'سرطان الثدي - المرحلة الثانية',
    status: 'تحت العلاج',
    phone: '0501234567',
    email: 'sarah.ahmed@email.com',
    bloodType: 'A+',
    assignedDate: '2025-01-15',
    lastVisit: '2026-03-01',
    nextAppointment: '2026-03-12',
  },
  {
    id: '2',
    name: 'محمد علي حسن',
    age: 62,
    gender: 'ذكر',
    diagnosis: 'سرطان الرئة - المرحلة الثالثة',
    status: 'نشط',
    phone: '0502345678',
    email: 'mohamed.ali@email.com',
    bloodType: 'O+',
    assignedDate: '2025-02-20',
    lastVisit: '2026-02-28',
    nextAppointment: '2026-03-08',
  },
  {
    id: '3',
    name: 'فاطمة عبدالله',
    age: 48,
    gender: 'أنثى',
    diagnosis: 'سرطان المبيض - المرحلة الأولى',
    status: 'متابعة',
    phone: '0503456789',
    email: 'fatima.abdullah@email.com',
    bloodType: 'B+',
    assignedDate: '2024-11-10',
    lastVisit: '2026-03-05',
    nextAppointment: '2026-03-15',
  },
  {
    id: '4',
    name: 'خالد عبدالرحمن',
    age: 71,
    gender: 'ذكر',
    diagnosis: 'سرطان البروستاتا - المرحلة الثانية',
    status: 'تحت العلاج',
    phone: '0504567890',
    email: 'khaled.abdulrahman@email.com',
    bloodType: 'AB+',
    assignedDate: '2025-03-01',
    lastVisit: '2026-03-03',
    nextAppointment: '2026-03-10',
  },
  {
    id: '5',
    name: 'ليلى حسين',
    age: 58,
    gender: 'أنثى',
    diagnosis: 'سرطان القولون والمستقيم - المرحلة الثالثة',
    status: 'حرج',
    phone: '0505678901',
    email: 'laila.hussein@email.com',
    bloodType: 'O-',
    assignedDate: '2024-09-15',
    lastVisit: '2026-03-06',
    nextAppointment: '2026-03-09',
  },
  {
    id: '6',
    name: 'أحمد محمود',
    age: 66,
    gender: 'ذكر',
    diagnosis: 'سرطان البنكرياس - المرحلة الثانية',
    status: 'نشط',
    phone: '0506789012',
    email: 'ahmed.mahmoud@email.com',
    bloodType: 'A-',
    assignedDate: '2025-01-20',
    lastVisit: '2026-03-04',
    nextAppointment: '2026-03-11',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: '1',
    patientName: 'سارة أحمد محمد',
    date: '2026-03-07',
    time: '09:00',
    type: 'جلسة علاج كيماوي',
    status: 'مؤكد',
    notes: 'جلسة علاجية منتظمة',
  },
  {
    id: 'apt2',
    patientId: '5',
    patientName: 'ليلى حسين',
    date: '2026-03-07',
    time: '11:00',
    type: 'استشارة متابعة',
    status: 'مؤكد',
    notes: 'مراجعة نتائج التحاليل الأخيرة',
  },
  {
    id: 'apt3',
    patientId: '2',
    patientName: 'محمد علي حسن',
    date: '2026-03-08',
    time: '10:00',
    type: 'علاج إشعاعي',
    status: 'مؤكد',
  },
  {
    id: 'apt4',
    patientId: '4',
    patientName: 'خالد عبدالرحمن',
    date: '2026-03-10',
    time: '14:00',
    type: 'استشارة عامة',
    status: 'قيد الانتظار',
  },
  {
    id: 'apt5',
    patientId: '3',
    patientName: 'فاطمة عبدالله',
    date: '2026-03-12',
    time: '09:30',
    type: 'فحص دوري',
    status: 'مؤكد',
  },
];

export const mockTreatmentSessions: Record<string, TreatmentSession[]> = {
  '1': [
    {
      id: 'ts1',
      date: '2026-03-01',
      type: 'العلاج الكيماوي - الدورة 4',
      notes: 'تحملت المريضة العلاج جيداً. تم التحكم في الغثيان الخفيف بالأدوية.',
      status: 'مكتمل',
    },
    {
      id: 'ts2',
      date: '2026-02-15',
      type: 'العلاج الكيماوي - الدورة 3',
      notes: 'استجابة جيدة للعلاج. مؤشرات الورم في انخفاض.',
      status: 'مكتمل',
    },
    {
      id: 'ts3',
      date: '2026-03-12',
      type: 'العلاج الكيماوي - الدورة 5',
      notes: 'جلسة علاجية مجدولة',
      status: 'مجدول',
    },
  ],
};

export const mockMedications: Record<string, Medication[]> = {
  '1': [
    {
      id: 'med1',
      name: 'دوكسوروبيسين',
      dosage: '60 ملغ/م²',
      frequency: 'كل 21 يوم',
      startDate: '2025-01-20',
      status: 'نشط',
    },
    {
      id: 'med2',
      name: 'سيكلوفوسفاميد',
      dosage: '600 ملغ/م²',
      frequency: 'كل 21 يوم',
      startDate: '2025-01-20',
      status: 'نشط',
    },
    {
      id: 'med3',
      name: 'أونادنسيترون',
      dosage: '8 ملغ',
      frequency: 'مرتين يومياً عند الحاجة',
      startDate: '2025-01-20',
      status: 'نشط',
    },
  ],
};

export const mockLabResults: Record<string, LabResult[]> = {
  '1': [
    {
      id: 'lab1',
      testName: 'تعداد الدم الكامل',
      date: '2026-03-05',
      status: 'طبيعي',
      results: 'كريات الدم البيضاء: 6.5، كريات الدم الحمراء: 4.2، الصفائح: 250 ألف',
      uploadedBy: 'فني المختبر - مريم أحمد',
    },
    {
      id: 'lab2',
      testName: 'مؤشر الورم CA 15-3',
      date: '2026-03-04',
      status: 'غير طبيعي',
      results: 'المستوى: 32 وحدة/مل (انخفض من 45 وحدة/مل)',
      uploadedBy: 'فني المختبر - يوسف حسن',
    },
    {
      id: 'lab3',
      testName: 'فحص وظائف الكبد',
      date: '2026-03-03',
      status: 'طبيعي',
      results: 'ALT: 25، AST: 28، البيليروبين: 0.8',
      uploadedBy: 'فني المختبر - مريم أحمد',
    },
  ],
};

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'msg1',
      sender: 'patient',
      content: 'صباح الخير دكتورة. أردت إخبارك أنني شعرت ببعض الغثيان هذا الصباح.',
      timestamp: '2026-03-07T08:30:00',
      type: 'text',
    },
    {
      id: 'msg2',
      sender: 'doctor',
      content: 'صباح النور سارة. شكراً لإخباري. هل الغثيان شديد؟ هل تناولتِ دواء أونادنسيترون كما وُصف؟',
      timestamp: '2026-03-07T08:45:00',
      type: 'text',
    },
    {
      id: 'msg3',
      sender: 'patient',
      content: 'نعم، تناولته قبل حوالي 30 دقيقة. أشعر بتحسن الآن.',
      timestamp: '2026-03-07T09:00:00',
      type: 'text',
    },
    {
      id: 'msg4',
      sender: 'doctor',
      content: 'هذا جيد. يرجى الاستمرار بالدواء حسب الحاجة. إذا استمر الغثيان أو ازداد سوءاً، يرجى الاتصال بالعيادة فوراً. نراكِ في موعدك اليوم.',
      timestamp: '2026-03-07T09:05:00',
      type: 'text',
    },
  ],
};

export const mockArchivedPatients: Patient[] = [
  {
    id: 'arch1',
    name: 'عمر سالم',
    age: 68,
    gender: 'ذكر',
    diagnosis: 'سرطان الغدة الدرقية - المرحلة الأولى',
    status: 'متعافي',
    phone: '0507890123',
    email: 'omar.salem@email.com',
    bloodType: 'B+',
    assignedDate: '2024-03-10',
    lastVisit: '2025-11-20',
  },
  {
    id: 'arch2',
    name: 'نورة حمد',
    age: 72,
    gender: 'أنثى',
    diagnosis: 'سرطان الجلد - الميلانوما المرحلة الثانية',
    status: 'متعافي',
    phone: '0508901234',
    email: 'noura.hamad@email.com',
    bloodType: 'O+',
    assignedDate: '2024-01-15',
    lastVisit: '2025-10-05',
  },
];

export const doctorInfo = {
  name: 'د. أميرة العلي',
  specialty: 'أورام',
  email: 'dr.alali@medicalcenter.com',
  phone: '0501234567',
};
