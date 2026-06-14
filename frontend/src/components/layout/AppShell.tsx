'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState, useEffect, useSyncExternalStore } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

const PUBLIC_ROUTES = ['/login'];

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }
  }, [isAuthenticated, isPublicRoute, router, mounted]);

  // Toggle dark mode class on html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Public routes (login) — render without app shell
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Not authenticated and not on public route — show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated — show full app shell with sidebar + navbar
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
