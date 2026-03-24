import { useState } from 'react';
import { FileText, Download, Eye, Upload, Search } from 'lucide-react';
import { mockPatients, mockLabResults } from '../data/mockData';

export function LabResultsPage() {
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Combine all lab results with patient info
  const allLabResults = mockPatients.flatMap((patient) => {
    const results = mockLabResults[patient.id] || [];
    return results.map((result) => ({
      ...result,
      patientId: patient.id,
      patientName: patient.name,
    }));
  });

  const filteredResults = allLabResults.filter((result) => {
    const matchesPatient = selectedPatient === 'all' || result.patientId === selectedPatient;
    const matchesSearch =
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPatient && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Abnormal':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Normal':
        return '✓';
      case 'Abnormal':
        return '!';
      case 'Critical':
        return '⚠';
      default:
        return '•';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lab Results Viewer</h1>
          <p className="text-gray-600">View and manage patient laboratory test results</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4" />
          Upload New Result
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by test name or patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Patients</option>
            {mockPatients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Results</p>
          <p className="text-2xl font-bold text-gray-900">{allLabResults.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <p className="text-sm text-green-700 mb-1">Normal</p>
          <p className="text-2xl font-bold text-green-700">
            {allLabResults.filter((r) => r.status === 'Normal').length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
          <p className="text-sm text-yellow-700 mb-1">Abnormal</p>
          <p className="text-2xl font-bold text-yellow-700">
            {allLabResults.filter((r) => r.status === 'Abnormal').length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <p className="text-sm text-red-700 mb-1">Critical</p>
          <p className="text-2xl font-bold text-red-700">
            {allLabResults.filter((r) => r.status === 'Critical').length}
          </p>
        </div>
      </div>

      {/* Results List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Laboratory Results</h2>

          {filteredResults.length > 0 ? (
            <div className="space-y-3">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            result.status === 'Normal'
                              ? 'bg-green-600 text-white'
                              : result.status === 'Critical'
                              ? 'bg-red-600 text-white'
                              : 'bg-yellow-600 text-white'
                          }`}
                        >
                          {getStatusIcon(result.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.testName}</h3>
                          <p className="text-sm text-gray-600">{result.patientName}</p>
                        </div>
                      </div>
                      
                      <div className="ml-11 space-y-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Results:</span> {result.results}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Date:</span> {result.date}
                        </p>
                        <p className="text-xs text-gray-500">{result.uploadedBy}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No lab results found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h2>
        <div className="space-y-2">
          {allLabResults.slice(0, 3).map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {result.testName} - {result.patientName}
                  </p>
                  <p className="text-xs text-gray-500">{result.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status).split(' ')[0] + ' ' + getStatusColor(result.status).split(' ')[1]}`}>
                {result.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
