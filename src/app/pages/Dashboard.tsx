import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  MapPin, Zap, Stethoscope, BookOpen, User,
  Phone, AlertCircle, Truck, Users, Clock,
  CheckCircle, Activity, Bell, ChevronRight, Video
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [locationStatus, setLocationStatus] = useState<'idle' | 'detecting' | 'found'>('idle');
  const [location, setLocation] = useState('Tap to detect your location');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
    const h = new Date().getHours();
    if (h < 12) setTimeOfDay('Good Morning');
    else if (h < 17) setTimeOfDay('Good Afternoon');
    else setTimeOfDay('Good Evening');
  }, [isLoggedIn]);

  const detectLocation = () => {
    setLocationStatus('detecting');
    setLocation('Detecting your location...');
    setTimeout(() => {
      setLocationStatus('found');
      setLocation(user?.location || 'Tadepalligudem, Andhra Pradesh');
    }, 2500);
  };

  const quickActions = [
    { label: 'Help Guides', icon: BookOpen, path: '/help-guides', color: '#059669', bg: '#F0FDF4', desc: 'Learn first aid' },
    { label: 'Video Call', icon: Video, path: '/video-call', color: '#7C3AED', bg: '#F5F3FF', desc: 'Connect to doctor' },
    { label: 'My Profile', icon: User, path: '/profile', color: '#1E3A8A', bg: '#EFF6FF', desc: 'Manage account' },
  ];

  const emergencyContacts = [
    { label: 'Ambulance', number: '108', icon: Truck, color: '#E53935' },
    { label: 'Emergency', number: '112', icon: AlertCircle, color: '#D97706' },
    { label: 'Local Doctor', number: '+91 9000000000', icon: Stethoscope, color: '#059669' },
    { label: 'Volunteer', number: '+91 9000011111', icon: Users, color: '#1E3A8A' },
  ];

  const recentActivity = [
    { text: 'Location verified successfully', time: '2 hours ago', icon: CheckCircle, color: '#059669' },
    { text: 'Emergency contact updated', time: 'Yesterday', icon: User, color: '#1E3A8A' },
    { text: 'Help guide: CPR completed', time: '3 days ago', icon: BookOpen, color: '#D97706' },
  ];

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden mb-8 relative"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #E53935 100%)' }}
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white/5 translate-y-1/2" />

          <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 text-xs font-medium uppercase tracking-wider">System Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {timeOfDay}, {user?.name?.split(' ')[0] || 'User'} 👋
              </h1>
              <p className="text-blue-100 text-sm">
                Your LifeLink dashboard is active and monitoring. Stay safe!
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/emergency"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold shadow-xl transition-all hover:scale-105 hover:shadow-red-500/40"
                style={{ backgroundColor: '#E53935', boxShadow: '0 8px 24px rgba(229,57,53,0.4)' }}
              >
                <Zap className="w-5 h-5 fill-white" />
                SOS Emergency
              </Link>
            </div>
          </div>

          {/* Health Status Bar */}
          <div className="relative bg-black/20 px-6 sm:px-8 py-3 flex flex-wrap gap-4">
            {[
              { label: 'Response Ready', icon: Activity, color: 'text-green-300' },
              { label: 'GPS Active', icon: MapPin, color: 'text-blue-300' },
              { label: 'Contacts Synced', icon: Phone, color: 'text-yellow-300' },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-1.5 text-xs font-medium ${item.color}`}>
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Large SOS Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: '#E53935' }} />
                Quick Emergency Action
              </h2>
              <Link
                to="/emergency"
                className="relative group block w-full text-center py-6 rounded-2xl text-white font-bold text-xl transition-all hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: '#E53935',
                  boxShadow: '0 8px 30px rgba(229,57,53,0.35)',
                }}
              >
                <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-300" />
                <div className="flex items-center justify-center gap-3">
                  <div className="relative">
                    <span className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                    <Zap className="w-8 h-8 fill-white relative z-10" />
                  </div>
                  <span>TAP FOR SOS EMERGENCY</span>
                </div>
                <p className="text-red-100 text-sm font-normal mt-1">Instantly connect to doctor, ambulance & volunteers</p>
              </Link>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ color: '#1E3A8A' }} />
                  Your Location
                </h2>
                {locationStatus === 'found' && (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>

              <div
                className="flex items-center gap-4 p-4 rounded-xl mb-4"
                style={{ backgroundColor: '#F0F7FF' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#1E3A8A' }}
                >
                  {locationStatus === 'detecting' ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <MapPin className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Current Location</p>
                  <p className="font-semibold text-gray-900 text-sm">{location}</p>
                  {locationStatus === 'found' && (
                    <p className="text-xs text-green-600 mt-0.5">Location detected and shared with emergency services</p>
                  )}
                </div>
              </div>

              <button
                onClick={detectLocation}
                disabled={locationStatus === 'detecting'}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#1E3A8A' }}
              >
                {locationStatus === 'detecting' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    Detect My Location
                  </>
                )}
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="font-bold text-gray-900 text-lg mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.path}
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: action.bg }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: action.color + '20' }}
                    >
                      <action.icon className="w-6 h-6" style={{ color: action.color }} />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
                      <p className="text-gray-500 text-xs">{action.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" style={{ color: '#E53935' }} />
                Emergency Contacts
              </h2>
              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={`tel:${contact.number}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: contact.color + '15' }}
                    >
                      <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">{contact.label}</p>
                      <p className="text-gray-500 text-xs truncate">{contact.number}</p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: contact.color }}
                    >
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-500" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: item.color + '15' }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{item.text}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
