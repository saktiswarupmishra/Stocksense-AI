'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import AppShell from '@/components/layout/AppShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>StockSense AI — Intelligent Stock Analysis</title>
        <meta name="description" content="AI-powered stock market analysis, portfolio management, and prediction platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Provider store={store}>
          <AppShell>{children}</AppShell>
        </Provider>
      </body>
    </html>
  );
}
