'use client';

import { ArrowPathIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const holdings = [
  { symbol: 'AAPL', current: 28, target: 20, action: 'sell', amount: 2400 },
  { symbol: 'NVDA', current: 26, target: 20, action: 'sell', amount: 1800 },
  { symbol: 'MSFT', current: 17, target: 20, action: 'buy', amount: 900 },
  { symbol: 'GOOGL', current: 13, target: 15, action: 'buy', amount: 600 },
  { symbol: 'AMZN', current: 11, target: 15, action: 'buy', amount: 1200 },
  { symbol: 'TSLA', current: 5, target: 10, action: 'buy', amount: 1500 },
];

export default function RebalancePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <ArrowPathIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Portfolio Rebalancing</h1>
          <p className="text-xs text-[var(--muted)]">Modern Portfolio Theory optimization</p>
        </div>
      </div>

      {/* Risk Profile */}
      <div className="glass-card p-5" style={{ cursor: 'default' }}>
        <h3 className="font-semibold mb-3">Risk Profile: Moderate</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[{ label: 'Stocks', val: '60%' }, { label: 'Bonds', val: '25%' }, { label: 'Cash', val: '10%' }, { label: 'Alts', val: '5%' }].map((a) => (
            <div key={a.label} className="p-3 rounded-xl bg-[var(--muted-bg)]">
              <p className="text-xs text-[var(--muted)]">{a.label}</p>
              <p className="text-lg font-bold">{a.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rebalancing Suggestions */}
      <div className="glass-card p-5" style={{ cursor: 'default' }}>
        <h3 className="font-semibold mb-4">Rebalancing Suggestions</h3>
        <div className="space-y-3">
          {holdings.map((h) => (
            <div key={h.symbol} className="flex items-center justify-between p-4 rounded-xl bg-[var(--muted-bg)]">
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm w-14">{h.symbol}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{h.current}%</span>
                  <span className="text-[var(--muted)]">→</span>
                  <span className="text-sm font-mono font-semibold">{h.target}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--muted)]">${h.amount.toLocaleString()}</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${h.action === 'buy' ? 'bg-gain/10 text-gain' : 'bg-loss/10 text-loss'}`}>
                  {h.action === 'buy' ? <span className="flex items-center gap-1"><ArrowTrendingUpIcon className="w-3 h-3" /> BUY</span> : <span className="flex items-center gap-1"><ArrowTrendingDownIcon className="w-3 h-3" /> SELL</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm transition-colors">
          Apply Rebalancing
        </button>
      </div>
    </div>
  );
}
