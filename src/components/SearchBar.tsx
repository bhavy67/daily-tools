import { Search, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-5 flex items-center pointer-events-none">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
      </div>
      <input
        type="text"
        className="w-full pl-10 sm:pl-14 pr-10 sm:pr-14 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm sm:text-base shadow-lg hover:shadow-xl focus:shadow-2xl font-medium"
        placeholder="Search tools... (e.g., JSON, Base64)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
          aria-label="Clear search"
        >
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </div>
        </button>
      )}
    </div>
  );
};
