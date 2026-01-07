import React, { useState } from 'react';
import { CheckCircle, XCircle, FileUp, AlertTriangle } from 'lucide-react';

const JsonValidator: React.FC = () => {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);

  const validateJson = () => {
    setError('');
    setStats(null);
    
    if (!input.trim()) {
      setIsValid(null);
      setError('Please enter JSON to validate');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setIsValid(true);
      
      // Calculate stats
      const jsonString = JSON.stringify(parsed, null, 2);
      const lines = jsonString.split('\n').length;
      const depth = calculateDepth(parsed);
      const keys = countKeys(parsed);
      const arrays = countArrays(parsed);
      
      setStats({
        size: input.length,
        lines,
        depth,
        keys,
        arrays,
        type: Array.isArray(parsed) ? 'Array' : typeof parsed === 'object' ? 'Object' : typeof parsed
      });
    } catch (err) {
      setIsValid(false);
      const errorMessage = (err as Error).message;
      const match = errorMessage.match(/position (\d+)/);
      if (match) {
        const position = parseInt(match[1]);
        const lineNumber = input.substring(0, position).split('\n').length;
        setError(`Invalid JSON at line ${lineNumber}: ${errorMessage}`);
      } else {
        setError(`Invalid JSON: ${errorMessage}`);
      }
    }
  };

  const calculateDepth = (obj: any, currentDepth = 1): number => {
    if (typeof obj !== 'object' || obj === null) return currentDepth;
    
    const depths = Object.values(obj).map(value => 
      calculateDepth(value, currentDepth + 1)
    );
    
    return depths.length > 0 ? Math.max(...depths) : currentDepth;
  };

  const countKeys = (obj: any): number => {
    if (typeof obj !== 'object' || obj === null) return 0;
    
    let count = Object.keys(obj).length;
    Object.values(obj).forEach(value => {
      count += countKeys(value);
    });
    
    return count;
  };

  const countArrays = (obj: any): number => {
    if (typeof obj !== 'object' || obj === null) return 0;
    
    let count = Array.isArray(obj) ? 1 : 0;
    Object.values(obj).forEach(value => {
      count += countArrays(value);
    });
    
    return count;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target?.result as string);
        setIsValid(null);
        setError('');
        setStats(null);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setInput('');
    setIsValid(null);
    setError('');
    setStats(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          JSON Validator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Validate and analyze your JSON structure
        </p>

        {/* Input Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 min-h-[40px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Input JSON
            </label>
            <label className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer" title="Upload file">
              <FileUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <input
                type="file"
                accept=".json"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsValid(null);
              setError('');
              setStats(null);
            }}
            placeholder="Paste your JSON here..."
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={validateJson}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Validate JSON
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Validation Result */}
        {isValid !== null && (
          <div className={`p-4 rounded-lg border ${
            isValid 
              ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
              : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
          }`}>
            <div className="flex items-center gap-2">
              {isValid ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-400 font-medium">
                    Valid JSON
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-700 dark:text-red-400 font-medium">
                    Invalid JSON
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Display */}
        {stats && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              JSON Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.type}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Size</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.size} bytes
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Lines</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.lines}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Depth</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.depth}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Keys</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.keys}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Arrays</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.arrays}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonValidator;
