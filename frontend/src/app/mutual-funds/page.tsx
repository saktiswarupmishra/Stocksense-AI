'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BanknotesIcon, StarIcon } from '@heroicons/react/24/outline';

const funds = [
  { name: 'Vanguard S&P 500 ETF', symbol: 'VOO', category: 'Large Cap', nav: 452.30, er: 0.03, rating: 5, r1y: 26.3, r3y: 12.1, r5y: 15.7, aum: '408B' },
  { name: 'Fidelity Growth Fund', symbol: 'FDGRX', category: 'Growth', nav: 187.42, er: 0.52, rating: 4, r1y: 32.1, r3y: 14.8, r5y: 18.2, aum: '72B' },
  { name: 'Schwab Total Market', symbol: 'SWTSX', category: 'Blend', nav: 78.15, er: 0.03, rating: 5, r1y: 24.8, r3y: 11.5, r5y: 14.9, aum: '28B' },
  { name: 'T. Rowe Price Blue Chip', symbol: 'TRBCX', category: 'Large Cap Growth', nav: 165.89, er: 0.57, rating: 4, r1y: 28.9, r3y: 10.2, r5y: 16.1, aum: '45B' },
  { name: 'Vanguard Bond Index', symbol: 'VBTLX', category: 'Bond', nav: 10.12, er: 0.05, rating: 4, r1y: 5.8, r3y: -1.2, r5y: 1.4, aum: '312B' },
];

const chartData = funds.map(f => ({ name: f.symbol, '1Y': f.r1y, '3Y': f.r3y, '5Y': f.r5y }));

export default function MutualFundsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <BanknotesIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Mutual Fund Analyzer</h1>
          <p className="text-xs text-[var(--muted)]">Compare funds, returns, and risk metrics</p>
        </div>
      </div>

      {/* Returns Chart */}
      <div className="glass-card p-6" style={{ cursor: 'default' }}>
        <h3 className="font-semibold mb-4">Returns Comparison (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--muted)" />
            <YAxis tick={{ fontSize: 11 }} stroke="var(--muted)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', fontSize: '12px' }} />
            <Bar dataKey="1Y" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="3Y" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="5Y" fill="#a855f7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Fund List */}
      <div className="glass-card overflow-hidden" style={{ cursor: 'default' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[var(--muted)] bg-[var(--muted-bg)]">
              <th className="px-5 py-3">Fund</th><th className="px-5 py-3">Category</th>
              <th className="px-5 py-3 text-right">NAV</th><th className="px-5 py-3 text-right">Exp Ratio</th>
              <th className="px-5 py-3 text-right">1Y Return</th><th className="px-5 py-3 text-center">Rating</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((f) => (
              <tr key={f.symbol} className="border-t border-[var(--card-border)] hover:bg-[var(--muted-bg)]">
                <td className="px-5 py-4"><p className="font-semibold">{f.symbol}</p><p className="text-xs text-[var(--muted)]">{f.name}</p></td>
                <td className="px-5 py-4 text-xs">{f.category}</td>
                <td className="px-5 py-4 text-right font-mono">${f.nav}</td>
                <td className="px-5 py-4 text-right font-mono">{f.er}%</td>
                <td className={`px-5 py-4 text-right font-semibold ${f.r1y >= 0 ? 'text-gain' : 'text-loss'}`}>{f.r1y >= 0 ? '+' : ''}{f.r1y}%</td>
                <td className="px-5 py-4 text-center">
                  <div className="flex justify-center">{Array.from({ length: f.rating }).map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
