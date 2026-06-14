'use client';

import { useState } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample chart data
const generateChartData = (symbol: string) => {
  const data = [];
  let price = symbol === 'AAPL' ? 170 : symbol === 'NVDA' ? 800 : 150;
  for (let i = 0; i < 90; i++) {
    price += (Math.random() - 0.48) * price * 0.02;
    data.push({
      date: new Date(Date.now() - (90 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 50000000 + 10000000),
    });
  }
  return data;
};

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.25, mcap: '2.94T', pe: 29.4, vol: '48.2M' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 1.82, mcap: '2.16T', pe: 65.2, vol: '32.1M' },
  { symbol: 'MSFT', name: 'Microsoft', price: 378.91, change: 1.10, mcap: '2.81T', pe: 34.8, vol: '22.4M' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, change: -0.65, mcap: '1.78T', pe: 24.1, vol: '28.7M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -1.26, mcap: '790B', pe: 72.3, vol: '45.8M' },
  { symbol: 'AMZN', name: 'Amazon', price: 186.49, change: 1.01, mcap: '1.94T', pe: 58.7, vol: '35.2M' },
];

export default function DashboardPage() {
  const [selected, setSelected] = useState(stocks[0]);
  const chartData = generateChartData(selected.symbol);
  const [timeRange, setTimeRange] = useState('3M');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stock Dashboard</h1>
        <div className="flex items-center gap-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
            <button key={range} onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${timeRange === range ? 'bg-primary-500 text-white' : 'bg-[var(--muted-bg)] text-[var(--muted)] hover:text-[var(--foreground)]'}`}>
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6" style={{ cursor: 'default' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{selected.symbol} <span className="text-[var(--muted)] font-normal text-sm">• {selected.name}</span></h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-3xl font-bold font-mono">${selected.price}</span>
                <span className={`flex items-center gap-1 text-sm font-semibold ${selected.change >= 0 ? 'text-gain' : 'text-loss'}`}>
                  {selected.change >= 0 ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
                  {selected.change >= 0 ? '+' : ''}{selected.change}%
                </span>
              </div>
            </div>
            <div className="text-right text-xs text-[var(--muted)] space-y-1">
              <p>MCap: <span className="font-semibold text-[var(--foreground)]">{selected.mcap}</span></p>
              <p>P/E: <span className="font-semibold text-[var(--foreground)]">{selected.pe}</span></p>
              <p>Vol: <span className="font-semibold text-[var(--foreground)]">{selected.vol}</span></p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted)" domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stock List */}
        <div className="glass-card p-4" style={{ cursor: 'default' }}>
          <h3 className="font-semibold text-sm mb-3">Top Stocks</h3>
          <div className="space-y-2">
            {stocks.map((stock) => (
              <button key={stock.symbol} onClick={() => setSelected(stock)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${selected.symbol === stock.symbol ? 'bg-primary-500/10 border border-primary-500/30' : 'hover:bg-[var(--muted-bg)]'}`}>
                <div>
                  <p className="font-semibold text-sm">{stock.symbol}</p>
                  <p className="text-xs text-[var(--muted)]">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold">${stock.price}</p>
                  <p className={`text-xs font-medium ${stock.change >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'S&P 500', value: '5,234.18', change: '+0.82%', up: true },
          { label: 'NASDAQ', value: '16,742.39', change: '+1.24%', up: true },
          { label: 'DOW', value: '39,150.33', change: '-0.18%', up: false },
          { label: 'VIX', value: '13.42', change: '-2.14%', up: false },
        ].map((idx) => (
          <div key={idx.label} className="glass-card p-4" style={{ cursor: 'default' }}>
            <p className="text-xs text-[var(--muted)] font-medium">{idx.label}</p>
            <p className="text-lg font-bold font-mono mt-1">{idx.value}</p>
            <p className={`text-xs font-semibold mt-1 ${idx.up ? 'text-gain' : 'text-loss'}`}>{idx.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
