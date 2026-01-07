import { useState } from 'react';

export const TextDiff = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<{ type: 'equal' | 'added' | 'removed'; value: string }[]>([]);

  const computeDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: { type: 'equal' | 'added' | 'removed'; value: string }[] = [];

    const maxLen = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];

      if (line1 === line2) {
        if (line1 !== undefined) {
          result.push({ type: 'equal', value: line1 });
        }
      } else {
        if (line1 !== undefined && line2 === undefined) {
          result.push({ type: 'removed', value: line1 });
        } else if (line1 === undefined && line2 !== undefined) {
          result.push({ type: 'added', value: line2 });
        } else if (line1 !== line2) {
          result.push({ type: 'removed', value: line1 });
          result.push({ type: 'added', value: line2 });
        }
      }
    }

    setDiff(result);
  };

  const getStats = () => {
    const added = diff.filter(d => d.type === 'added').length;
    const removed = diff.filter(d => d.type === 'removed').length;
    const unchanged = diff.filter(d => d.type === 'equal').length;
    return { added, removed, unchanged };
  };

  const stats = getStats();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Text Diff Checker
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Compare two texts and see the differences
        </p>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Original Text
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter original text..."
            className="textarea-field h-64 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Modified Text
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter modified text..."
            className="textarea-field h-64 resize-none"
          />
        </div>
      </div>

      {/* Compare Button */}
      <div className="mb-6">
        <button onClick={computeDiff} className="btn-primary">
          Compare Texts
        </button>
      </div>

      {/* Stats */}
      {diff.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 dark:bg-green-900 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Added: {stats.added}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 dark:bg-red-900 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Removed: {stats.removed}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Unchanged: {stats.unchanged}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Diff Output */}
      {diff.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Differences
            </h3>
          </div>
          <div className="p-4 font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
            {diff.map((line, index) => (
              <div
                key={index}
                className={`py-1 px-2 ${
                  line.type === 'added'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : line.type === 'removed'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="inline-block w-6">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </span>
                {line.value || ' '}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          How to use:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <span className="text-green-600 dark:text-green-400">Green lines</span> are additions in the modified text</li>
          <li>• <span className="text-red-600 dark:text-red-400">Red lines</span> are deletions from the original text</li>
          <li>• Gray lines are unchanged</li>
          <li>• Comparison is done line-by-line</li>
        </ul>
      </div>
    </div>
  );
};
