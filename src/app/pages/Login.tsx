import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Heart, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4"
      style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFF5F5 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
          {/* Top Banner */}
          <div className="h-2" style={{ background: 'linear-gradient(90deg, #E53935, #1E3A8A)' }} />

          <div className="p-8">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow"
                  style={{ backgroundColor: '#E53935' }}
                >
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 leading-none">LifeLink</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: '#1E3A8A' }}>TechX</div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h1>
              <p className="text-gray-500 text-sm mt-1">Login to access your emergency dashboard</p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5"
              >
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-red-600 text-sm">{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm placeholder:text-gray-400"
                    style={{ '--tw-ring-color': '#E53935' } as any}
                    onFocus={(e) => e.target.style.borderColor = '#E53935'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:outline-none transition-all text-sm placeholder:text-gray-400"
                    onFocus={(e) => e.target.style.borderColor = '#E53935'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button type="button" className="text-sm font-medium" style={{ color: '#E53935' }}>
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#E53935', boxShadow: '0 4px 15px rgba(229,57,53,0.3)' }}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login to LifeLink'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold hover:underline" style={{ color: '#1E3A8A' }}>
                Create Account
              </Link>
            </p>

            {/* Demo hint */}
            <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs text-center text-blue-600">
                <span className="font-semibold">Demo:</span> Enter any email & password to login
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
