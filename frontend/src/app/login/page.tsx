'use client';

import { useState } from 'react';
import { ChartBarIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <ChartBarIcon className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">StockSense AI</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{isRegister ? 'Create your account' : 'Welcome back'}</p>
        </div>

        <div className="glass-card p-6" style={{ cursor: 'default' }}>
          <div className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--muted-bg)] border border-transparent focus:border-primary-500 focus:outline-none text-sm" placeholder="John Doe" />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--muted-bg)] border border-transparent focus:border-primary-500 focus:outline-none text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--muted-bg)] border border-transparent focus:border-primary-500 focus:outline-none text-sm pr-10" placeholder="••••••••" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeSlashIcon className="w-4 h-4 text-[var(--muted)]" /> : <EyeIcon className="w-4 h-4 text-[var(--muted)]" />}
                </button>
              </div>
            </div>

            <button className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm transition-colors">
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--card-border)]" /></div>
              <div className="relative flex justify-center"><span className="bg-[var(--card-bg)] px-3 text-xs text-[var(--muted)]">or</span></div>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-[var(--card-border)] font-semibold text-sm hover:bg-[var(--muted-bg)] transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-xs text-[var(--muted)] mt-4">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary-500 font-semibold hover:underline">
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
