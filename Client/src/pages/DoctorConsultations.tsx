import React, { useState } from 'react';
import { Calendar, Clock, FileText, Video, Edit } from 'lucide-react';
import ConsultationReport from '../components/ConsultationReport';

function DoctorConsultations() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const upcomingConsultations = [
    {
      id: 1,
      patient: "John Smith",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "Follow-up",
      status: "scheduled",
      patientHistory: "Previous visit for hypertension management"
    },
    {
      id: 2,
      patient: "Sarah Johnson",
      date: "2024-03-25",
      time: "2:30 PM",
      type: "Initial Consultation",
      status: "confirmed",
      patientHistory: "First visit - complaining of recurring headaches"
    }
  ];

  const pastConsultations = [
    {
      id: 3,
      patient: "Michael Brown",
      date: "2024-03-20",
      time: "11:00 AM",
      type: "Follow-up",
      diagnosis: "Hypertension",
      prescription: ["Lisinopril 10mg", "Daily blood pressure monitoring"],
      notes: "Patient showing improvement in blood pressure control. Continue current medication.",
      patientHistory: "Hypertension diagnosed 6 months ago"
    },
    {
      id: 4,
      patient: "Emily Davis",
      date: "2024-03-18",
      time: "3:00 PM",
      type: "Initial Consultation",
      diagnosis: "Migraine",
      prescription: ["Sumatriptan 50mg", "Preventive lifestyle changes"],
      notes: "First episode of migraine. Discussed triggers and preventive measures.",
      patientHistory: "No previous history of migraines"
    }
  ];

  const handleEditReport = (consultation: any) => {
    setSelectedConsultation(consultation);
    setIsEditing(true);
  };

  const handleSaveReport = (updatedReport: any) => {
    // Here you would typically update the backend
    console.log('Saving updated report:', updatedReport);
    setIsEditing(false);
    setSelectedConsultation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Doctor Consultations</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upcoming Consultations
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Past Consultations
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          upcomingConsultations.map((consultation) => (
            <div key={consultation.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{consultation.patient}</h3>
                  <p className="text-blue-600">{consultation.type}</p>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{consultation.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{consultation.time}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{consultation.patientHistory}</p>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Video className="h-5 w-5" />
                  <span>Start Consultation</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          pastConsultations.map((consultation) => (
            <div key={consultation.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{consultation.patient}</h3>
                  <p className="text-blue-600">{consultation.type}</p>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{consultation.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{consultation.time}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{consultation.patientHistory}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditReport(consultation)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Edit className="h-5 w-5" />
                    <span>Edit Report</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedConsultation(consultation);
                      setIsEditing(false);
                    }}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                    <FileText className="h-5 w-5" />
                    <span>View Report</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedConsultation && (
        <ConsultationReport
          consultation={selectedConsultation}
          onClose={() => {
            setSelectedConsultation(null);
            setIsEditing(false);
          }}
          isEditing={isEditing}
          onSave={handleSaveReport}
        />
      )}
    </div>
  );
}

export default DoctorConsultations;