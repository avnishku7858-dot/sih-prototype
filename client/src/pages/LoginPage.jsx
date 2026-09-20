import React, { useState } from 'react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  X
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onClose, onResetDb, initialStep = 'role' }) {
  const { switchPersona, currentUser } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [step, setStep] = useState(initialStep); // 'role' or 'credentials'
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [email, setEmail] = useState('rahul.mishra@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleResetDemoData = async () => {
    if (window.confirm('Reset demo data to original default state? This will remove all user-created problems, reports, reviews and changes, and restore the original default demo data.')) {
      setResetting(true);
      try {
        if (onResetDb) {
          await onResetDb();
        } else {
          await api.resetSystem();
          alert('Demo data has been restored to default state.');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setResetting(false);
      }
    }
  };

  const roleCards = [
    {
      id: 'citizen',
      title: 'Citizen',
      desc: 'Report local issues and track progress',
      icon: Users,
      color: 'bg-emerald-500 text-white',
      border: 'hover:border-emerald-500'
    },
    {
      id: 'government',
      title: 'Government',
      desc: 'Validate and approve problems',
      icon: Building2,
      color: 'bg-blue-600 text-white',
      border: 'hover:border-blue-500'
    },
    {
      id: 'university',
      title: 'University',
      desc: 'Work on solutions with your team',
      icon: GraduationCap,
      color: 'bg-indigo-600 text-white',
      border: 'hover:border-indigo-500'
    },
    {
      id: 'industry',
      title: 'Industry',
      desc: 'Provide support, mentorship and resources',
      icon: Briefcase,
      color: 'bg-orange-500 text-white',
      border: 'hover:border-orange-500'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const targetPersona = DEMO_PERSONAS.find(p => p.role === roleId);
    if (targetPersona) {
      setEmail(targetPersona.email || `${roleId}@awaazgram.org`);
    }
  };

  const handleContinueFromRole = () => {
    const target = DEMO_PERSONAS.find(p => p.role === selectedRole) || DEMO_PERSONAS[0];
    switchPersona(target.id);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const target = DEMO_PERSONAS.find(p => p.role === selectedRole) || DEMO_PERSONAS[0];
      switchPersona(target.id);
      setLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-2 sm:px-4 text-slate-800 animate-fadeIn">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Panel A: Welcome Back Login Form (Exact Match to Mockup Panel 2) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 flex flex-col justify-between relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-1 rounded-full text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div>
            {/* Logo */}
            <div className="text-center space-y-1 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-sm">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L3 19h5l2-4h4l2 4h5L12 2z" />
                  <path d="M10 12h4" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-slate-900 font-heading">AwaazGram</h2>
              <p className="text-[10px] text-slate-400 font-medium">People's Voice. Real Solutions.</p>
              
              <h3 className="text-xl font-bold text-slate-900 pt-2 font-heading">Welcome Back!</h3>
              <p className="text-xs text-slate-500">Login to continue your journey</p>
            </div>

            {/* Toggle: Login | Register */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 rounded-xl transition ${
                  activeTab === 'login'
                    ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 rounded-xl transition ${
                  activeTab === 'register'
                    ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-600 font-bold">Password</label>
                  <button type="button" className="text-[11px] text-blue-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Logging in...' : 'Login'}</span>
              </button>
            </form>

            {/* SSO Options */}
            <div className="mt-5 text-center space-y-3">
              <div className="text-[11px] text-slate-400 font-medium">or continue with</div>
              
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleContinueFromRole}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span className="text-red-500 font-bold">G</span>
                  <span>Continue with Google</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-slate-500">
                Don't have an account?{' '}
                <button onClick={() => setActiveTab('register')} className="text-blue-600 font-bold hover:underline">
                  Register now
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center text-[11px] text-emerald-800 font-medium">
            Together for Stronger Communities 🌿
          </div>
        </div>

        {/* Panel B: "Join as" Role Selector (Exact Match to Mockup Panel 3) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="text-center space-y-1 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-sm">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L3 19h5l2-4h4l2 4h5L12 2z" />
                  <path d="M10 12h4" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-slate-900 font-heading">AwaazGram</h2>
              <p className="text-[10px] text-slate-400 font-medium">People's Voice. Real Solutions.</p>

              <h3 className="text-xl font-bold text-slate-900 pt-2 font-heading">Join as</h3>
              <p className="text-xs text-slate-500">Choose your role to access your dashboard</p>
            </div>

            {/* 4 Role Selection Cards (2x2 Grid from Reference) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {roleCards.map(r => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;

                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleSelect(r.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col items-center text-center space-y-2.5 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full ${r.color} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{r.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleContinueFromRole}
              className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
            >
              <span>Continue →</span>
            </button>
          </div>

          <div className="pt-6 text-center text-[11px] text-slate-400 font-medium tracking-wide">
            People • Collaboration • Real Change
          </div>

        </div>

      </div>

      {/* Small Reset Demo Data Button */}
      <div className="flex items-center justify-center pt-4">
        <button
          type="button"
          onClick={handleResetDemoData}
          disabled={resetting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold transition border border-slate-200/80 cursor-pointer shadow-2xs"
          title="Restore Original Default Demo Data"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-emerald-600 ${resetting ? 'animate-spin' : ''}`} />
          <span>{resetting ? 'Resetting Demo Data...' : 'Reset Demo Data'}</span>
        </button>
      </div>

    </div>
  );
}
