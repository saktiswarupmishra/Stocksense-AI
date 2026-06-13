'use client';

import { MagnifyingGlassIcon, SunIcon, MoonIcon, Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
}

export default function Navbar({ darkMode, onToggleTheme, onToggleSidebar }: NavbarProps) {
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-6 border-b border-[var(--card-border)] bg-[var(--nav-bg)] backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-[var(--muted-bg)] transition-colors lg:hidden">
          <Bars3Icon className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search stocks, symbols..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 pl-10 pr-4 py-2 rounded-xl bg-[var(--muted-bg)] border border-transparent focus:border-primary-500 focus:outline-none text-sm transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--muted)] bg-[var(--card-bg)] px-1.5 py-0.5 rounded border border-[var(--card-border)]">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[var(--muted-bg)] transition-colors">
          <BellIcon className="w-5 h-5 text-[var(--muted)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <button onClick={onToggleTheme} className="p-2 rounded-lg hover:bg-[var(--muted-bg)] transition-colors">
          {darkMode ? <SunIcon className="w-5 h-5 text-amber-400" /> : <MoonIcon className="w-5 h-5 text-slate-600" />}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
          S
        </div>
      </div>
    </header>
  );
}
