import React from 'react';
import { Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  nextAvailable: string;
  price: number;
}

function DoctorCard({ name, specialty, rating, reviews, image, nextAvailable, price }: DoctorCardProps) {
  return (
    <Link to="/doctor/1" className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
        <div className="flex items-start space-x-4">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-blue-600 font-medium">{specialty}</p>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-gray-700">{rating}</span>
              <span className="text-gray-400">({reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{nextAvailable}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-900">
              <DollarSign className="h-4 w-4" />
              <span className="font-semibold">{price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DoctorCard;