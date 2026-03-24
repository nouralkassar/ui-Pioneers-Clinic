import { useParams, Link } from 'react-router';
import { ArrowLeft, Phone, Mail, Calendar, User, Droplet, Plus } from 'lucide-react';
import { mockPatients, mockTreatmentSessions, mockMedications, mockLabResults } from '../data/mockData';
import { useState } from 'react';

export function PatientFilePage() {
  const { id } = useParams<{ id: string }>();
  const patient = mockPatients.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState<'sessions' | 'medications' | 'lab' | 'notes'>('sessions');

  if (!patient) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Patient not found.</p>
          <Link to="/patients" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  const treatmentSessions = mockTreatmentSessions[id || ''] || [];
  const medications = mockMedications[id || ''] || [];
  const labResults = mockLabResults[id || ''] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Treatment':
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Critical':
      case 'Abnormal':
        return 'bg-red-100 text-red-700';
      case 'Normal':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link
        to="/patients"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Patients</span>
      </Link>

      {/* Patient Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Patient Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-3xl">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          {/* Patient Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <p className="text-gray-600">{patient.diagnosis}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(patient.status)}`}>
                {patient.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Age / Gender</p>
                  <p className="text-sm font-medium text-gray-900">{patient.age} years • {patient.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Blood Type</p>
                  <p className="text-sm font-medium text-gray-900">{patient.bloodType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Assigned Date</p>
                  <p className="text-sm font-medium text-gray-900">{patient.assignedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{patient.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'sessions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Treatment Sessions
            </button>
            <button
              onClick={() => setActiveTab('medications')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'medications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Medications
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'lab'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Lab Results
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'notes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Medical Notes
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Treatment Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Treatment History</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Session
                </button>
              </div>

              {treatmentSessions.length > 0 ? (
                <div className="space-y-3">
                  {treatmentSessions.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{session.type}</h3>
                          <p className="text-sm text-gray-500">{session.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{session.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No treatment sessions recorded yet.</p>
              )}
            </div>
          )}

          {/* Medications Tab */}
          {activeTab === 'medications' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h2>
              {medications.length > 0 ? (
                <div className="space-y-3">
                  {medications.map((med) => (
                    <div key={med.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{med.name}</h3>
                          <p className="text-sm text-gray-600">{med.dosage}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                          {med.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Frequency</p>
                          <p className="text-sm text-gray-900">{med.frequency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Start Date</p>
                          <p className="text-sm text-gray-900">{med.startDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No medications prescribed yet.</p>
              )}
            </div>
          )}

          {/* Lab Results Tab */}
          {activeTab === 'lab' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Laboratory Results</h2>
              {labResults.length > 0 ? (
                <div className="space-y-3">
                  {labResults.map((lab) => (
                    <div key={lab.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{lab.testName}</h3>
                          <p className="text-sm text-gray-500">{lab.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lab.status)}`}>
                          {lab.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{lab.results}</p>
                      <p className="text-xs text-gray-500">Uploaded by: {lab.uploadedBy}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No lab results available yet.</p>
              )}
            </div>
          )}

          {/* Medical Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Medical Notes</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Note
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  Patient responding well to current chemotherapy regimen. Continue monitoring tumor markers.
                  Next imaging scheduled for end of month.
                </p>
                <p className="text-xs text-gray-500 mt-2">Dr. Anderson - 2026-03-01</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
