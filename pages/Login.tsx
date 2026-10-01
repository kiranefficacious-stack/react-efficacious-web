import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

interface ThrottleState {
  attempts: number;
  lockoutUntil: number | null;
}

const getStoredThrottle = (): ThrottleState => {
  try {
    const raw = localStorage.getItem('efficacious_admin_throttle');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fallback
  }
  return { attempts: 0, lockoutUntil: null };
};

const saveThrottle = (state: ThrottleState) => {
  try {
    localStorage.setItem('efficacious_admin_throttle', JSON.stringify(state));
  } catch (e) {
    // ignore
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);

  // Check lockout on mount and tick every second if active
  useEffect(() => {
    const checkLockout = () => {
      const state = getStoredThrottle();
      if (state.lockoutUntil && state.lockoutUntil > Date.now()) {
        setLockoutRemaining(Math.ceil((state.lockoutUntil - Date.now()) / 1000));
        setFailedAttempts(state.attempts);
      } else {
        if (state.lockoutUntil && state.lockoutUntil <= Date.now()) {
          // Lockout expired, reset attempts
          saveThrottle({ attempts: 0, lockoutUntil: null });
        }
        setLockoutRemaining(0);
        setFailedAttempts(state.attempts || 0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLockedOut = lockoutRemaining > 0;

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) {
      showToast('error', `Account temporarily locked. Please wait ${Math.ceil(lockoutRemaining / 60)} minutes.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const result = await login(email, password);

    setIsLoading(false);

    if (result.success) {
      saveThrottle({ attempts: 0, lockoutUntil: null });
      setFailedAttempts(0);
      setLockoutRemaining(0);
      showToast('success', 'Login successful! Welcome back.');
      const from = (location.state as any)?.from?.pathname || '/admin';
      const safeTarget = typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') ? from : '/admin';
      navigate(safeTarget, { replace: true });
    } else {
      const state = getStoredThrottle();
      const newAttempts = (state.attempts || 0) + 1;
      let newLockout: number | null = null;

      if (newAttempts >= MAX_ATTEMPTS) {
        newLockout = Date.now() + LOCKOUT_MS;
        setLockoutRemaining(Math.ceil(LOCKOUT_MS / 1000));
        showToast('error', 'Too many failed attempts. Login locked for 15 minutes.');
      } else {
        showToast('error', result.error || 'Login failed. Please check your credentials.');
      }

      saveThrottle({ attempts: newAttempts, lockoutUntil: newLockout });
      setFailedAttempts(newAttempts);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-600 rounded-2xl mb-4 shadow-lg shadow-brand-600/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Login
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sign in to access the admin panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Lockout Warning Banner */}
          {isLockedOut ? (
            <div className="p-4 bg-red-50 dark:bg-red-950/50 border-b border-red-200 dark:border-red-900/50 flex items-center gap-3 text-red-700 dark:text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">Account Temporarily Locked</p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  Too many failed attempts. Try again in {Math.floor(lockoutRemaining / 60)}m {lockoutRemaining % 60}s.
                </p>
              </div>
            </div>
          ) : failedAttempts >= 3 ? (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-900/50 flex items-center gap-2 text-amber-800 dark:text-amber-200 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Warning: {MAX_ATTEMPTS - failedAttempts} attempt{MAX_ATTEMPTS - failedAttempts === 1 ? '' : 's'} remaining before security lockout.</span>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} autoComplete="on" className="p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors dark:bg-slate-700 dark:text-white ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  placeholder="admin@efficacious.co.in"
                  disabled={isLoading || isLockedOut}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: undefined });
                  }}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors dark:bg-slate-700 dark:text-white ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading || isLockedOut}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  disabled={isLoading || isLockedOut}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isLockedOut}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : isLockedOut ? (
                <>
                  <Lock size={20} />
                  Locked ({lockoutRemaining}s)
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Auth Info */}
          <div className="px-8 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              <strong>Secure Admin Access</strong>
              <br />
              Credentials are managed by the system administrator.
            </p>
          </div>
        </div>

        {/* Back to Site Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
