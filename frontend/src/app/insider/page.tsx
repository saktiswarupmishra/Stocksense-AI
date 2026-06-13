'use client';

import { UserGroupIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const trades = [
  { insider: 'Tim Cook', title: 'CEO', company: 'Apple Inc.', symbol: 'AAPL', type: 'SELL', shares: 75000, price: 188.50, total: 14137500, date: 'Jun 10, 2024' },
  { insider: 'Satya Nadella', title: 'CEO', company: 'Microsoft', symbol: 'MSFT', type: 'SELL', shares: 50000, price: 375.20, total: 18760000, date: 'Jun 8, 2024' },
  { insider: 'Jensen Huang', title: 'CEO', company: 'NVIDIA', symbol: 'NVDA', type: 'SELL', shares: 29000, price: 870.00, total: 25230000, date: 'Jun 7, 2024' },
  { insider: 'Jamie Dimon', title: 'CEO', company: 'JPMorgan', symbol: 'JPM', type: 'BUY', shares: 10000, price: 195.00, total: 1950000, date: 'Jun 6, 2024' },
  { insider: 'Andy Jassy', title: 'CEO', company: 'Amazon', symbol: 'AMZN', type: 'SELL', shares: 40000, price: 184.30, total: 7372000, date: 'Jun 5, 2024' },
  { insider: 'Mark Zuckerberg', title: 'CEO', company: 'Meta', symbol: 'META', type: 'SELL', shares: 28000, price: 500.15, total: 14004200, date: 'Jun 4, 2024' },
];

export default function InsiderPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
          <UserGroupIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Insider Trading Tracker</h1>
          <p className="text-xs text-[var(--muted)]">SEC Form 4 filings • Real-time insider activity</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden" style={{ cursor: 'default' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[var(--muted)] bg-[var(--muted-bg)]">
              <th className="px-5 py-3 font-medium">Insider</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium text-right">Shares</th>
              <th className="px-5 py-3 font-medium text-right">Price</th>
              <th className="px-5 py-3 font-medium text-right">Total Value</th>
              <th className="px-5 py-3 font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t, i) => (
              <tr key={i} className="border-t border-[var(--card-border)] hover:bg-[var(--muted-bg)] transition-colors">
                <td className="px-5 py-4">
                  <p className="font-semibold">{t.insider}</p>
                  <p className="text-xs text-[var(--muted)]">{t.title}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="font-semibold">{t.symbol}</span>
                  <span className="text-xs text-[var(--muted)] ml-1">{t.company}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${t.type === 'BUY' ? 'text-gain bg-gain/10' : 'text-loss bg-loss/10'}`}>
                    {t.type === 'BUY' ? '▲' : '▼'} {t.type}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-mono">{t.shares.toLocaleString()}</td>
                <td className="px-5 py-4 text-right font-mono">${t.price.toFixed(2)}</td>
                <td className="px-5 py-4 text-right font-mono font-semibold">${(t.total / 1000000).toFixed(1)}M</td>
                <td className="px-5 py-4 text-right text-[var(--muted)]">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
