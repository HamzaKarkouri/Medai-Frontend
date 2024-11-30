import React, { useState } from 'react';
import { Video, FileText, Clock, Calendar } from 'lucide-react';
import ConsultationReport from '../components/ConsultationReport';

function Consultations() {
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const consultations = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-03-20',
      time: '2:00 PM',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
      diagnosis: 'Atopic Dermatitis',
      prescription: [
        'Topical corticosteroid cream - Apply twice daily',
        'Antihistamine - Take once daily',
        'Moisturizing lotion - Apply after shower'
      ],
      notes: 'Patient shows improvement in skin condition. Continue current treatment plan and schedule follow-up in 2 weeks.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Consultations</h1>
      
      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={consultation.image}
                alt={consultation.doctor}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{consultation.doctor}</h3>
                    <p className="text-blue-600">{consultation.specialty}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    consultation.status === 'upcoming'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {consultation.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{consultation.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{consultation.time}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex space-x-4">
                {consultation.status === 'upcoming' ? (
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Video className="h-5 w-5" />
                    <span>Join Consultation</span>
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => setSelectedConsultation(consultation)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                    >
                      <FileText className="h-5 w-5" />
                      <span>View Report</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      <Calendar className="h-5 w-5" />
                      <span>Schedule Follow-up</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedConsultation && (
        <ConsultationReport
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
        />
      )}
    </div>
  );
}

export default Consultations;