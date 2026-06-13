'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon, BriefcaseIcon, EyeIcon, CpuChipIcon, UserGroupIcon,
  BanknotesIcon, RocketLaunchIcon, ChatBubbleLeftRightIcon,
  ArrowPathIcon, MicrophoneIcon, ChartBarSquareIcon, HomeIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Portfolio', href: '/portfolio', icon: BriefcaseIcon },
  { name: 'Watchlist', href: '/watchlist', icon: EyeIcon },
  { name: 'AI Analysis', href: '/analysis', icon: CpuChipIcon },
  { name: 'Predictions', href: '/predictions', icon: ChartBarSquareIcon },
  { name: 'Insider Trades', href: '/insider', icon: UserGroupIcon },
  { name: 'Mutual Funds', href: '/mutual-funds', icon: BanknotesIcon },
  { name: 'IPO Engine', href: '/ipo', icon: RocketLaunchIcon },
  { name: 'AI Chatbot', href: '/chatbot', icon: ChatBubbleLeftRightIcon },
  { name: 'Rebalance', href: '/rebalance', icon: ArrowPathIcon },
  { name: 'Voice Assistant', href: '/voice', icon: MicrophoneIcon },
];

export default function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-0 -ml-1'} transition-all duration-300 flex-shrink-0 border-r border-[var(--card-border)] bg-[var(--sidebar-bg)] overflow-hidden`}>
      <div className="flex flex-col h-full w-64">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--card-border)]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">StockSense</h1>
            <p className="text-[10px] text-[var(--muted)] font-medium tracking-wider uppercase">AI Platform</p>
          </div>
          <button onClick={onToggle} className="ml-auto p-1 rounded-lg hover:bg-[var(--muted-bg)] transition-colors">
            <ChevronLeftIcon className="w-4 h-4 text-[var(--muted)]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[var(--card-border)]">
          <div className="glass-card p-3 text-center" style={{ cursor: 'default' }}>
            <p className="text-xs font-semibold gradient-text">StockSense AI Pro</p>
            <p className="text-[10px] text-[var(--muted)] mt-1">v1.0.0 • 12 Modules</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
