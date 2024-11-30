import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';

interface ProfileMenuProps {
  onClose: () => void;
}

function ProfileMenu({ onClose }: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
    >
      <Link 
        to="/profile" 
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        <User className="h-4 w-4" />
        <span>Profile</span>
      </Link>
      <Link 
        to="/settings" 
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Link>
      <button 
        onClick={handleLogout}
        className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default ProfileMenu;