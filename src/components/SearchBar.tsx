import { Search, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
      </div>
      <input
        type="text"
        className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base shadow-sm hover:shadow-md focus:shadow-lg"
        placeholder="Search for tools... (e.g., JSON, Base64, Hash)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center group"
          aria-label="Clear search"
        >
          <div className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
        </button>
      )}
    </div>
  );
};
