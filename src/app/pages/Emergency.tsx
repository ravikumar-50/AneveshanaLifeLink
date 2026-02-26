import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  Zap, MapPin, Phone, X, CheckCircle, Clock,
  Stethoscope, Truck, Users, AlertTriangle, ArrowLeft, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type SOSState = 'idle' | 'activating' | 'connecting' | 'doctor_connected' | 'ambulance_dispatched' | 'help_on_way';

export function Emergency() {
  const [sosState, setSOSState] = useState<SOSState>('idle');
  const [timer, setTimer] = useState(0);
  const [ambulanceMinutes, setAmbulanceMinutes] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<any>(null);
  const progressRef = useRef<any>(null);

  const startSOS = () => {
    setSOSState('activating');
    setShowModal(true);
    setProgress(0);

    // Progress animation
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressRef.current);
          return 100;
        }
        return p + 2;
      });
    }, 60);

    setTimeout(() => setSOSState('connecting'), 1500);
    setTimeout(() => setSOSState('doctor_connected'), 4000);
    setTimeout(() => setSOSState('ambulance_dispatched'), 6500);
    setTimeout(() => {
      setSOSState('help_on_way');
      // Start ambulance countdown
      intervalRef.current = setInterval(() => {
        setAmbulanceMinutes((m) => {
          if (m <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return m - 1;
        });
      }, 10000);
    }, 9000);
  };

  // Timer when SOS is active
  useEffect(() => {
    let timerInterval: any;
    if (sosState !== 'idle') {
      timerInterval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(timerInterval);
  }, [sosState]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, []);

  const cancelSOS = () => {
    setSOSState('idle');
    setShowModal(false);
    setTimer(0);
    setProgress(0);
    setAmbulanceMinutes(8);
    clearInterval(intervalRef.current);
    clearInterval(progressRef.current);
  };

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const statusMessages: Record<SOSState, { text: string; sub: string; color: string }> = {
    idle: { text: 'Press SOS for Emergency', sub: 'One tap sends your location to all emergency services', color: '#6B7280' },
    activating: { text: 'Activating Emergency Alert...', sub: 'Sharing your GPS location with responders', color: '#D97706' },
    connecting: { text: 'Connecting to Nearest Doctor...', sub: 'Finding available medical professional near you', color: '#2563EB' },
    doctor_connected: { text: '✓ Doctor Connected!', sub: 'Dr. Priya Sharma is available — stay on line', color: '#059669' },
    ambulance_dispatched: { text: 'Ambulance Dispatched', sub: 'Vehicle en route to your location', color: '#1E3A8A' },
    help_on_way: { text: '🚨 Help Is On The Way!', sub: `Ambulance arriving in ~${ambulanceMinutes} minutes`, color: '#E53935' },
  };

  const emergencyContacts = [
    { label: 'Ambulance', number: '108', icon: Truck, color: '#E53935' },
    { label: 'Emergency', number: '112', icon: AlertTriangle, color: '#D97706' },
    { label: 'Local Doctor', number: '+91 9000000000', icon: Stethoscope, color: '#059669' },
    { label: 'Volunteer', number: '+91 9000011111', icon: Users, color: '#1E3A8A' },
  ];

  const isActive = sosState !== 'idle';

  return (
    <div
      className="min-h-screen transition-all duration-700"
      style={{
        backgroundColor: isActive ? '#FFF5F5' : '#F8FAFC',
        backgroundImage: isActive
          ? 'radial-gradient(circle at 50% 0%, rgba(229,57,53,0.08) 0%, transparent 60%)'
          : 'none',
      }}
    >
      {/* Alert Banner when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{ backgroundColor: '#E53935' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white text-sm">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-semibold">EMERGENCY ACTIVE</span>
                <span className="text-red-200">— Timer: {formatTime(timer)}</span>
              </div>
              <button onClick={cancelSOS} className="text-white text-xs font-medium underline hover:no-underline">
                Cancel Emergency
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back nav */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Page Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ backgroundColor: isActive ? '#FEE2E2' : '#F8FAFC', color: '#E53935', border: '1px solid #FECACA' }}
          >
            <AlertTriangle className="w-4 h-4" />
            Emergency Response Center
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#1E3A8A' }}>
            SOS Emergency
          </h1>
          <p className="text-gray-500 text-base">
            In case of emergency, press the button below for instant help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: SOS Panel */}
          <div className="space-y-6">
            {/* Main SOS Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-100"
              style={{ boxShadow: isActive ? '0 0 40px rgba(229,57,53,0.15)' : '0 4px 20px rgba(0,0,0,0.08)' }}
            >
              {/* Status */}
              <div className="mb-6">
                <div
                  className="text-lg font-bold mb-1 transition-colors duration-500"
                  style={{ color: statusMessages[sosState].color }}
                >
                  {statusMessages[sosState].text}
                </div>
                <p className="text-gray-500 text-sm">{statusMessages[sosState].sub}</p>
              </div>

              {/* SOS Button */}
              <div className="relative flex items-center justify-center mb-6">
                {/* Pulse rings */}
                {isActive && (
                  <>
                    <span
                      className="absolute w-48 h-48 rounded-full border-2 border-red-300 animate-ping opacity-30"
                      style={{ animationDuration: '1.5s' }}
                    />
                    <span
                      className="absolute w-56 h-56 rounded-full border border-red-200 animate-ping opacity-20"
                      style={{ animationDuration: '2s', animationDelay: '0.5s' }}
                    />
                  </>
                )}
                <motion.button
                  onClick={!isActive ? startSOS : undefined}
                  whileHover={!isActive ? { scale: 1.05 } : {}}
                  whileTap={!isActive ? { scale: 0.97 } : {}}
                  disabled={isActive}
                  className="relative w-40 h-40 rounded-full text-white font-bold text-2xl shadow-2xl transition-all flex flex-col items-center justify-center gap-2 z-10"
                  style={{
                    backgroundColor: '#E53935',
                    boxShadow: isActive
                      ? '0 0 0 8px rgba(229,57,53,0.2), 0 0 0 16px rgba(229,57,53,0.1), 0 16px 50px rgba(229,57,53,0.5)'
                      : '0 8px 40px rgba(229,57,53,0.5)',
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <Zap className="w-10 h-10 fill-white" />
                  <span className="text-lg font-black tracking-wider">SOS</span>
                </motion.button>
              </div>

              {/* Progress bar */}
              {isActive && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Emergency Response Progress</span>
                    <span>{Math.min(100, Math.round(progress))}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: '#E53935', width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Status Steps */}
              <div className="space-y-2.5 text-left">
                {[
                  { key: ['activating', 'connecting', 'doctor_connected', 'ambulance_dispatched', 'help_on_way'], label: 'Alert Sent', icon: Zap },
                  { key: ['connecting', 'doctor_connected', 'ambulance_dispatched', 'help_on_way'], label: 'Connecting Doctor', icon: Stethoscope },
                  { key: ['doctor_connected', 'ambulance_dispatched', 'help_on_way'], label: 'Doctor Connected', icon: CheckCircle },
                  { key: ['ambulance_dispatched', 'help_on_way'], label: 'Ambulance Dispatched', icon: Truck },
                  { key: ['help_on_way'], label: 'Help On the Way', icon: CheckCircle },
                ].map((step) => {
                  const isDone = step.key.includes(sosState);
                  const isCurrentLoading = step.key[0] === sosState && !isDone;
                  return (
                    <div
                      key={step.label}
                      className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${isDone ? 'bg-green-50' : 'bg-gray-50'}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-green-500' : 'bg-gray-200'}`}
                      >
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <step.icon className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isDone ? 'text-green-700' : 'text-gray-400'}`}>
                        {step.label}
                      </span>
                      {!isDone && isActive && step.key[0] === (
                        ['connecting', 'activating', 'doctor_connected', 'ambulance_dispatched'].find(s => s === sosState)
                      ) && (
                        <span className="ml-auto w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Doctor Connected Card + Video Call */}
              {(sosState === 'doctor_connected' || sosState === 'ambulance_dispatched' || sosState === 'help_on_way') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl overflow-hidden border border-green-200"
                  style={{ backgroundColor: '#F0FDF4' }}
                >
                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 p-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg shadow-md"
                      style={{ backgroundColor: '#059669' }}
                    >
                      P
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">Dr. Priya Sharma</p>
                      <p className="text-gray-500 text-xs">General Physician · Tadepalligudem PHC</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-600 text-xs font-medium">Connected & Available</span>
                      </div>
                    </div>
                  </div>
                  {/* Video Call CTA */}
                  <Link
                    to="/video-call"
                    className="flex items-center justify-center gap-2 mx-4 mb-4 py-3 rounded-xl text-white font-bold text-sm shadow-lg transition-all hover:scale-[1.02] relative overflow-hidden"
                    style={{ backgroundColor: '#059669', boxShadow: '0 6px 20px rgba(5,150,105,0.4)' }}
                  >
                    <span className="absolute inset-0 bg-white/10 rounded-xl animate-pulse opacity-30" />
                    <Video className="w-4 h-4 fill-white" />
                    Start Video Call with Doctor
                  </Link>
                </motion.div>
              )}

              {isActive && (
                <button
                  onClick={cancelSOS}
                  className="mt-5 flex items-center gap-2 mx-auto px-5 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel Emergency
                </button>
              )}
            </motion.div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#1E3A8A' }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Your Location</p>
                  <p className="font-semibold text-gray-900 text-sm">Tadepalligudem, Andhra Pradesh</p>
                  <p className="text-xs text-green-600">GPS Active — 17.0329° N, 81.5228° E</p>
                </div>
                <div className="ml-auto">
                  <span className="flex items-center gap-1 text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map + Contacts */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-64" style={{ backgroundColor: '#E8F0FE' }}>
                {/* Fake map background */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, rgba(30,58,138,0.05) 0px, transparent 1px, transparent 40px),
                    repeating-linear-gradient(90deg, rgba(30,58,138,0.05) 0px, transparent 1px, transparent 40px)`,
                }} />

                {/* Roads */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/50 -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/50 -translate-x-1/2" />
                <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-white/30 -rotate-12 origin-left" />

                {/* Map center pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-xl" style={{ backgroundColor: '#E53935' }}>
                      <span className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    {isActive && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />}
                    <div className="w-0.5 h-3 bg-red-500" />
                    <div className="w-2 h-1 bg-red-400 rounded-full" />
                  </div>
                </div>

                {/* Ambulance indicator when dispatched */}
                {(sosState === 'ambulance_dispatched' || sosState === 'help_on_way') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-1/4 left-1/4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#1E3A8A', border: '2px solid white' }}>
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Overlay label */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                  <p className="text-xs font-semibold text-gray-700">Tadepalligudem, AP</p>
                  <p className="text-xs text-gray-400">Emergency services map</p>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-gray-600 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  Live Location
                </div>
              </div>

              {/* Ambulance ETA */}
              <div
                className="p-4 flex items-center gap-4"
                style={{ backgroundColor: isActive && sosState === 'help_on_way' ? '#FFF5F5' : 'white' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FEE2E2' }}
                >
                  <Truck className="w-6 h-6" style={{ color: '#E53935' }} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">
                    {sosState === 'help_on_way' || sosState === 'ambulance_dispatched'
                      ? `Ambulance ETA: ~${ambulanceMinutes} minutes`
                      : 'Ambulance service on standby'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {sosState === 'help_on_way'
                      ? 'Vehicle: AP-39-AA-1234 | Driver: Suresh Kumar'
                      : 'Will be dispatched when SOS is activated'}
                  </p>
                </div>
                {(sosState === 'help_on_way') && (
                  <div className="text-center">
                    <div className="text-2xl font-black" style={{ color: '#E53935' }}>{ambulanceMinutes}</div>
                    <div className="text-xs text-gray-500">min</div>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Emergency Contacts */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: '#E53935' }} />
                Direct Emergency Calls
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {emergencyContacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={`tel:${contact.number}`}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 text-center hover:shadow-md transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: contact.color + '15' }}
                    >
                      <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-xs">{contact.label}</p>
                      <p style={{ color: contact.color }} className="text-xs font-bold">{contact.number}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOS Activated Modal */}
      <AnimatePresence>
        {showModal && sosState === 'activating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="relative w-20 h-20 mx-auto mb-5">
                <span className="absolute inset-0 rounded-full bg-red-200 animate-ping" />
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E53935' }}>
                  <Zap className="w-10 h-10 text-white fill-white" />
                </div>
              </div>
              <h2 className="text-2xl font-black mb-2" style={{ color: '#E53935' }}>SOS Activated!</h2>
              <p className="text-gray-600 text-sm mb-4">Your emergency alert has been sent. Help is being coordinated for you.</p>
              <div className="flex items-center gap-2 justify-center text-sm text-gray-500">
                <span className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
                Connecting to emergency services...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help On The Way Banner */}
      <AnimatePresence>
        {sosState === 'help_on_way' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-lg"
          >
            <div
              className="rounded-2xl p-4 shadow-2xl flex items-center gap-4"
              style={{ backgroundColor: '#059669' }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold">Help Is On The Way!</p>
                <p className="text-green-100 text-xs">Doctor connected • Ambulance dispatched • Volunteers alerted</p>
              </div>
              <div className="text-center text-white">
                <div className="text-xl font-black">{ambulanceMinutes}m</div>
                <div className="text-xs opacity-75">ETA</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}