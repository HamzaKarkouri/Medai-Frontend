import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Search, Layout, MessageSquare, UserCircle, Calendar } from 'lucide-react';
import ProfileMenu from './ProfileMenu';
import image from './medai.png'
function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            {/* <Video className="h-8 w-8 text-blue-600" /> */}
            <img
                src={image}

                className="h-10 w-10 text-blue-600"
            />
            <span className="text-xl font-bold text-gray-900">Medai <span className=" text-blue-600">Care</span></span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/doctors" className="nav-link">
              <Search className="h-5 w-5" />
              <span>Find Doctors</span>
            </Link>
            <Link to="/doctor-consultations" className="nav-link">
              <MessageSquare className="h-5 w-5" />
              <span>Consultations</span>
            </Link>
            <Link to="/doctor-dashboard" className="nav-link">
              <Layout className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/doctor-availability" className="nav-link">
              <Calendar className="h-5 w-5" />
              <span>Availability</span>
            </Link>
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <UserCircle className="h-8 w-8" />
              </button>
              
              {showProfileMenu && (
                <ProfileMenu onClose={() => setShowProfileMenu(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;