'use client';

import { CpuChipIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/outline';

const patterns = [
  { name: 'Bullish Engulfing', date: 'Jun 10', symbol: 'AAPL', signal: 'bullish', confidence: 0.85, desc: 'Strong buying pressure overtaking sellers' },
  { name: 'Doji', date: 'Jun 11', symbol: 'NVDA', signal: 'neutral', confidence: 0.90, desc: 'Market indecision at current levels' },
  { name: 'Hammer', date: 'Jun 11', symbol: 'TSLA', signal: 'bullish', confidence: 0.78, desc: 'Potential reversal from downtrend' },
  { name: 'Three Black Crows', date: 'Jun 9', symbol: 'META', signal: 'bearish', confidence: 0.88, desc: 'Strong selling pressure over 3 sessions' },
  { name: 'Morning Star', date: 'Jun 10', symbol: 'AMZN', signal: 'bullish', confidence: 0.82, desc: 'Three-candle bullish reversal pattern' },
  { name: 'Shooting Star', date: 'Jun 12', symbol: 'GOOGL', signal: 'bearish', confidence: 0.76, desc: 'Potential top formation with long upper shadow' },
];

const signalConfig = {
  bullish: { icon: ArrowTrendingUpIcon, color: 'text-gain', bg: 'bg-gain/10', label: 'Bullish' },
  bearish: { icon: ArrowTrendingDownIcon, color: 'text-loss', bg: 'bg-loss/10', label: 'Bearish' },
  neutral: { icon: MinusIcon, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Neutral' },
};

export default function AnalysisPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <CpuChipIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Candlestick Analysis</h1>
          <p className="text-xs text-[var(--muted)]">CNN-based pattern detection across your watchlist</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Bullish Signals', value: patterns.filter(p => p.signal === 'bullish').length, color: 'text-gain' },
          { label: 'Bearish Signals', value: patterns.filter(p => p.signal === 'bearish').length, color: 'text-loss' },
          { label: 'Neutral', value: patterns.filter(p => p.signal === 'neutral').length, color: 'text-amber-500' },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 text-center" style={{ cursor: 'default' }}>
            <p className="text-xs text-[var(--muted)]">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patterns.map((p, i) => {
          const cfg = signalConfig[p.signal as keyof typeof signalConfig];
          return (
            <div key={i} className="glass-card p-5" style={{ cursor: 'default' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg}`}>{cfg.label}</span>
                  <span className="font-bold text-sm">{p.name}</span>
                </div>
                <span className="text-xs text-[var(--muted)]">{p.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{p.symbol}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">{p.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--muted)]">Confidence</p>
                  <p className="text-lg font-bold">{Math.round(p.confidence * 100)}%</p>
                </div>
              </div>
              <div className="mt-3 w-full bg-[var(--muted-bg)] rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${p.signal === 'bullish' ? 'bg-gain' : p.signal === 'bearish' ? 'bg-loss' : 'bg-amber-500'}`}
                  style={{ width: `${p.confidence * 100}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
