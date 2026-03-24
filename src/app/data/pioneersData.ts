// بيانات نظام عيادة رواد الاستشارية

export interface DoctorAccount {
  id: string;
  name: string;
  email: string;
  specialty: string;
  phone: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  credentials: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'طبيب' | 'ممرض' | 'فني مختبر' | 'إداري';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'ذكر' | 'أنثى';
  diagnosis: string;
  assignedDoctor: string;
  registrationDate: string;
  status: 'نشط' | 'تحت العلاج' | 'متابعة';
  phone: string;
  bloodType: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'مؤكد' | 'قيد الانتظار' | 'مكتمل' | 'ملغي';
}

export interface ChemoProtocol {
  id: string;
  name: string;
  indication: string;
  drugs: string[];
  cycle: string;
  toxicityLevel: 'منخفض' | 'متوسط' | 'عالي';
}

export interface MedicalRecord {
  patientId: string;
  diagnosis: string;
  stage: string;
  historyOfDiseases: string[];
  currentMedications: string[];
  allergies: string[];
  treatmentPlan: string;
  notes: string;
}

export interface ToxicityData {
  date: string;
  nausea: number;
  fatigue: number;
  neutropenia: number;
  anemia: number;
}

// بيانات طلبات حسابات الأطباء
export const pendingDoctorAccounts: DoctorAccount[] = [
  {
    id: 'doc1',
    name: 'د. خالد العمري',
    email: 'khaled.omari@email.com',
    specialty: 'أورام الدم',
    phone: '0501234567',
    registrationDate: '2026-03-05',
    status: 'pending',
    credentials: 'بورد أمريكي - أورام',
  },
  {
    id: 'doc2',
    name: 'د. سارة المطيري',
    email: 'sarah.mutairi@email.com',
    specialty: 'أورام الجهاز الهضمي',
    phone: '0502345678',
    registrationDate: '2026-03-06',
    status: 'pending',
    credentials: 'زمالة كندية - أورام',
  },
  {
    id: 'doc3',
    name: 'د. أحمد الشهري',
    email: 'ahmed.shehri@email.com',
    specialty: 'أورام الثدي',
    phone: '0503456789',
    registrationDate: '2026-03-07',
    status: 'pending',
    credentials: 'بورد سعودي - أورام',
  },
];

// بيانات طاقم العمل
export const staffMembers: Staff[] = [
  {
    id: 'staff1',
    name: 'د. فاطمة القحطاني',
    role: 'طبيب',
    email: 'fatima.qahtani@pioneers.com',
    phone: '0504567890',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: 'staff2',
    name: 'أ. محمد الغامدي',
    role: 'ممرض',
    email: 'mohammed.ghamdi@pioneers.com',
    phone: '0505678901',
    status: 'active',
    joinDate: '2024-06-20',
  },
  {
    id: 'staff3',
    name: 'أ. نورة الدوسري',
    role: 'فني مختبر',
    email: 'noura.dosari@pioneers.com',
    phone: '0506789012',
    status: 'active',
    joinDate: '2025-02-10',
  },
  {
    id: 'staff4',
    name: 'أ. عبدالله السلمي',
    role: 'إداري',
    email: 'abdullah.salmi@pioneers.com',
    phone: '0507890123',
    status: 'active',
    joinDate: '2023-11-05',
  },
];

// بيانات المرضى
export const patientsData: Patient[] = [
  {
    id: 'p1',
    name: 'عمر بن سالم',
    age: 58,
    gender: 'ذكر',
    diagnosis: 'سرطان القولون - المرحلة الثالثة',
    assignedDoctor: 'د. أميرة العلي',
    registrationDate: '2025-12-10',
    status: 'تحت العلاج',
    phone: '0508901234',
    bloodType: 'A+',
  },
  {
    id: 'p2',
    name: 'ليلى أحمد حسن',
    age: 52,
    gender: 'أنثى',
    diagnosis: 'سرطان الثدي - المرحلة الثانية',
    assignedDoctor: 'د. أميرة العلي',
    registrationDate: '2026-01-15',
    status: 'تحت العلاج',
    phone: '0509012345',
    bloodType: 'O+',
  },
  {
    id: 'p3',
    name: 'يوسف محمد الزهراني',
    age: 64,
    gender: 'ذكر',
    diagnosis: 'سرطان البروستاتا - المرحلة الأولى',
    assignedDoctor: 'د. أميرة العلي',
    registrationDate: '2026-02-20',
    status: 'متابعة',
    phone: '0500123456',
    bloodType: 'B+',
  },
  {
    id: 'p4',
    name: 'منى خالد السبيعي',
    age: 47,
    gender: 'أنثى',
    diagnosis: 'سرطان المبيض - المرحلة الثانية',
    assignedDoctor: 'د. أميرة العلي',
    registrationDate: '2026-03-01',
    status: 'نشط',
    phone: '0501234567',
    bloodType: 'AB+',
  },
];

// بيانات المواعيد
export const appointmentsData: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'p1',
    patientName: 'عمر بن سالم',
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
    doctorName: 'د. أميرة العلي',
    date: '2026-03-10',
    time: '10:00',
    type: 'استشارة أولية',
    status: 'قيد الانتظار',
  },
  {
    id: 'apt4',
    patientId: 'p3',
    patientName: 'يوسف محمد الزهراني',
    doctorName: 'د. أميرة العلي',
    date: '2026-03-11',
    time: '14:00',
    type: 'فحص دوري',
    status: 'مؤكد',
  },
];

// بروتوكولات العلاج الكيماوي الذكية
export const chemoProtocols: ChemoProtocol[] = [
  {
    id: 'proto1',
    name: 'FOLFOX',
    indication: 'سرطان القولون والمستقيم',
    drugs: ['Oxaliplatin', 'Leucovorin', '5-Fluorouracil'],
    cycle: 'كل أسبوعين',
    toxicityLevel: 'متوسط',
  },
  {
    id: 'proto2',
    name: 'AC-T',
    indication: 'سرطان الثدي',
    drugs: ['Doxorubicin', 'Cyclophosphamide', 'Paclitaxel'],
    cycle: 'كل 3 أسابيع',
    toxicityLevel: 'عالي',
  },
  {
    id: 'proto3',
    name: 'Carboplatin-Paclitaxel',
    indication: 'سرطان المبيض',
    drugs: ['Carboplatin', 'Paclitaxel'],
    cycle: 'كل 3 أسابيع',
    toxicityLevel: 'متوسط',
  },
  {
    id: 'proto4',
    name: 'Docetaxel',
    indication: 'سرطان البروستاتا',
    drugs: ['Docetaxel', 'Prednisone'],
    cycle: 'كل 3 أسابيع',
    toxicityLevel: 'منخفض',
  },
];

// السجلات الطبية
export const medicalRecords: Record<string, MedicalRecord> = {
  p1: {
    patientId: 'p1',
    diagnosis: 'سرطان القولون - المرحلة الثالثة (T3N1M0)',
    stage: 'المرحلة الثالثة',
    historyOfDiseases: ['ارتفاع ضغط الدم', 'السكري من النوع 2'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    allergies: ['البنسلين'],
    treatmentPlan: 'بروتوكول FOLFOX لمدة 12 دورة، يليه متابعة دورية',
    notes: 'المريض يستجيب جيداً للعلاج. التصوير الأخير يظهر انخفاض في حجم الورم.',
  },
  p2: {
    patientId: 'p2',
    diagnosis: 'سرطان الثدي - المرحلة الثانية (T2N1M0)',
    stage: 'المرحلة الثانية',
    historyOfDiseases: ['لا يوجد'],
    currentMedications: ['لا يوجد'],
    allergies: ['لا يوجد'],
    treatmentPlan: 'بروتوكول AC-T لمدة 8 دورات، يليه علاج إشعاعي',
    notes: 'بدأت الدورة الثالثة من العلاج. آثار جانبية خفيفة.',
  },
};

// بيانات السمية
export const toxicityData: Record<string, ToxicityData[]> = {
  p1: [
    { date: '2026-01-15', nausea: 2, fatigue: 3, neutropenia: 1, anemia: 1 },
    { date: '2026-02-01', nausea: 3, fatigue: 4, neutropenia: 2, anemia: 2 },
    { date: '2026-02-15', nausea: 2, fatigue: 3, neutropenia: 1, anemia: 1 },
    { date: '2026-03-01', nausea: 1, fatigue: 2, neutropenia: 1, anemia: 1 },
  ],
  p2: [
    { date: '2026-01-20', nausea: 1, fatigue: 2, neutropenia: 0, anemia: 1 },
    { date: '2026-02-10', nausea: 2, fatigue: 3, neutropenia: 1, anemia: 2 },
    { date: '2026-03-02', nausea: 2, fatigue: 2, neutropenia: 1, anemia: 1 },
  ],
};

// إحصائيات عامة
export const globalAnalytics = {
  totalPatients: 124,
  activeTreatments: 48,
  completedAppointments: 892,
  pendingApprovals: 3,
  monthlyRevenue: 485000,
  patientSatisfaction: 4.8,
  averageWaitTime: '12 دقيقة',
  staffUtilization: 87,
};

export const currentUser = {
  name: 'د. أميرة العلي',
  role: 'طبيب أورام',
  email: 'dr.alali@pioneers.com',
  phone: '0501234567',
  isSuperDoctor: false, // يمكن تغييرها حسب نوع الحساب
};
