'use client';

import { RocketLaunchIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const ipos = [
  { company: 'QuantumAI Labs', symbol: 'QAIL', sector: 'Technology', priceRange: '$28-32', date: 'Jun 20', score: 8.7, rec: 'Strong Buy', valuation: '4.2B', status: 'UPCOMING' },
  { company: 'GreenVolt Energy', symbol: 'GVLT', sector: 'Energy', priceRange: '$15-18', date: 'Jun 22', score: 7.2, rec: 'Buy', valuation: '1.8B', status: 'UPCOMING' },
  { company: 'NeuraCare Health', symbol: 'NRCH', sector: 'Healthcare', priceRange: '$22-25', date: 'Jun 25', score: 6.8, rec: 'Hold', valuation: '2.5B', status: 'UPCOMING' },
  { company: 'SwiftPay Global', symbol: 'SWPG', sector: 'Financial', priceRange: '$35-40', date: 'Jun 18', score: 8.1, rec: 'Strong Buy', valuation: '6.1B', status: 'OPEN' },
  { company: 'MetaVerse Studios', symbol: 'MVST', sector: 'Technology', priceRange: '$12-15', date: 'Jun 15', score: 5.4, rec: 'Avoid', valuation: '900M', status: 'CLOSED' },
];

const scoreColor = (score: number) => score >= 7.5 ? 'text-gain' : score >= 5 ? 'text-amber-500' : 'text-loss';
const statusBadge = (status: string) => ({
  UPCOMING: 'bg-primary-500/10 text-primary-500',
  OPEN: 'bg-gain/10 text-gain',
  CLOSED: 'bg-[var(--muted-bg)] text-[var(--muted)]',
}[status] || '');

export default function IPOPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <RocketLaunchIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">IPO Recommendation Engine</h1>
          <p className="text-xs text-[var(--muted)]">AI-scored upcoming IPOs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ipos.map((ipo) => (
          <div key={ipo.symbol} className="glass-card p-5" style={{ cursor: 'default' }}>
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadge(ipo.status)}`}>{ipo.status}</span>
              <span className="text-xs text-[var(--muted)]">{ipo.date}</span>
            </div>
            <h3 className="font-bold">{ipo.company}</h3>
            <p className="text-xs text-[var(--muted)]">{ipo.symbol} • {ipo.sector}</p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <p className="text-xs text-[var(--muted)]">Price Range</p>
                <p className="font-semibold text-sm">{ipo.priceRange}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">Valuation</p>
                <p className="font-semibold text-sm">{ipo.valuation}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--card-border)] flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--muted)]">AI Score</p>
                <p className={`text-2xl font-bold ${scoreColor(ipo.score)}`}>{ipo.score}/10</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${ipo.rec === 'Strong Buy' ? 'bg-gain/10 text-gain' : ipo.rec === 'Buy' ? 'bg-blue-500/10 text-blue-500' : ipo.rec === 'Hold' ? 'bg-amber-500/10 text-amber-500' : 'bg-loss/10 text-loss'}`}>
                {ipo.rec}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
