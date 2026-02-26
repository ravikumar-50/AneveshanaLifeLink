import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Menu, X, Heart, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Emergency', path: '/emergency' },
    { label: 'Help Guides', path: '/help-guides' },
    { label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header
      style={{ backgroundColor: '#1E3A8A' }}
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              style={{ backgroundColor: '#E53935' }}
              className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md"
            >
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-base tracking-tight">LifeLink</span>
              <span className="text-blue-300 text-[10px] font-medium tracking-widest uppercase">TechX</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-white/20'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#E53935' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#E53935' }}
              >
                Get Started Free
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-white bg-white/20'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 text-sm font-medium text-center text-white bg-white/10 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-3 text-sm font-semibold text-white rounded-lg"
                      style={{ backgroundColor: '#E53935' }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-sm font-semibold text-white text-center rounded-lg shadow-md"
                    style={{ backgroundColor: '#E53935' }}
                  >
                    Get Started Free
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
