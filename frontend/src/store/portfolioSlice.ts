import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Holding {
  symbol: string;
  stockName: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  allocationPercent: number;
}

interface Portfolio {
  id: string;
  name: string;
  holdings: Holding[];
  totalInvested: number;
  currentValue: number;
  totalPnL: number;
  totalPnLPercent: number;
}

interface PortfolioState {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
  loading: boolean;
}

const initialState: PortfolioState = {
  portfolios: [],
  selectedPortfolio: null,
  loading: false,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolios: (state, action: PayloadAction<Portfolio[]>) => {
      state.portfolios = action.payload;
    },
    setSelectedPortfolio: (state, action: PayloadAction<Portfolio | null>) => {
      state.selectedPortfolio = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPortfolios, setSelectedPortfolio, setLoading } = portfolioSlice.actions;
export default portfolioSlice.reducer;
