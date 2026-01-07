import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronDown, ChevronRight } from 'lucide-react';
import { tools, categories } from '../config/tools';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['all']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoryTools = (categoryName: string) => {
    return tools.filter(tool => tool.category === categoryName);
  };

  return (
    <aside className="fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <nav className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
        {/* Home Link */}
        <Link
          to="/"
          className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-semibold rounded-lg sm:rounded-xl transition-all ${
            location.pathname === '/'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
          Home
        </Link>

        <div className="pt-4 sm:pt-6 pb-2">
          <h3 className="px-3 sm:px-4 text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Tool Categories
          </h3>
        </div>

        {/* Category Sections */}
        {categories
          .filter(cat => cat.id !== 'all')
          .map(category => {
            const categoryTools = getCategoryTools(category.name);
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <div key={category.id} className="space-y-1">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center justify-between w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg sm:rounded-xl transition-all"
                >
                  <span className="flex items-center">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    )}
                    <span className="truncate">{category.name}</span>
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg font-bold flex-shrink-0 ml-2">
                    {categoryTools.length}
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-4 sm:ml-6 space-y-1">
                    {categoryTools.map(tool => (
                      <Link
                        key={tool.id}
                        to={tool.path}
                        className={`block px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all ${
                          location.pathname === tool.path
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold border-l-4 border-indigo-600'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 border-l-4 border-transparent'
                        }`}
                      >
                        <span className="truncate block">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </nav>
    </aside>
  );
};
