// Mock data for the medical dashboard

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  diagnosis: string;
  status: 'Active' | 'In Treatment' | 'Monitoring' | 'Recovered' | 'Critical';
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
  status: 'Completed' | 'Scheduled' | 'Cancelled';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'Active' | 'Completed';
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
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
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
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
    name: 'Sarah Johnson',
    age: 54,
    gender: 'Female',
    diagnosis: 'Breast Cancer - Stage II',
    status: 'In Treatment',
    phone: '+1 234-567-8901',
    email: 'sarah.johnson@email.com',
    bloodType: 'A+',
    assignedDate: '2025-01-15',
    lastVisit: '2026-03-01',
    nextAppointment: '2026-03-12',
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 62,
    gender: 'Male',
    diagnosis: 'Lung Cancer - Stage III',
    status: 'Active',
    phone: '+1 234-567-8902',
    email: 'michael.chen@email.com',
    bloodType: 'O+',
    assignedDate: '2025-02-20',
    lastVisit: '2026-02-28',
    nextAppointment: '2026-03-08',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 48,
    gender: 'Female',
    diagnosis: 'Ovarian Cancer - Stage I',
    status: 'Monitoring',
    phone: '+1 234-567-8903',
    email: 'emily.rodriguez@email.com',
    bloodType: 'B+',
    assignedDate: '2024-11-10',
    lastVisit: '2026-03-05',
    nextAppointment: '2026-03-15',
  },
  {
    id: '4',
    name: 'David Williams',
    age: 71,
    gender: 'Male',
    diagnosis: 'Prostate Cancer - Stage II',
    status: 'In Treatment',
    phone: '+1 234-567-8904',
    email: 'david.williams@email.com',
    bloodType: 'AB+',
    assignedDate: '2025-03-01',
    lastVisit: '2026-03-03',
    nextAppointment: '2026-03-10',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    age: 58,
    gender: 'Female',
    diagnosis: 'Colorectal Cancer - Stage III',
    status: 'Critical',
    phone: '+1 234-567-8905',
    email: 'lisa.anderson@email.com',
    bloodType: 'O-',
    assignedDate: '2024-09-15',
    lastVisit: '2026-03-06',
    nextAppointment: '2026-03-09',
  },
  {
    id: '6',
    name: 'Robert Taylor',
    age: 66,
    gender: 'Male',
    diagnosis: 'Pancreatic Cancer - Stage II',
    status: 'Active',
    phone: '+1 234-567-8906',
    email: 'robert.taylor@email.com',
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
    patientName: 'Sarah Johnson',
    date: '2026-03-07',
    time: '09:00',
    type: 'Chemotherapy Session',
    status: 'Confirmed',
    notes: 'Regular treatment session',
  },
  {
    id: 'apt2',
    patientId: '5',
    patientName: 'Lisa Anderson',
    date: '2026-03-07',
    time: '11:00',
    type: 'Follow-up Consultation',
    status: 'Confirmed',
    notes: 'Review recent lab results',
  },
  {
    id: 'apt3',
    patientId: '2',
    patientName: 'Michael Chen',
    date: '2026-03-08',
    time: '10:00',
    type: 'Radiation Therapy',
    status: 'Confirmed',
  },
  {
    id: 'apt4',
    patientId: '4',
    patientName: 'David Williams',
    date: '2026-03-10',
    time: '14:00',
    type: 'General Consultation',
    status: 'Pending',
  },
  {
    id: 'apt5',
    patientId: '3',
    patientName: 'Emily Rodriguez',
    date: '2026-03-12',
    time: '09:30',
    type: 'Routine Check-up',
    status: 'Confirmed',
  },
];

export const mockTreatmentSessions: Record<string, TreatmentSession[]> = {
  '1': [
    {
      id: 'ts1',
      date: '2026-03-01',
      type: 'Chemotherapy - Cycle 4',
      notes: 'Patient tolerated treatment well. Mild nausea managed with medication.',
      status: 'Completed',
    },
    {
      id: 'ts2',
      date: '2026-02-15',
      type: 'Chemotherapy - Cycle 3',
      notes: 'Good response to treatment. Tumor markers decreasing.',
      status: 'Completed',
    },
    {
      id: 'ts3',
      date: '2026-03-12',
      type: 'Chemotherapy - Cycle 5',
      notes: 'Scheduled treatment session',
      status: 'Scheduled',
    },
  ],
};

export const mockMedications: Record<string, Medication[]> = {
  '1': [
    {
      id: 'med1',
      name: 'Doxorubicin',
      dosage: '60 mg/m²',
      frequency: 'Every 21 days',
      startDate: '2025-01-20',
      status: 'Active',
    },
    {
      id: 'med2',
      name: 'Cyclophosphamide',
      dosage: '600 mg/m²',
      frequency: 'Every 21 days',
      startDate: '2025-01-20',
      status: 'Active',
    },
    {
      id: 'med3',
      name: 'Ondansetron',
      dosage: '8 mg',
      frequency: 'Twice daily as needed',
      startDate: '2025-01-20',
      status: 'Active',
    },
  ],
};

export const mockLabResults: Record<string, LabResult[]> = {
  '1': [
    {
      id: 'lab1',
      testName: 'Complete Blood Count',
      date: '2026-03-05',
      status: 'Normal',
      results: 'WBC: 6.5, RBC: 4.2, Platelets: 250K',
      uploadedBy: 'Lab Tech - Maria Garcia',
    },
    {
      id: 'lab2',
      testName: 'Tumor Marker CA 15-3',
      date: '2026-03-04',
      status: 'Abnormal',
      results: 'Level: 32 U/mL (Decreased from 45 U/mL)',
      uploadedBy: 'Lab Tech - John Smith',
    },
    {
      id: 'lab3',
      testName: 'Liver Function Test',
      date: '2026-03-03',
      status: 'Normal',
      results: 'ALT: 25, AST: 28, Bilirubin: 0.8',
      uploadedBy: 'Lab Tech - Maria Garcia',
    },
  ],
};

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'msg1',
      sender: 'patient',
      content: 'Good morning Dr. Anderson. I wanted to let you know that I experienced some nausea this morning.',
      timestamp: '2026-03-07T08:30:00',
      type: 'text',
    },
    {
      id: 'msg2',
      sender: 'doctor',
      content: 'Good morning Sarah. Thank you for letting me know. Is the nausea severe? Have you taken the Ondansetron as prescribed?',
      timestamp: '2026-03-07T08:45:00',
      type: 'text',
    },
    {
      id: 'msg3',
      sender: 'patient',
      content: 'Yes, I took it about 30 minutes ago. It\'s getting better now.',
      timestamp: '2026-03-07T09:00:00',
      type: 'text',
    },
    {
      id: 'msg4',
      sender: 'doctor',
      content: 'That\'s good to hear. Please continue with the medication as needed. If the nausea persists or worsens, please call the office immediately. See you at your appointment today.',
      timestamp: '2026-03-07T09:05:00',
      type: 'text',
    },
  ],
};

export const mockArchivedPatients: Patient[] = [
  {
    id: 'arch1',
    name: 'James Wilson',
    age: 68,
    gender: 'Male',
    diagnosis: 'Thyroid Cancer - Stage I',
    status: 'Recovered',
    phone: '+1 234-567-8907',
    email: 'james.wilson@email.com',
    bloodType: 'B+',
    assignedDate: '2024-03-10',
    lastVisit: '2025-11-20',
  },
  {
    id: 'arch2',
    name: 'Patricia Martinez',
    age: 72,
    gender: 'Female',
    diagnosis: 'Skin Cancer - Melanoma Stage II',
    status: 'Recovered',
    phone: '+1 234-567-8908',
    email: 'patricia.martinez@email.com',
    bloodType: 'O+',
    assignedDate: '2024-01-15',
    lastVisit: '2025-10-05',
  },
];

export const doctorInfo = {
  name: 'Dr. Emily Anderson',
  specialty: 'Oncology',
  email: 'dr.anderson@medicalcenter.com',
  phone: '+1 234-567-8900',
};
