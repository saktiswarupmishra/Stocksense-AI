import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
  sector: string;
}

interface StockState {
  searchResults: Stock[];
  selectedStock: Stock | null;
  watchlist: string[];
  loading: boolean;
}

const initialState: StockState = {
  searchResults: [],
  selectedStock: null,
  watchlist: [],
  loading: false,
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Stock[]>) => {
      state.searchResults = action.payload;
    },
    setSelectedStock: (state, action: PayloadAction<Stock | null>) => {
      state.selectedStock = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSearchResults, setSelectedStock, setLoading } = stockSlice.actions;
export default stockSlice.reducer;
