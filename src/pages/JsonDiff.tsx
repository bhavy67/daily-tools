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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          JSON Diff Checker
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compare two JSON objects and see the differences
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* JSON 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                JSON 1 (Original)
              </label>
              <label className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                <FileUp className="inline-block w-4 h-4 mr-1" />
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
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* JSON 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                JSON 2 (Comparison)
              </label>
              <label className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                <FileUp className="inline-block w-4 h-4 mr-1" />
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
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleCompare}
            disabled={!json1 || !json2}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <GitCompare className="inline-block w-5 h-5 mr-2" />
            Compare JSON
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Stats */}
        {diffs.length > 0 && (
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Differences</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">Added</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.added}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">Removed</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.removed}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Modified</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{stats.modified}</p>
            </div>
          </div>
        )}

        {/* Differences */}
        {diffs.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Differences
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {diffs.map((diff, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    diff.type === 'added'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                      : diff.type === 'removed'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                      {diff.path}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        diff.type === 'added'
                          ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                          : diff.type === 'removed'
                          ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                          : 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                      }`}
                    >
                      {diff.type.toUpperCase()}
                    </span>
                  </div>
                  {diff.type === 'modified' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Old Value:</p>
                        <pre className="text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded">
                          {formatValue(diff.oldValue)}
                        </pre>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">New Value:</p>
                        <pre className="text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded">
                          {formatValue(diff.newValue)}
                        </pre>
                      </div>
                    </div>
                  )}
                  {diff.type === 'added' && (
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Value:</p>
                      <pre className="text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded">
                        {formatValue(diff.newValue)}
                      </pre>
                    </div>
                  )}
                  {diff.type === 'removed' && (
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Value:</p>
                      <pre className="text-xs font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded">
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
          <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-center">
            <p className="text-green-700 dark:text-green-400 font-medium">
              ✓ No differences found - JSON objects are identical
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonDiff;
