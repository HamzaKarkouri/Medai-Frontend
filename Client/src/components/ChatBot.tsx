import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatBotProps {
  onClose: () => void;
}

function ChatBot({ onClose }: ChatBotProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I can help you find the right doctor. Please describe your symptoms and location.' }
  ]);
  const navigate = useNavigate();

  const suggestDoctors = (symptoms: string) => {
    const suggestions = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        match: 'High match for heart-related symptoms'
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Pulmonology',
        match: 'Recommended for respiratory issues'
      }
    ];

    const response = {
      type: 'bot',
      text: 'Based on your symptoms, I recommend these specialists:',
      suggestions
    };

    setMessages([...messages, { type: 'user', text: message }, response]);
    setMessage('');
  };

  const handleSend = () => {
    if (!message.trim()) return;
    suggestDoctors(message);
  };

  const handleDoctorSelect = (doctorId: number) => {
    navigate(`/doctor/${doctorId}`);
    onClose();
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">AI Health Assistant</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`${msg.type === 'user' ? 'ml-auto bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg p-3 max-w-[80%]`}>
            <p>{msg.text}</p>
            {msg.suggestions && (
              <div className="mt-3 space-y-2">
                {msg.suggestions.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor.id)}
                    className="w-full text-left p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="font-semibold">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <p className="text-sm text-blue-600">{doctor.match}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Describe your symptoms..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;