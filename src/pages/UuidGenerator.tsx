import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export const UuidGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [version, setVersion] = useState<'v4'>('v4');
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState<number | null>(null);

  // Generate UUID v4
  const generateUuidV4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateUuids = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUuidV4());
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          UUID Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate Universally Unique Identifiers (UUIDs)
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Version
            </label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as 'v4')}
              className="input-field"
            >
              <option value="v4">Version 4 (Random)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Count
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="input-field w-24"
            />
          </div>

          <div className="flex items-end gap-2">
            <button onClick={generateUuids} className="btn-primary">
              <RefreshCw className="w-4 h-4 inline-block mr-2" />
              Generate
            </button>
            {uuids.length > 0 && (
              <button onClick={copyAll} className="btn-secondary">
                {copied === -1 ? (
                  <>
                    <Check className="w-4 h-4 inline-block mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 inline-block mr-2" />
                    Copy All
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Generated UUIDs */}
      {uuids.length > 0 && (
        <div className="space-y-3">
          {uuids.map((uuid, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between"
            >
              <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                {uuid}
              </code>
              <button
                onClick={() => copyToClipboard(uuid, index)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {copied === index ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          About UUIDs:
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          UUID (Universally Unique Identifier) is a 128-bit identifier guaranteed to be unique across space and time.
          Version 4 UUIDs are randomly generated and are the most commonly used type.
        </p>
      </div>
    </div>
  );
};
