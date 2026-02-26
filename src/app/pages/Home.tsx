import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Zap, MapPin, Stethoscope, Truck,
  Phone, ChevronRight, Shield, Users, Clock, Star,
  ArrowRight, AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const HERO_BG = 'https://images.unsplash.com/photo-1686797366685-6420f4bd9c2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGFtYnVsYW5jZSUyMGVtZXJnZW5jeSUyMGhlYWx0aGNhcmUlMjBJbmRpYXxlbnwxfHx8fDE3NzIwMjc2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080';

const features = [
  {
    icon: Zap,
    title: 'One-Tap Emergency Alert',
    desc: 'Send an instant SOS to emergency services, nearby doctors, and volunteers with a single tap.',
    color: '#E53935',
    bg: '#FFF5F5',
  },
  {
    icon: MapPin,
    title: 'GPS Location Detection',
    desc: 'Automatically shares your precise location with responders so help reaches you faster.',
    color: '#1E3A8A',
    bg: '#EFF6FF',
  },
  {
    icon: Stethoscope,
    title: 'Instant Doctor Connection',
    desc: 'Get connected to a licensed doctor within minutes for immediate medical guidance.',
    color: '#059669',
    bg: '#F0FDF4',
  },
  {
    icon: Truck,
    title: 'Fast Transport Coordination',
    desc: 'Coordinates with the nearest ambulance service for rapid and safe transportation.',
    color: '#D97706',
    bg: '#FFFBEB',
  },
];

const emergencyContacts = [
  { label: 'Ambulance', number: '108', icon: Truck, color: '#E53935' },
  { label: 'Emergency', number: '112', icon: AlertCircle, color: '#D97706' },
  { label: 'Local Doctor', number: '+91 9000000000', icon: Stethoscope, color: '#059669' },
  { label: 'Volunteer', number: '+91 9000011111', icon: Users, color: '#1E3A8A' },
];

const stats = [
  { value: '10,000+', label: 'Lives Assisted', icon: Users },
  { value: '< 8 min', label: 'Avg Response Time', icon: Clock },
  { value: '500+', label: 'Villages Covered', icon: MapPin },
  { value: '4.9★', label: 'User Rating', icon: Star },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.92) 0%, rgba(229,57,53,0.75) 100%)' }}
        />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/5 blur-xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-white/5 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm font-medium">Trusted Emergency Platform for Rural India</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Instant Emergency Help for{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FCA5A5, #FCD34D)' }}>
                Rural India
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl"
            >
              One-tap connection to doctors, ambulance, and local support. Saving lives across villages with technology built for everyone.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* SOS Button */}
              <Link
                to="/emergency"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-red-500/40"
                style={{ backgroundColor: '#E53935', boxShadow: '0 8px 30px rgba(229,57,53,0.5)' }}
              >
                <span className="absolute inset-0 rounded-xl animate-ping bg-red-500 opacity-20" />
                <Zap className="w-6 h-6 fill-white" />
                SOS Emergency
              </Link>

              {/* Get Started */}
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg border-2 border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Quick stat pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              {['Available 24/7', '500+ Villages', 'Free Service', 'Govt. Approved'].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white text-xs font-medium"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
              style={{ backgroundColor: '#FFF5F5', color: '#E53935' }}
            >
              <Zap className="w-4 h-4" />
              Core Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1E3A8A' }}>
              Everything You Need in an Emergency
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              LifeLink brings together the tools and connections that save lives — designed for simplicity in the most critical moments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-gray-100 bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: feature.bg }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                <div
                  className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: feature.color }}
                >
                  Learn more <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
              style={{ backgroundColor: '#EFF6FF', color: '#1E3A8A' }}
            >
              <Phone className="w-4 h-4" />
              Emergency Contacts
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1E3A8A' }}>
              One Call Away from Help
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Verified emergency contacts available 24/7. Never search for a number in a crisis again.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {emergencyContacts.map((contact, i) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: contact.color + '15' }}
                >
                  <contact.icon className="w-7 h-7" style={{ color: contact.color }} />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-1">{contact.label}</h3>
                <p className="text-gray-500 text-sm mb-4 font-medium">{contact.number}</p>
                <a
                  href={`tel:${contact.number}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-md"
                  style={{ backgroundColor: contact.color }}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1E3A8A' }}>
              How LifeLink Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">Simple steps designed for everyone, even with limited tech experience.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-red-200 via-blue-200 to-green-200" />

            {[
              { step: '01', title: 'Register & Setup', desc: 'Create your profile with name, location and emergency contacts in under 2 minutes.', color: '#E53935' },
              { step: '02', title: 'Tap SOS Button', desc: 'Press the large SOS button. Your location is instantly shared with all emergency services.', color: '#1E3A8A' },
              { step: '03', title: 'Help Arrives', desc: 'Ambulance dispatched, doctor connected, volunteers alerted — all simultaneously.', color: '#059669' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #E53935 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Keep Your Family Safe?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of rural families across India who trust LifeLink for their emergency needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105 shadow-xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)' }}
              >
                Create Free Account
              </Link>
              <Link
                to="/emergency"
                className="px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105 shadow-xl"
                style={{ backgroundColor: '#E53935', boxShadow: '0 8px 24px rgba(229,57,53,0.4)' }}
              >
                Try SOS Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
