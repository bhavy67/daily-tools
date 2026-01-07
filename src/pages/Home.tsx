import { useState, useMemo } from 'react';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { useAppStore } from '../store/useAppStore';
import { tools, categories } from '../config/tools';
import { Code2, Wrench, Filter } from 'lucide-react';

export const Home = () => {
  const { searchQuery } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryName = categories.find(c => c.id === selectedCategory)?.name;
      filtered = filtered.filter((tool) => tool.category === categoryName);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.keywords.some((keyword) => keyword.includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return tools.length;
    const categoryName = categories.find(c => c.id === categoryId)?.name;
    return tools.filter(tool => tool.category === categoryName).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 sm:p-10 md:p-12 lg:p-16 mb-8 sm:mb-10 lg:mb-12 mt-4 sm:mt-6 lg:mt-8">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20">
            <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline font-heading tracking-wide">Premium Developer Tools — Completely Free</span>
            <span className="xs:hidden font-heading tracking-wide">Dev Tools — Free</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Lightning-Fast<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              KwikTools ⚡
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 leading-relaxed px-4 font-sans">
            A curated collection of essential developer utilities. Fast, secure, and runs entirely in your browser.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">{tools.length}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-heading">Tools Available</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">{categories.length - 1}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-heading">Categories</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">100%</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-heading">Client-Side</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 font-heading">
            <Filter className="w-5 h-5 sm:w-6 sm:h-6" />
            Filter by Category
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium self-start sm:self-auto"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <span className="block sm:inline">{category.name}</span>
              <span className={`ml-1.5 sm:ml-2 text-xs ${
                selectedCategory === category.id
                  ? 'text-indigo-200'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                ({getCategoryCount(category.id)})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-heading">
              {selectedCategory === 'all' ? 'All Tools' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
            
            {/* Coming Soon Card */}
            <div className="block h-full group">
              <div className="h-full p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl sm:rounded-2xl shadow-sm border-2 border-dashed border-indigo-300 dark:border-indigo-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col items-center justify-center flex-1 text-center">
                    <div className="mb-3 sm:mb-4">
                      <div className="relative inline-block">
                        <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <span className="text-2xl sm:text-3xl">✨</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce shadow-md">
                          <span className="text-xs">🚀</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-1.5 sm:mb-2 line-clamp-2">
                      More Tools Coming Soon!
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed min-h-[2.5rem] font-sans px-2">
                      New utilities coming to boost your productivity
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-indigo-200 dark:border-indigo-700/50">
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 font-heading">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span>Stay tuned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="max-w-md mx-auto px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl sm:text-4xl">🔍</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
              No tools found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
              We couldn't find any tools matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                useAppStore.getState().setSearchQuery('');
              }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium text-sm sm:text-base"
            >
              View all tools
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
