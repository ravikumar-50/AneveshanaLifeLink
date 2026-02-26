import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Heart, Mail, Lock, User, Phone, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (form.phone.length < 10) errs.phone = 'Enter a valid phone number';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    register(form.name, form.email, form.phone, form.password);
    navigate('/dashboard');
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  };

  const InputField = ({
    label, name, type, placeholder, icon: Icon, value
  }: {
    label: string; name: string; type: string; placeholder: string; icon: any; value: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type={name === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-11 ${name === 'password' ? 'pr-12' : 'pr-4'} py-3 border rounded-xl text-gray-900 bg-gray-50 focus:outline-none transition-all text-sm placeholder:text-gray-400 ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
          onFocus={(e) => !errors[name] && (e.target.style.borderColor = '#E53935')}
          onBlur={(e) => !errors[name] && (e.target.style.borderColor = '#E5E7EB')}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full" />
          {errors[name]}
        </p>
      )}
    </div>
  );

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
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
          <div className="h-2" style={{ background: 'linear-gradient(90deg, #E53935, #1E3A8A)' }} />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow" style={{ backgroundColor: '#E53935' }}>
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 leading-none">LifeLink</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: '#1E3A8A' }}>TechX</div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">Create Account</h1>
              <p className="text-gray-500 text-sm mt-1">Join LifeLink — emergency help is one tap away</p>
            </div>

            {/* Benefits */}
            <div className="flex gap-2 flex-wrap justify-center mb-6">
              {['Free Forever', 'No Ads', 'Secure & Private'].map((b) => (
                <span key={b} className="flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                  <CheckCircle className="w-3 h-3" />
                  {b}
                </span>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField label="Full Name" name="name" type="text" placeholder="Ravi Kumar" icon={User} value={form.name} />
              <InputField label="Email Address" name="email" type="email" placeholder="you@example.com" icon={Mail} value={form.email} />
              <InputField label="Phone Number" name="phone" type="tel" placeholder="+91 9876543210" icon={Phone} value={form.phone} />
              <InputField label="Password" name="password" type="password" placeholder="Create a strong password" icon={Lock} value={form.password} />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                style={{ backgroundColor: '#1E3A8A', boxShadow: '0 4px 15px rgba(30,58,138,0.3)' }}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create My Account'
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">Already have an account?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Link
              to="/login"
              className="block w-full py-3 rounded-xl text-center font-semibold text-sm border-2 transition-all hover:bg-gray-50"
              style={{ color: '#E53935', borderColor: '#E53935' }}
            >
              Login to LifeLink
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
