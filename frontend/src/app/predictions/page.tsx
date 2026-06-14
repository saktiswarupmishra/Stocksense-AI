'use client';

import { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CpuChipIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const generatePrediction = () => {
  const data = [];
  let price = 189.84;
  for (let i = -30; i <= 30; i++) {
    const isHistorical = i <= 0;
    const change = (Math.random() - 0.48) * price * 0.015;
    price += change;
    data.push({
      day: i, price: Math.round(price * 100) / 100,
      upper: isHistorical ? undefined : Math.round((price + Math.abs(i) * 1.2) * 100) / 100,
      lower: isHistorical ? undefined : Math.round((price - Math.abs(i) * 1.2) * 100) / 100,
      type: isHistorical ? 'historical' : 'predicted',
    });
  }
  return data;
};

export default function PredictionsPage() {
  const [symbol] = useState('AAPL');
  const [model, setModel] = useState<'lstm' | 'transformer'>('lstm');
  const data = generatePrediction();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <CpuChipIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Stock Predictions</h1>
            <p className="text-xs text-[var(--muted)]">LSTM & Transformer Models</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(['lstm', 'transformer'] as const).map((m) => (
            <button key={m} onClick={() => setModel(m)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${model === m ? 'bg-primary-600 text-white' : 'glass-card text-[var(--muted)]'}`}>
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Prediction Chart */}
      <div className="glass-card p-6" style={{ cursor: 'default' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">{symbol} — 30-Day Price Forecast</h3>
            <p className="text-xs text-[var(--muted)]">Model: {model.toUpperCase()} • Confidence: 87%</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-primary-500" /> Historical</div>
            <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-emerald-500" style={{ borderStyle: 'dashed' }} /> Predicted</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500/20 rounded" /> Confidence</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--muted)" label={{ value: 'Days', position: 'bottom', fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} stroke="var(--muted)" domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="upper" stroke="transparent" fill="url(#confGrad)" />
            <Area type="monotone" dataKey="lower" stroke="transparent" fill="transparent" />
            <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Model Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Predicted Return', value: '+8.42%', icon: ArrowTrendingUpIcon, color: 'text-gain' },
          { label: 'Volatility', value: '2.3%', icon: ArrowTrendingDownIcon, color: 'text-amber-500' },
          { label: 'RSI', value: '62.4', icon: CpuChipIcon, color: 'text-primary-500' },
          { label: 'Trend Signal', value: 'Bullish', icon: ArrowTrendingUpIcon, color: 'text-gain' },
        ].map((m) => (
          <div key={m.label} className="glass-card p-4" style={{ cursor: 'default' }}>
            <div className="flex items-center gap-2 mb-2">
              <m.icon className={`w-4 h-4 ${m.color}`} />
              <span className="text-xs text-[var(--muted)]">{m.label}</span>
            </div>
            <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
