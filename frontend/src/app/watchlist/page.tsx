'use client';

import { EyeIcon, BellIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const watchlists = [
  {
    name: 'Tech Giants', stocks: [
      { symbol: 'AAPL', price: 189.84, change: 1.25 },
      { symbol: 'GOOGL', price: 141.80, change: -0.65 },
      { symbol: 'MSFT', price: 378.91, change: 1.10 },
      { symbol: 'NVDA', price: 875.28, change: 1.82 },
    ],
    alerts: [{ symbol: 'AAPL', target: 200.00, direction: 'ABOVE', triggered: false }],
  },
  {
    name: 'Value Picks', stocks: [
      { symbol: 'JPM', price: 196.52, change: 0.45 },
      { symbol: 'WMT', price: 165.23, change: 0.32 },
      { symbol: 'JNJ', price: 156.74, change: -0.21 },
    ],
    alerts: [],
  },
];

export default function WatchlistPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <EyeIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Watchlists & Alerts</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-colors">
          <PlusIcon className="w-4 h-4" /> New Watchlist
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {watchlists.map((wl) => (
          <div key={wl.name} className="glass-card p-5" style={{ cursor: 'default' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{wl.name}</h3>
              <span className="text-xs text-[var(--muted)]">{wl.stocks.length} stocks</span>
            </div>
            <div className="space-y-3">
              {wl.stocks.map((s) => (
                <div key={s.symbol} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--muted-bg)] transition-colors">
                  <span className="font-semibold text-sm">{s.symbol}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm">${s.price}</span>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${s.change >= 0 ? 'text-gain' : 'text-loss'}`}>
                      {s.change >= 0 ? <ArrowTrendingUpIcon className="w-3 h-3" /> : <ArrowTrendingDownIcon className="w-3 h-3" />}
                      {s.change >= 0 ? '+' : ''}{s.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {wl.alerts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
                <p className="text-xs font-semibold text-[var(--muted)] mb-2 flex items-center gap-1"><BellIcon className="w-3 h-3" /> Active Alerts</p>
                {wl.alerts.map((a, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-amber-500/10">
                    <span>{a.symbol} {a.direction === 'ABOVE' ? '▲' : '▼'} ${a.target}</span>
                    <span className={a.triggered ? 'text-gain' : 'text-amber-500'}>{a.triggered ? 'Triggered' : 'Active'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
