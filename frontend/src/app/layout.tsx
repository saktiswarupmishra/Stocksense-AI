'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <head>
        <title>StockSense AI — Intelligent Stock Analysis</title>
        <meta name="description" content="AI-powered stock market analysis, portfolio management, and prediction platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Provider store={store}>
          <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
              <main className="flex-1 overflow-y-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
