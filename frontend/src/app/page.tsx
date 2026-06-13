'use client';

import Link from 'next/link';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ChartBarIcon, CpuChipIcon, ChatBubbleLeftRightIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const marketData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.34, changePct: 1.25 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -0.92, changePct: -0.65 },
  { symbol: 'MSFT', name: 'Microsoft', price: 378.91, change: 4.12, changePct: 1.10 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 15.67, changePct: 1.82 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -3.18, changePct: -1.26 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 186.49, change: 1.87, changePct: 1.01 },
];

const features = [
  { name: 'AI Predictions', desc: 'LSTM & Transformer models', href: '/predictions', icon: ChartBarIcon, color: 'from-blue-500 to-cyan-500' },
  { name: 'Pattern Detection', desc: 'Candlestick AI analysis', href: '/analysis', icon: CpuChipIcon, color: 'from-purple-500 to-pink-500' },
  { name: 'AI Chatbot', desc: 'RAG-powered assistant', href: '/chatbot', icon: ChatBubbleLeftRightIcon, color: 'from-emerald-500 to-teal-500' },
  { name: 'Portfolio', desc: 'Smart management', href: '/portfolio', icon: BriefcaseIcon, color: 'from-amber-500 to-orange-500' },
];

export default function HomePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to StockSense AI</h1>
          <p className="text-white/80 text-lg max-w-xl">Your intelligent companion for stock market analysis, powered by LSTM, Transformer models, and real-time data.</p>
          <div className="flex gap-3 mt-6">
            <Link href="/dashboard" className="px-5 py-2.5 bg-white text-primary-700 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors">
              Open Dashboard
            </Link>
            <Link href="/chatbot" className="px-5 py-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors">
              Ask AI Assistant
            </Link>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div>
        <h2 className="text-xl font-bold mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.map((stock) => (
            <Link key={stock.symbol} href={`/dashboard?symbol=${stock.symbol}`} className="glass-card p-4 flex items-center justify-between group">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{stock.symbol}</span>
                  <span className="text-xs text-[var(--muted)]">{stock.name}</span>
                </div>
                <p className="text-xl font-bold mt-1 font-mono">${stock.price.toFixed(2)}</p>
              </div>
              <div className={`text-right ${stock.change >= 0 ? 'text-gain' : 'text-loss'}`}>
                <div className="flex items-center gap-1 justify-end">
                  {stock.change >= 0 ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
                  <span className="font-semibold text-sm">{stock.change >= 0 ? '+' : ''}{stock.changePct.toFixed(2)}%</span>
                </div>
                <p className="text-xs mt-1 font-mono">{stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Features Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">AI-Powered Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => (
            <Link key={feat.name} href={feat.href} className="glass-card p-5 group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <feat.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm">{feat.name}</h3>
              <p className="text-xs text-[var(--muted)] mt-1">{feat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
