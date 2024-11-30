import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';
import WithdrawEarningsModal from '../components/WithdrawEarningsModal';

function DoctorDashboard() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(1200);

  const stats = [
    { label: 'Total Consultations', value: '156', icon: Users },
    { label: 'Total Earnings', value: '$15,600', icon: DollarSign },
    { label: 'This Month', value: '$2,400', icon: TrendingUp },
    { label: 'Available Balance', value: `$${availableBalance}`, icon: DollarSign }
  ];

  const handleWithdraw = (amount: number) => {
    setAvailableBalance(prev => prev - amount);
    // Here you would typically make an API call to process the withdrawal
  };

  const upcomingConsultations = [
    {
      id: 1,
      patientName: "John Smith",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "Follow-up"
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      date: "2024-03-25",
      time: "2:30 PM",
      type: "Initial Consultation"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <button 
          onClick={() => setShowWithdrawModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Withdraw Earnings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Today's Consultations</h2>
          <Calendar className="h-5 w-5 text-gray-500" />
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingConsultations.map((consultation) => (
            <div key={consultation.id} className="py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{consultation.patientName}</h3>
                <p className="text-sm text-gray-500">{consultation.type}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{consultation.time}</p>
                <p className="text-sm text-gray-500">{consultation.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showWithdrawModal && (
        <WithdrawEarningsModal
          onClose={() => setShowWithdrawModal(false)}
          onWithdraw={handleWithdraw}
          availableBalance={availableBalance}
          bankAccount={{
            accountHolder: "Dr. Sarah Johnson",
            accountNumber: "1234567890",
            bankName: "Chase Bank",
            routingNumber: "987654321"
          }}
        />
      )}
    </div>
  );
}

export default DoctorDashboard;