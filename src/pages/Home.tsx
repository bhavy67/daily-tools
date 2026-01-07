import { useState, useMemo } from 'react';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { useAppStore } from '../store/useAppStore';
import { tools, categories } from '../config/tools';
import { Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 pt-8">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-6">
          <Sparkles className="w-4 h-4 mr-2" />
          All Developer Tools. One Clean Platform.
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Developer utilities
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">made beautiful</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          JSON formatters, encoders, generators, and more — all client-side, privacy-first, and blazing fast. No data ever leaves your browser.
        </p>
        
        {/* Quick Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Blazing Fast</span>
          </div>
          <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
            <Shield className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy First</span>
          </div>
          <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
            <Sparkles className="w-4 h-4 text-indigo-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modern UX</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Browse by Category
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
            >
              Clear filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-semibold">{category.name}</span>
                <span className={`text-xs mt-1 ${
                  selectedCategory === category.id
                    ? 'text-indigo-100'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {getCategoryCount(category.id)} tools
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === 'all' ? 'All Tools' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We couldn't find any tools matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                useAppStore.getState().setSearchQuery('');
              }}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View all tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="relative z-10">
            <div className="text-5xl font-bold mb-2">{tools.length}+</div>
            <div className="text-indigo-100 font-medium">Developer Tools</div>
            <p className="text-sm text-indigo-200 mt-2">Covering all your daily needs</p>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="relative z-10">
            <div className="text-5xl font-bold mb-2">100%</div>
            <div className="text-green-100 font-medium">Privacy Focused</div>
            <p className="text-sm text-green-200 mt-2">All processing happens locally</p>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="relative z-10">
            <div className="text-5xl font-bold mb-2">∞</div>
            <div className="text-orange-100 font-medium">Always Free</div>
            <p className="text-sm text-orange-200 mt-2">No subscriptions, no limits</p>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
};
