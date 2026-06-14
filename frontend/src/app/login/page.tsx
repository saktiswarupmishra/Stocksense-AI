'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/authSlice';
import { ChartBarIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const FLOATING_TICKERS = [
  { symbol: 'AAPL', price: '189.84', change: '+1.25%', positive: true },
  { symbol: 'GOOGL', price: '141.80', change: '-0.65%', positive: false },
  { symbol: 'NVDA', price: '875.28', change: '+1.82%', positive: true },
  { symbol: 'TSLA', price: '248.42', change: '-1.26%', positive: false },
  { symbol: 'MSFT', price: '378.91', change: '+1.10%', positive: true },
  { symbol: 'AMZN', price: '186.49', change: '+1.01%', positive: true },
  { symbol: 'META', price: '505.12', change: '+2.34%', positive: true },
  { symbol: 'NFLX', price: '628.40', change: '-0.42%', positive: false },
];

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    if (isRegister && !form.name) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);

    // Simulate API call (replace with real API when backend is ready)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful login
    dispatch(
      setCredentials({
        user: {
          id: '1',
          name: form.name || form.email.split('@')[0],
          email: form.email,
        },
        token: 'mock-jwt-token-' + Date.now(),
      })
    );

    setLoading(false);
    router.push('/');
  };

  return (
    <div className="login-page">
      {/* Animated gradient background */}
      <div className="login-bg" />

      {/* Grid pattern overlay */}
      <div className="login-grid-overlay" />

      {/* Floating orbs */}
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />
      <div className="login-orb login-orb-3" />

      {/* Floating stock tickers */}
      <div className="login-tickers">
        {FLOATING_TICKERS.map((t, i) => (
          <div
            key={t.symbol}
            className="login-ticker-pill"
            style={{
              animationDelay: `${i * 0.7}s`,
              top: `${12 + ((i * 37) % 70)}%`,
              left: i < 4 ? `${2 + i * 4}%` : undefined,
              right: i >= 4 ? `${2 + (i - 4) * 4}%` : undefined,
            }}
          >
            <span className="login-ticker-symbol">{t.symbol}</span>
            <span className="login-ticker-price">${t.price}</span>
            <span className={t.positive ? 'login-ticker-up' : 'login-ticker-down'}>
              {t.change}
            </span>
          </div>
        ))}
      </div>

      {/* Main login card */}
      <div className="login-container">
        <div className="login-card">
          {/* Logo header */}
          <div className="login-logo-section">
            <div className="login-logo-icon">
              <ChartBarIcon className="w-8 h-8 text-white" />
              <div className="login-logo-pulse" />
            </div>
            <h1 className="login-title">StockSense AI</h1>
            <p className="login-subtitle">
              {isRegister ? 'Create your account to get started' : 'Welcome back, trader'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            {isRegister && (
              <div className="login-field">
                <label htmlFor="login-name" className="login-label">Full Name</label>
                <input
                  id="login-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="login-input"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
            )}

            <div className="login-field">
              <label htmlFor="login-email" className="login-label">Email</label>
              <input
                id="login-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="login-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password" className="login-label">Password</label>
              <div className="login-password-wrap">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="login-input"
                  placeholder="••••••••"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-eye-btn"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="login-forgot">
                <button type="button" className="login-forgot-link">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn"
            >
              {loading ? (
                <div className="login-spinner-wrap">
                  <div className="login-spinner" />
                  <span>{isRegister ? 'Creating Account...' : 'Signing In...'}</span>
                </div>
              ) : (
                <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
              )}
            </button>

            {/* Divider */}
            <div className="login-divider">
              <div className="login-divider-line" />
              <span className="login-divider-text">or continue with</span>
              <div className="login-divider-line" />
            </div>

            {/* Social buttons */}
            <div className="login-social-row">
              <button type="button" className="login-social-btn">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button type="button" className="login-social-btn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </form>

          {/* Toggle register/login */}
          <p className="login-toggle-text">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="login-toggle-link"
            >
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Bottom branding */}
        <p className="login-branding">
          Powered by AI • LSTM • Transformers
        </p>
      </div>
    </div>
  );
}
