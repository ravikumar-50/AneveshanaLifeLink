import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  User, Mail, Phone, MapPin, Edit3, LogOut,
  Save, X, Shield, CheckCircle, Camera, Heart,
  Bell, Lock, ChevronRight, Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export function Profile() {
  const { user, isLoggedIn, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Ravi Kumar',
    email: user?.email || 'ravi@lifelink.com',
    phone: user?.phone || '+91 9876543210',
    location: user?.location || 'Tadepalligudem, Andhra Pradesh',
  });

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
      });
    }
  }, [user]);

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileFields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Your full name' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'your@email.com' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+91 XXXXXXXXXX' },
    { key: 'location', label: 'Location', icon: MapPin, type: 'text', placeholder: 'City, State' },
  ];

  const statsItems = [
    { label: 'SOS Alerts', value: '0', icon: Activity, color: '#E53935', bg: '#FFF5F5' },
    { label: 'Guides Read', value: '3', icon: Heart, color: '#059669', bg: '#F0FDF4' },
    { label: 'Days Active', value: '7', icon: Shield, color: '#1E3A8A', bg: '#EFF6FF' },
  ];

  const menuItems = [
    { label: 'Notification Settings', icon: Bell, color: '#D97706' },
    { label: 'Privacy & Security', icon: Lock, color: '#1E3A8A' },
    { label: 'Emergency Contacts', icon: Phone, color: '#E53935' },
    { label: 'Help & Support', icon: Heart, color: '#059669' },
  ];

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Saved Toast */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-xl"
          >
            <CheckCircle className="w-4 h-4" />
            Profile updated successfully!
          </motion.div>
        )}

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden mb-6"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)' }}
        >
          <div className="px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white shadow-xl text-3xl font-bold"
                style={{ backgroundColor: '#E53935', boxShadow: '0 8px 24px rgba(229,57,53,0.4)' }}
              >
                {form.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                <Camera className="w-4 h-4" style={{ color: '#1E3A8A' }} />
              </button>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{form.name}</h1>
              <p className="text-blue-200 text-sm mb-1">{form.email}</p>
              <p className="text-blue-200 text-sm flex items-center gap-1 justify-center sm:justify-start">
                <MapPin className="w-3 h-3" />
                {form.location}
              </p>
              <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                <span className="flex items-center gap-1 bg-green-500/20 text-green-300 border border-green-400/30 rounded-full px-3 py-1 text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Active Account
                </span>
                <span className="flex items-center gap-1 bg-white/10 text-blue-200 rounded-full px-3 py-1 text-xs">
                  <Shield className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all bg-white/10 text-white hover:bg-white/20"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-white"
                style={{ backgroundColor: '#E53935' }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-black/20 px-6 sm:px-8 py-4 grid grid-cols-3 divide-x divide-white/10">
            {statsItems.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-blue-200 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <User className="w-5 h-5" style={{ color: '#1E3A8A' }} />
                Personal Information
              </h2>
              {editing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#059669' }}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border"
                  style={{ color: '#1E3A8A', borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' }}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              {profileFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    {field.label}
                  </label>
                  {editing ? (
                    <div className="relative">
                      <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:outline-none text-sm transition-colors"
                        onFocus={(e) => e.target.style.borderColor = '#1E3A8A'}
                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                      <field.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-900 text-sm">{form[field.key as keyof typeof form]}</span>
                      <CheckCircle className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Account Status
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Email Verified', ok: true },
                  { label: 'Phone Verified', ok: true },
                  { label: 'Location Set', ok: true },
                  { label: 'Emergency Contacts', ok: false },
                  { label: '2FA Enabled', ok: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{item.label}</span>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        item.ok ? 'text-green-700 bg-green-50' : 'text-gray-400 bg-gray-50'
                      }`}
                    >
                      {item.ok ? <CheckCircle className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {item.ok ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Settings Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.color + '15' }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-gray-700 text-sm font-medium flex-1">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-red-100"
            >
              <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2 text-sm">
                <LogOut className="w-4 h-4" />
                Account Actions
              </h3>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout from LifeLink
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
