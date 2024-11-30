import React, { useState } from 'react';
import { Search, MessageCircle, Filter } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import ChatBot from '../components/ChatBot';

function DoctorSearch() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const specialties = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics'];
  const availabilities = ['Today', 'Tomorrow', 'This Week', 'Next Week'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1 max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
            <p className="text-gray-600">Connect with certified healthcare professionals for online consultations</p>
          </div>
          <button
            onClick={() => setShowChatbot(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <MessageCircle className="h-5 w-5" />
            <span>AI Assistant</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search doctors by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <select
              className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">Select Specialty</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          
          <div className="col-span-1">
            <select
              className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="">Availability</option>
              {availabilities.map(availability => (
                <option key={availability} value={availability}>{availability}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DoctorCard
            name="Dr. Sarah Johnson"
            specialty="Cardiology"
            rating={4.8}
            reviews={127}
            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
            nextAvailable="Today, 2:00 PM"
            price={100}
          />
          <DoctorCard
            name="Dr. Michael Chen"
            specialty="Dermatology"
            rating={4.9}
            reviews={203}
            image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
            nextAvailable="Tomorrow, 10:00 AM"
            price={90}
          />
          <DoctorCard
            name="Dr. Emily Williams"
            specialty="Pediatrics"
            rating={4.7}
            reviews={156}
            image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300"
            nextAvailable="Today, 4:30 PM"
            price={85}
          />
        </div>
      </div>

      {showChatbot && (
        <ChatBot onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
}

export default DoctorSearch;