import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Linkedin } from 'lucide-react';
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
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-4">
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
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-white font-bold text-sm sm:text-lg">⚡</span>
                </div>
                <div className="hidden xs:block">
                  <h1 className="text-base sm:text-xl font-display font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
                    KwikTools
                  </h1>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block font-heading">
                    Lightning-fast utilities ⚡
                  </p>
                </div>
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
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
      <main className={`pt-14 sm:pt-16 ${!isHome ? 'lg:ml-64' : ''} transition-all duration-300`}>
        <div className={`${isHome ? '' : 'max-w-7xl mx-auto'} px-4 sm:px-6 lg:px-8 py-6 lg:py-8`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={`${!isHome ? 'lg:ml-64' : ''} bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 sm:mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">⚡</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-display font-semibold text-sm sm:text-base tracking-tight">KwikTools</span>
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-4 font-sans">
              Lightning-fast developer tools that run entirely in your browser.
            </p>
            
            {/* Creator Info */}
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Made with ⚡ by
              </span>
              <a
                href="https://www.linkedin.com/in/bhavyladani"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                aria-label="Bhavy Ladani on LinkedIn"
              >
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Bhavy Ladani
                </span>
                <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
