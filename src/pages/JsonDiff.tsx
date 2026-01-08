import React, { useState } from 'react';
import { GitCompare, FileUp } from 'lucide-react';

interface DiffResult {
  path: string;
  type: 'added' | 'removed' | 'modified';
  oldValue?: any;
  newValue?: any;
}

const JsonDiff: React.FC = () => {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [diffs, setDiffs] = useState<DiffResult[]>([]);
  const [error, setError] = useState('');

  const compareObjects = (obj1: any, obj2: any, path: string = ''): DiffResult[] => {
    const results: DiffResult[] = [];

    // Handle null or undefined
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
      if (obj1 !== obj2) {
        results.push({
          path: path || '(root)',
          type: 'modified',
          oldValue: obj1,
          newValue: obj2
        });
      }
      return results;
    }

    // Handle primitive types
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      if (obj1 !== obj2) {
        results.push({
          path: path || '(root)',
          type: 'modified',
          oldValue: obj1,
          newValue: obj2
        });
      }
      return results;
    }

    // Handle arrays
    if (Array.isArray(obj1) || Array.isArray(obj2)) {
      if (!Array.isArray(obj1) || !Array.isArray(obj2)) {
        results.push({
          path,
          type: 'modified',
          oldValue: obj1,
          newValue: obj2
        });
        return results;
      }

      const maxLength = Math.max(obj1.length, obj2.length);
      for (let i = 0; i < maxLength; i++) {
        const currentPath = `${path}[${i}]`;
        if (i >= obj1.length) {
          results.push({
            path: currentPath,
            type: 'added',
            newValue: obj2[i]
          });
        } else if (i >= obj2.length) {
          results.push({
            path: currentPath,
            type: 'removed',
            oldValue: obj1[i]
          });
        } else {
          results.push(...compareObjects(obj1[i], obj2[i], currentPath));
        }
      }
      return results;
    }

    // Handle objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = new Set([...keys1, ...keys2]);

    allKeys.forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      const hasKey1 = key in obj1;
      const hasKey2 = key in obj2;

      if (!hasKey1) {
        results.push({
          path: currentPath,
          type: 'added',
          newValue: obj2[key]
        });
      } else if (!hasKey2) {
        results.push({
          path: currentPath,
          type: 'removed',
          oldValue: obj1[key]
        });
      } else {
        results.push(...compareObjects(obj1[key], obj2[key], currentPath));
      }
    });

    return results;
  };

  const handleCompare = () => {
    setError('');
    setDiffs([]);

    try {
      const parsed1 = JSON.parse(json1);
      const parsed2 = JSON.parse(json2);
      const differences = compareObjects(parsed1, parsed2);
      setDiffs(differences);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
    }
  };

  const handleUpload1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJson1(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleUpload2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJson2(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setJson1('');
    setJson2('');
    setDiffs([]);
    setError('');
  };

  const formatValue = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const stats = {
    added: diffs.filter(d => d.type === 'added').length,
    removed: diffs.filter(d => d.type === 'removed').length,
    modified: diffs.filter(d => d.type === 'modified').length,
    total: diffs.length
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            JSON Diff Checker
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-sans">
            Compare two JSON objects and highlight the differences - completely client-side
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* JSON 1 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading">
                JSON 1 (Original)
              </label>
              <label className="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <FileUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Upload
                <input
                  type="file"
                  accept=".json"
                  onChange={handleUpload1}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              placeholder="Paste JSON here..."
              className="w-full h-80 sm:h-96 p-3 sm:p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {/* JSON 2 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading">
                JSON 2 (Comparison)
              </label>
              <label className="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <FileUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Upload
                <input
                  type="file"
                  accept=".json"
                  onChange={handleUpload2}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              placeholder="Paste JSON here..."
              className="w-full h-80 sm:h-96 p-3 sm:p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <button
            onClick={handleCompare}
            disabled={!json1 || !json2}
            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2"
          >
            <GitCompare className="w-4 h-4 sm:w-5 sm:h-5" />
            Compare JSON
          </button>
          <button
            onClick={handleClear}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-semibold text-sm sm:text-base"
          >
            Clear
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl">
            <p className="text-red-700 dark:text-red-400 text-sm font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Stats */}
        {diffs.length > 0 && (
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-gray-300 dark:border-gray-600">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-heading">Total Differences</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-display">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border border-green-300 dark:border-green-700">
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-400 font-heading">Added</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-300 font-display">{stats.added}</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 p-4 rounded-xl border border-red-300 dark:border-red-700">
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-400 font-heading">Removed</p>
              <p className="text-xl sm:text-2xl font-bold text-red-800 dark:text-red-300 font-display">{stats.removed}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 p-4 rounded-xl border border-yellow-300 dark:border-yellow-700">
              <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400 font-heading">Modified</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-800 dark:text-yellow-300 font-display">{stats.modified}</p>
            </div>
          </div>
        )}

        {/* Differences */}
        {diffs.length > 0 && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
              Differences Found
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {diffs.map((diff, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    diff.type === 'added'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-700'
                      : diff.type === 'removed'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <span className="font-mono text-xs sm:text-sm text-gray-900 dark:text-gray-100 break-all flex-1">
                      {diff.path}
                    </span>
                    <span
                      className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap ${
                        diff.type === 'added'
                          ? 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-200'
                          : diff.type === 'removed'
                          ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200'
                          : 'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {diff.type}
                    </span>
                  </div>
                  {diff.type === 'modified' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1.5 font-semibold">Old Value:</p>
                        <pre className="text-[10px] sm:text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                          {formatValue(diff.oldValue)}
                        </pre>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1.5 font-semibold">New Value:</p>
                        <pre className="text-[10px] sm:text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                          {formatValue(diff.newValue)}
                        </pre>
                      </div>
                    </div>
                  )}
                  {diff.type === 'added' && (
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1.5 font-semibold">Value:</p>
                      <pre className="text-[10px] sm:text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                        {formatValue(diff.newValue)}
                      </pre>
                    </div>
                  )}
                  {diff.type === 'removed' && (
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1.5 font-semibold">Value:</p>
                      <pre className="text-[10px] sm:text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                        {formatValue(diff.oldValue)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {diffs.length === 0 && json1 && json2 && !error && (
          <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-400 dark:border-green-700 rounded-xl text-center">
            <div className="text-4xl sm:text-5xl mb-3">✓</div>
            <p className="text-green-800 dark:text-green-300 font-bold text-base sm:text-lg font-heading">
              No differences found
            </p>
            <p className="text-green-700 dark:text-green-400 text-sm mt-1">
              JSON objects are identical
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonDiff;
