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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {!isHome && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? (
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              )}
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">DT</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    DevToolkit
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Developer utilities made beautiful
                  </p>
                </div>
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
      <footer className={`${!isHome ? 'lg:ml-64' : ''} bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 mt-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2026 DevToolkit. All utilities run locally in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
};
