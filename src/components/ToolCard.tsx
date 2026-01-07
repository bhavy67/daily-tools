import { Link } from 'react-router-dom';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const Icon = tool.icon;

  return (
    <Link to={tool.path} className="block h-full">
      <div className="group h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:-translate-y-1">
        <div className="flex flex-col h-full">
          <div className="flex items-start space-x-4 mb-auto">
            <div className="flex-shrink-0">
              <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl group-hover:from-indigo-100 group-hover:to-purple-100 dark:group-hover:from-indigo-900/50 dark:group-hover:to-purple-900/50 transition-all duration-300">
                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[2.5rem]">
                {tool.description}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
              {tool.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
