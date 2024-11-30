import React from 'react';
import DoctorCalendar from '../components/DoctorCalendar';

function DoctorAvailability() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Availability</h1>
      </div>
      <DoctorCalendar />
    </div>
  );
}

export default DoctorAvailability;