import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const LineSorter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [copied, setCopied] = useState(false);

  const sortLines = () => {
    let lines = input.split('\n');

    if (removeEmpty) {
      lines = lines.filter(line => line.trim() !== '');
    }

    if (removeDuplicates) {
      lines = [...new Set(lines)];
    }

    lines.sort((a, b) => {
      const strA = caseSensitive ? a : a.toLowerCase();
      const strB = caseSensitive ? b : b.toLowerCase();
      
      if (sortOrder === 'asc') {
        return strA.localeCompare(strB);
      } else {
        return strB.localeCompare(strA);
      }
    });

    setOutput(lines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reverse = () => {
    const lines = input.split('\n');
    setOutput(lines.reverse().join('\n'));
  };

  const shuffle = () => {
    const lines = input.split('\n');
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(lines.join('\n'));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Line Sorter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Sort, reverse, or shuffle text lines
        </p>
      </div>

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Options
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="input-field"
            >
              <option value="asc">Ascending (A-Z)</option>
              <option value="desc">Descending (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Case Sensitive
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => setRemoveEmpty(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Remove Empty Lines
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Remove Duplicates
            </span>
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={sortLines} className="btn-primary">
            Sort Lines
          </button>
          <button onClick={reverse} className="btn-secondary">
            Reverse Order
          </button>
          <button onClick={shuffle} className="btn-secondary">
            Shuffle
          </button>
        </div>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input (one item per line)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter lines to sort..."
            className="textarea-field h-96 resize-none"
          />
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Lines: {input.split('\n').length}
          </div>
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Sorted lines will appear here..."
            className="textarea-field h-96 resize-none"
          />
          {output && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Lines: {output.split('\n').length}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Features:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Sort alphabetically (A-Z or Z-A)</li>
          <li>• Reverse the order of lines</li>
          <li>• Shuffle lines randomly</li>
          <li>• Remove empty lines or duplicates</li>
          <li>• Case-sensitive or case-insensitive sorting</li>
        </ul>
      </div>
    </div>
  );
};
