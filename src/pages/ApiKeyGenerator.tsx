import React, { useState } from 'react';
import { Key, Copy, RefreshCw } from 'lucide-react';

const ApiKeyGenerator: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<string[]>([]);
  const [options, setOptions] = useState({
    length: 32,
    prefix: '',
    format: 'base64'
  });
  const [count, setCount] = useState(1);

  const generateKey = (format: string, length: number, prefix: string): string => {
    let key = '';
    
    if (format === 'hex') {
      for (let i = 0; i < length; i++) {
        key += Math.floor(Math.random() * 16).toString(16);
      }
    } else if (format === 'base64') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } else if (format === 'alphanumeric') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } else if (format === 'uuid') {
      key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    
    return prefix ? `${prefix}_${key}` : key;
  };

  const handleGenerate = () => {
    const keys: string[] = [];
    for (let i = 0; i < count; i++) {
      keys.push(generateKey(options.format, options.length, options.prefix));
    }
    setApiKeys(keys);
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(apiKeys.join('\n'));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          API Key Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Generate secure random API keys for your applications
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format
            </label>
            <select
              value={options.format}
              onChange={(e) => setOptions({ ...options, format: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            >
              <option value="base64">Base64</option>
              <option value="hex">Hexadecimal</option>
              <option value="alphanumeric">Alphanumeric</option>
              <option value="uuid">UUID v4</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Length {options.format !== 'uuid' && `(${options.length} characters)`}
            </label>
            <input
              type="range"
              min="16"
              max="64"
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
              disabled={options.format === 'uuid'}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prefix (optional)
            </label>
            <input
              type="text"
              value={options.prefix}
              onChange={(e) => setOptions({ ...options, prefix: e.target.value })}
              placeholder="e.g., sk, pk, api"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Keys
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium mb-6"
        >
          <Key className="inline-block w-5 h-5 mr-2" />
          Generate API Key{count > 1 ? 's' : ''}
        </button>

        {/* Generated Keys */}
        {apiKeys.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated API Keys
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyAll}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                >
                  <Copy className="inline-block w-4 h-4 mr-1" />
                  Copy All
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
                >
                  <RefreshCw className="inline-block w-4 h-4 mr-1" />
                  Regenerate
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {apiKeys.map((key, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <code className="flex-1 text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                    {key}
                  </code>
                  <button
                    onClick={() => handleCopy(key)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
            Security Notice
          </h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-400">
            Always store API keys securely and never commit them to version control. Use environment variables or secure key management systems in production.
          </p>
        </div>

        {/* Examples */}
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Common Formats
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-mono">
            <li>• Base64: <code className="text-blue-600 dark:text-blue-400">sk_abc123XYZ+/...</code></li>
            <li>• Hex: <code className="text-blue-600 dark:text-blue-400">pk_a1b2c3d4e5f6...</code></li>
            <li>• Alphanumeric: <code className="text-blue-600 dark:text-blue-400">api_AbC123XyZ...</code></li>
            <li>• UUID: <code className="text-blue-600 dark:text-blue-400">550e8400-e29b-41d4-a716-446655440000</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyGenerator;
