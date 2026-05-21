import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import FocusTimer from '../components/FocusTimer';

const FocusPage: React.FC = () => {
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(hideTimeout);
  }, [showControls]);

  // Handle mouse movement to show controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className={`absolute top-4 left-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <Link to="/" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          <Clock size={20} />
        </Link>
      </div>
      
      <FocusTimer />
    </div>
  );
};

export default FocusPage;