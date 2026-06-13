import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import stockReducer from './stockSlice';
import portfolioReducer from './portfolioSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stocks: stockReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
