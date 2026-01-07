import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const DuplicateLines = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'remove' | 'keep-unique' | 'show-duplicates'>('remove');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ total: 0, unique: 0, duplicates: 0 });

  const process = () => {
    const lines = input.split('\n');
    const seen = new Map<string, number>();
    
    // Count occurrences
    lines.forEach(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      seen.set(key, (seen.get(key) || 0) + 1);
    });

    let result: string[] = [];

    if (mode === 'remove') {
      // Remove all duplicate lines, keep only unique ones
      lines.forEach(line => {
        const key = caseSensitive ? line : line.toLowerCase();
        if (seen.get(key) === 1) {
          result.push(line);
        }
      });
    } else if (mode === 'keep-unique') {
      // Keep first occurrence of each line
      const added = new Set<string>();
      lines.forEach(line => {
        const key = caseSensitive ? line : line.toLowerCase();
        if (!added.has(key)) {
          result.push(line);
          added.add(key);
        }
      });
    } else if (mode === 'show-duplicates') {
      // Show only duplicate lines
      lines.forEach(line => {
        const key = caseSensitive ? line : line.toLowerCase();
        if (seen.get(key)! > 1) {
          result.push(line);
        }
      });
    }

    setOutput(result.join('\n'));
    setStats({
      total: lines.length,
      unique: seen.size,
      duplicates: lines.length - seen.size,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Duplicate Lines Handler
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find, remove, or filter duplicate lines
        </p>
      </div>

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Options
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="input-field"
          >
            <option value="remove">Remove Duplicate Lines (keep only unique)</option>
            <option value="keep-unique">Keep First Occurrence (deduplicate)</option>
            <option value="show-duplicates">Show Only Duplicates</option>
          </select>
        </div>

        <label className="flex items-center space-x-2 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Case Sensitive Comparison
          </span>
        </label>

        <button onClick={process} className="btn-primary">
          Process Lines
        </button>
      </div>

      {/* Stats */}
      {stats.total > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Statistics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Lines</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.unique}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Unique Lines</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.duplicates}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Duplicates</div>
            </div>
          </div>
        </div>
      )}

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
            placeholder="Enter lines to process..."
            className="textarea-field h-96 resize-none"
          />
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
            placeholder="Processed lines will appear here..."
            className="textarea-field h-96 resize-none"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Mode Explanations:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>Remove Duplicates:</strong> Keeps only lines that appear exactly once</li>
          <li>• <strong>Keep First Occurrence:</strong> Removes duplicate lines, keeping the first occurrence</li>
          <li>• <strong>Show Only Duplicates:</strong> Shows only lines that appear more than once</li>
        </ul>
      </div>
    </div>
  );
};
