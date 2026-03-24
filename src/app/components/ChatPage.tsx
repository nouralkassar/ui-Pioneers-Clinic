import { useState } from 'react';
import { Send, Image, FileText, User } from 'lucide-react';
import { mockPatients, mockMessages, Message } from '../data/mockData';

export function ChatPage() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);
  const currentMessages = messages[selectedPatientId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg${Date.now()}`,
      sender: 'doctor',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages({
      ...messages,
      [selectedPatientId]: [...currentMessages, message],
    });
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 h-[calc(100vh-6rem)]">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex">
        {/* Patient List Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Consultations</h2>
            <p className="text-sm text-gray-600">Chat with your patients</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
                className={`w-full p-4 flex items-center gap-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedPatientId === patient.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-500 truncate">{patient.diagnosis}</p>
                </div>
                {patient.id === '1' && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          {selectedPatient && (
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedPatient.name}</p>
                <p className="text-sm text-gray-500">{selectedPatient.diagnosis}</p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentMessages.length > 0 ? (
              currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'patient' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-md ${
                      message.sender === 'doctor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    } rounded-lg p-3`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.sender === 'doctor' && (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-semibold text-xs">EA</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No messages yet. Start a conversation!</p>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <button
                type="button"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Attach image"
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Attach document"
              >
                <FileText className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • Secure medical communication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
