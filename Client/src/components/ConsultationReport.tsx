import React, { useState } from 'react';
import { X, Download, Save } from 'lucide-react';

interface ConsultationReportProps {
  consultation: {
    doctor?: string;
    patient?: string;
    date: string;
    diagnosis: string;
    prescription: string[];
    notes: string;
    patientHistory?: string;
  };
  onClose: () => void;
  isEditing?: boolean;
  onSave?: (updatedReport: any) => void;
}

function ConsultationReport({ consultation, onClose, isEditing = false, onSave }: ConsultationReportProps) {
  const [editedReport, setEditedReport] = useState({
    diagnosis: consultation.diagnosis || '',
    prescription: consultation.prescription || [],
    notes: consultation.notes || ''
  });

  const [newPrescription, setNewPrescription] = useState('');

  const handleSave = () => {
    onSave?.({
      ...consultation,
      ...editedReport
    });
  };

  const addPrescription = () => {
    if (newPrescription.trim()) {
      setEditedReport(prev => ({
        ...prev,
        prescription: [...prev.prescription, newPrescription.trim()]
      }));
      setNewPrescription('');
    }
  };

  const removePrescription = (index: number) => {
    setEditedReport(prev => ({
      ...prev,
      prescription: prev.prescription.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Consultation Report' : 'Consultation Report'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Consultation Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {consultation.doctor && (
                <p className="text-gray-600">Doctor: {consultation.doctor}</p>
              )}
              {consultation.patient && (
                <p className="text-gray-600">Patient: {consultation.patient}</p>
              )}
              <p className="text-gray-600">Date: {consultation.date}</p>
              {consultation.patientHistory && (
                <p className="text-gray-600 mt-2">
                  Patient History: {consultation.patientHistory}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Diagnosis</h3>
            {isEditing ? (
              <textarea
                value={editedReport.diagnosis}
                onChange={(e) => setEditedReport(prev => ({
                  ...prev,
                  diagnosis: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            ) : (
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {consultation.diagnosis}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Prescription</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newPrescription}
                      onChange={(e) => setNewPrescription(e.target.value)}
                      placeholder="Add new medication"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={addPrescription}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {editedReport.prescription.map((med, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{med}</span>
                        <button
                          onClick={() => removePrescription(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="list-disc list-inside space-y-2">
                  {consultation.prescription.map((med, index) => (
                    <li key={index} className="text-gray-600">{med}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Doctor's Notes</h3>
            {isEditing ? (
              <textarea
                value={editedReport.notes}
                onChange={(e) => setEditedReport(prev => ({
                  ...prev,
                  notes: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            ) : (
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {consultation.notes}
              </p>
            )}
          </div>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Report</span>
            </button>
          ) : (
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Download Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConsultationReport;