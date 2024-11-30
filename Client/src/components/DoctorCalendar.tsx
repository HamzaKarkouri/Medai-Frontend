import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Plus } from 'lucide-react';
import AddTimeSlotModal from './AddTimeSlotModal';
import { TimeSlot } from '../types/calendar';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': enUS
  }
});

function DoctorCalendar() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [events, setEvents] = useState<TimeSlot[]>([]);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedSlot(start);
    setShowAddModal(true);
  };

  const handleAddTimeSlot = (newSlot: TimeSlot) => {
    setEvents([...events, newSlot]);
    setShowAddModal(false);
    setSelectedSlot(null);
  };

  const eventStyleGetter = (event: TimeSlot) => {
    return {
      style: {
        backgroundColor: '#3B82F6',
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  return (
    <div className="h-[600px] bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Availability Calendar</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Time Slot</span>
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        className="rounded-lg"
        views={['month', 'week', 'day']}
        defaultView="week"
        min={new Date(0, 0, 0, 8, 0, 0)} // 8 AM
        max={new Date(0, 0, 0, 20, 0, 0)} // 8 PM
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={event => `Session: ${event.sessionDuration}min, Break: ${event.breakDuration}min`}
      />

      {showAddModal && (
        <AddTimeSlotModal
          onClose={() => {
            setShowAddModal(false);
            setSelectedSlot(null);
          }}
          onSave={handleAddTimeSlot}
          initialDate={selectedSlot}
        />
      )}
    </div>
  );
}

export default DoctorCalendar;