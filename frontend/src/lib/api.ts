import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const AI_BASE = process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000';

interface PortfolioTransaction {
  portfolioId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}

interface WatchlistAlert {
  watchlistId: string;
  symbol: string;
  targetPrice: number;
  direction: 'ABOVE' | 'BELOW';
}

interface OhlcvData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: string;
}

interface HoldingData {
  symbol: string;
  quantity: number;
  currentPrice: number;
  allocation: number;
}

interface IpoScoreData {
  company: string;
  symbol: string;
  sector: string;
  priceRange: string;
  valuation: string;
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const aiApi = axios.create({ baseURL: AI_BASE });

// Auth
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) => api.post('/api/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/api/auth/login', data),
  me: () => api.get('/api/auth/me'),
};

// Stocks
export const stockAPI = {
  search: (q: string) => api.get(`/api/stocks/search?q=${q}`),
  get: (symbol: string) => api.get(`/api/stocks/${symbol}`),
  history: (symbol: string, days = 90) => api.get(`/api/stocks/${symbol}/history?days=${days}`),
};

// Portfolio
export const portfolioAPI = {
  list: () => api.get('/api/portfolio'),
  get: (id: string) => api.get(`/api/portfolio/${id}`),
  create: (data: { name: string; description?: string }) => api.post('/api/portfolio', data),
  transaction: (data: PortfolioTransaction) => api.post('/api/portfolio/transaction', data),
  delete: (id: string) => api.delete(`/api/portfolio/${id}`),
};

// Watchlist
export const watchlistAPI = {
  list: () => api.get('/api/watchlist'),
  create: (data: { name: string; symbols?: string[] }) => api.post('/api/watchlist', data),
  addAlert: (data: WatchlistAlert) => api.post('/api/watchlist/alert', data),
};

// AI Service
export const aiAPI = {
  predict: (symbol: string, prices: number[], days = 30) =>
    aiApi.post(`/api/predict/${symbol}`, { prices, days }),
  detectPatterns: (ohlcv: OhlcvData[]) => aiApi.post('/api/patterns/detect', { ohlcv }),
  chat: (message: string, sessionId?: string) =>
    aiApi.post('/api/chat', { message, session_id: sessionId }),
  rebalance: (holdings: HoldingData[], riskProfile = 'moderate') =>
    aiApi.post('/api/rebalance', { holdings, risk_profile: riskProfile }),
  sentiment: (texts: string[]) => aiApi.post('/api/sentiment', { texts }),
  ipoScore: (data: IpoScoreData) => aiApi.post('/api/ipo/score', data),
};

export default api;
