import React, { useState, useEffect } from 'react';
import { Search, Copy, AlertCircle } from 'lucide-react';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false
  });
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const testRegex = () => {
    setError('');
    setMatches([]);
    setIsValid(false);

    if (!pattern) {
      return;
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('');

      const regex = new RegExp(pattern, flagString);
      setIsValid(true);

      if (testString) {
        const allMatches: RegExpMatchArray[] = [];
        
        if (flags.g) {
          let match;
          const globalRegex = new RegExp(pattern, flagString);
          while ((match = globalRegex.exec(testString)) !== null) {
            allMatches.push(match);
            // Prevent infinite loop on zero-width matches
            if (match.index === globalRegex.lastIndex) {
              globalRegex.lastIndex++;
            }
          }
        } else {
          const match = testString.match(regex);
          if (match) {
            allMatches.push(match);
          }
        }
        
        setMatches(allMatches);
      }
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
    }
  };

  const handleCopyPattern = () => {
    const flagString = Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('');
    navigator.clipboard.writeText(`/${pattern}/${flagString}`);
  };

  const highlightMatches = () => {
    if (!testString || matches.length === 0) return testString;

    let result = testString;
    const sortedMatches = [...matches].sort((a, b) => (b.index || 0) - (a.index || 0));

    sortedMatches.forEach((match) => {
      const matchText = match[0];
      const index = match.index || 0;
      const before = result.substring(0, index);
      const after = result.substring(index + matchText.length);
      result = `${before}<mark class="bg-yellow-300 dark:bg-yellow-600">${matchText}</mark>${after}`;
    });

    return result;
  };

  const examples = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', test: 'Contact us at support@example.com or sales@company.org' },
    { name: 'URL', pattern: 'https?://[^\\s]+', test: 'Visit https://example.com or http://test.org for more info' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{4}', test: 'Call (555) 123-4567 or 555-987-6543' },
    { name: 'Hex Color', pattern: '#[0-9a-fA-F]{6}\\b', test: 'Colors: #FF5733, #00FF00, #123ABC' },
    { name: 'IP Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', test: 'Server IPs: 192.168.1.1, 10.0.0.1' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', test: 'Dates: 2024-01-15, 2023-12-25' }
  ];

  const handleExample = (example: typeof examples[0]) => {
    setPattern(example.pattern);
    setTestString(example.test);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Regex Tester
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Test and debug your regular expressions
        </p>

        {/* Pattern Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Regular Expression Pattern
          </label>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-gray-500">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-2xl text-gray-500">/</span>
            <button
              onClick={handleCopyPattern}
              disabled={!pattern}
              className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Flags */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Flags
          </label>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.entries(flags).map(([flag, enabled]) => (
              <label key={flag} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {flag} - {
                    flag === 'g' ? 'global' :
                    flag === 'i' ? 'case insensitive' :
                    flag === 'm' ? 'multiline' :
                    flag === 's' ? 'dotAll' :
                    flag === 'u' ? 'unicode' :
                    'sticky'
                  }
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Validation Status */}
        {pattern && (
          <div className={`mb-4 p-3 rounded-lg border ${
            isValid
              ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
              : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
          }`}>
            <div className="flex items-center gap-2">
              {isValid ? (
                <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                isValid
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-red-700 dark:text-red-400'
              }`}>
                {isValid ? 'Valid RegEx' : `Invalid RegEx: ${error}`}
              </span>
            </div>
          </div>
        )}

        {/* Test String */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Test String
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter test string..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Highlighted Result */}
        {testString && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Result with Highlights
            </label>
            <div
              className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm whitespace-pre-wrap break-words min-h-[8rem]"
              dangerouslySetInnerHTML={{ __html: highlightMatches() }}
            />
          </div>
        )}

        {/* Match Details */}
        {matches.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Matches ({matches.length})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {matches.map((match, index) => (
                <div key={index} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Match #{index + 1}:
                      </span>
                      <code className="ml-2 text-blue-600 dark:text-blue-400 font-mono">
                        {match[0]}
                      </code>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Index: {match.index}
                    </span>
                  </div>
                  {match.length > 1 && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Groups:</span>
                      {match.slice(1).map((group, i) => (
                        <span key={i} className="ml-2 font-mono">
                          ${i + 1}: {group || '(empty)'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Patterns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExample(example)}
                className="text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {example.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono truncate">
                  {example.pattern}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;
