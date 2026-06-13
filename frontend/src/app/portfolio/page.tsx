'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, PlusIcon } from '@heroicons/react/24/outline';

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', qty: 50, avg: 165.20, current: 189.84, pnl: 1232.00, pnlPct: 14.92, alloc: 28 },
  { symbol: 'NVDA', name: 'NVIDIA', qty: 10, avg: 750.00, current: 875.28, pnl: 1252.80, pnlPct: 16.70, alloc: 26 },
  { symbol: 'MSFT', name: 'Microsoft', qty: 15, avg: 350.00, current: 378.91, pnl: 433.65, pnlPct: 8.26, alloc: 17 },
  { symbol: 'GOOGL', name: 'Alphabet', qty: 30, avg: 135.00, current: 141.80, pnl: 204.00, pnlPct: 5.04, alloc: 13 },
  { symbol: 'AMZN', name: 'Amazon', qty: 20, avg: 178.00, current: 186.49, pnl: 169.80, pnlPct: 4.77, alloc: 11 },
  { symbol: 'TSLA', name: 'Tesla', qty: 8, avg: 260.00, current: 248.42, pnl: -92.64, pnlPct: -4.45, alloc: 5 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e', '#f97316'];

const pieData = holdings.map((h) => ({ name: h.symbol, value: h.alloc }));
const totalValue = holdings.reduce((sum, h) => sum + h.current * h.qty, 0);
const totalPnL = holdings.reduce((sum, h) => sum + h.pnl, 0);

export default function PortfolioPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-colors">
          <PlusIcon className="w-4 h-4" /> New Portfolio
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5" style={{ cursor: 'default' }}>
          <p className="text-xs text-[var(--muted)] font-medium">Total Value</p>
          <p className="text-2xl font-bold font-mono mt-1">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="glass-card p-5" style={{ cursor: 'default' }}>
          <p className="text-xs text-[var(--muted)] font-medium">Total P&L</p>
          <p className={`text-2xl font-bold font-mono mt-1 ${totalPnL >= 0 ? 'text-gain' : 'text-loss'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="glass-card p-5" style={{ cursor: 'default' }}>
          <p className="text-xs text-[var(--muted)] font-medium">Holdings</p>
          <p className="text-2xl font-bold font-mono mt-1">{holdings.length}</p>
        </div>
        <div className="glass-card p-5" style={{ cursor: 'default' }}>
          <p className="text-xs text-[var(--muted)] font-medium">Best Performer</p>
          <p className="text-2xl font-bold font-mono mt-1 text-gain">NVDA +16.7%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings Table */}
        <div className="lg:col-span-2 glass-card p-5" style={{ cursor: 'default' }}>
          <h3 className="font-semibold mb-4">Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[var(--muted)] border-b border-[var(--card-border)]">
                  <th className="pb-3 font-medium">Symbol</th>
                  <th className="pb-3 font-medium">Qty</th>
                  <th className="pb-3 font-medium">Avg Price</th>
                  <th className="pb-3 font-medium">Current</th>
                  <th className="pb-3 font-medium text-right">P&L</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.symbol} className="border-b border-[var(--card-border)] last:border-0 hover:bg-[var(--muted-bg)] transition-colors">
                    <td className="py-3">
                      <p className="font-semibold">{h.symbol}</p>
                      <p className="text-xs text-[var(--muted)]">{h.name}</p>
                    </td>
                    <td className="py-3 font-mono">{h.qty}</td>
                    <td className="py-3 font-mono">${h.avg.toFixed(2)}</td>
                    <td className="py-3 font-mono">${h.current.toFixed(2)}</td>
                    <td className={`py-3 text-right font-semibold ${h.pnl >= 0 ? 'text-gain' : 'text-loss'}`}>
                      <div className="flex items-center justify-end gap-1">
                        {h.pnl >= 0 ? <ArrowTrendingUpIcon className="w-3 h-3" /> : <ArrowTrendingDownIcon className="w-3 h-3" />}
                        {h.pnl >= 0 ? '+' : ''}{h.pnlPct.toFixed(2)}%
                      </div>
                      <p className="text-xs">${Math.abs(h.pnl).toFixed(2)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Allocation Donut */}
        <div className="glass-card p-5" style={{ cursor: 'default' }}>
          <h3 className="font-semibold mb-4">Allocation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {holdings.map((h, i) => (
              <div key={h.symbol} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="font-medium">{h.symbol}</span>
                </div>
                <span className="text-[var(--muted)]">{h.alloc}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
