import { Link } from 'react-router';
import { Heart, Phone, Mail, MapPin, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1E3A8A' }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{ backgroundColor: '#E53935' }}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <div className="font-bold text-lg leading-none">LifeLink</div>
                <div className="text-blue-300 text-xs tracking-widest uppercase">TechX</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              Instant emergency medical help for rural India. One tap to connect with doctors, ambulance, and local support.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-medium">Trusted Emergency Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Emergency SOS', path: '/emergency' },
                { label: 'Help Guides', path: '/help-guides' },
                { label: 'Profile', path: '/profile' },
                { label: 'Dashboard', path: '/dashboard' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Emergency Numbers</h4>
            <ul className="space-y-3">
              {[
                { label: 'Ambulance', number: '108' },
                { label: 'Emergency', number: '112' },
                { label: 'Police', number: '100' },
                { label: 'Fire', number: '101' },
              ].map((contact) => (
                <li key={contact.number} className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span className="text-blue-200 text-sm">{contact.label}:</span>
                  <a
                    href={`tel:${contact.number}`}
                    className="text-white font-semibold text-sm hover:text-red-300 transition-colors"
                  >
                    {contact.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-xs">
            © 2026 LifeLink by TechX. All rights reserved. Built for rural India.
          </p>
          <div className="flex items-center gap-1 text-blue-300 text-xs">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>for rural communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
