import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useAppStore();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {!isHome && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? (
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              )}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-white font-bold text-lg">DT</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    DevToolkit
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your daily dev companion
                  </p>
                </div>
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar - Only show on tool pages */}
      {!isHome && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          
          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
                <Sidebar />
              </div>
            </div>
          )}
        </>
      )}

      {/* Main Content */}
      <main className={`pt-16 ${!isHome ? 'lg:ml-64' : ''} transition-all duration-300`}>
        <div className={`${isHome ? '' : 'max-w-7xl mx-auto'} px-4 sm:px-6 lg:px-8 py-8`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={`${!isHome ? 'lg:ml-64' : ''} bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-semibold">DevToolkit</span>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Privacy-focused developer tools that run entirely in your browser.
            </p>
            <p className="text-center text-xs text-gray-500 dark:text-gray-500">
              © 2026 DevToolkit. Made with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
