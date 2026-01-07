import { Link } from 'react-router-dom';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const Icon = tool.icon;

  return (
    <Link to={tool.path} className="block h-full group">
      <div className="h-full p-4 sm:p-5 lg:p-6 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02]">
        <div className="flex flex-col h-full">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-auto">
            <div className="flex-shrink-0">
              <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-lg sm:rounded-xl group-hover:from-indigo-200 group-hover:to-purple-200 dark:group-hover:from-indigo-800/60 dark:group-hover:to-purple-800/60 transition-all duration-300 group-hover:scale-110">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                {tool.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                {tool.description}
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
            <span className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              {tool.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
