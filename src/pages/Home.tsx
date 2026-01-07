import { useState, useMemo } from 'react';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { useAppStore } from '../store/useAppStore';
import { tools, categories } from '../config/tools';

export const Home = () => {
  const { searchQuery } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
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

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Developer Tools Collection
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A comprehensive collection of essential developer utilities. All tools run locally in your browser for privacy and speed.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No tools found matching your search.
          </p>
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {tools.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Available Tools</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            100%
          </div>
          <div className="text-gray-600 dark:text-gray-400">Client-Side Processing</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            Free
          </div>
          <div className="text-gray-600 dark:text-gray-400">Forever & Open Source</div>
        </div>
      </div>
    </div>
  );
};
