import { Link } from 'react-router-dom';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const Icon = tool.icon;

  return (
    <Link to={tool.path} className="block">
      <div className="tool-card group">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
              <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tool.description}
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                {tool.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
