import React, { useState } from 'react';
import { Replace, Copy, Check } from 'lucide-react';

const FindReplace: React.FC = () => {
  const [input, setInput] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    caseSensitive: false,
    wholeWord: false,
    regex: false,
    global: true
  });
  const [matchCount, setMatchCount] = useState(0);

  const handleReplace = () => {
    if (!input || !findText) {
      setOutput(input);
      setMatchCount(0);
      return;
    }

    try {
      let result = input;
      let count = 0;

      if (options.regex) {
        const flags = (options.global ? 'g' : '') + (options.caseSensitive ? '' : 'i');
        const regex = new RegExp(findText, flags);
        const matches = input.match(regex);
        count = matches ? matches.length : 0;
        result = input.replace(regex, replaceText);
      } else {
        let searchText = findText;
        if (options.wholeWord) {
          searchText = `\\b${findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
        } else {
          searchText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        const flags = (options.global ? 'g' : '') + (options.caseSensitive ? '' : 'i');
        const regex = new RegExp(searchText, flags);
        const matches = input.match(regex);
        count = matches ? matches.length : 0;
        result = input.replace(regex, replaceText);
      }

      setOutput(result);
      setMatchCount(count);
    } catch (error) {
      setOutput(input);
      setMatchCount(0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setFindText('');
    setReplaceText('');
    setOutput('');
    setMatchCount(0);
  };

  const highlightMatches = () => {
    if (!input || !findText) return input;

    try {
      let searchText = findText;
      if (options.regex) {
        const flags = 'g' + (options.caseSensitive ? '' : 'i');
        const regex = new RegExp(findText, flags);
        return input.replace(regex, (match) => 
          `<mark class="bg-yellow-300 dark:bg-yellow-600">${match}</mark>`
        );
      } else {
        if (options.wholeWord) {
          searchText = `\\b${findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
        } else {
          searchText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        const flags = 'g' + (options.caseSensitive ? '' : 'i');
        const regex = new RegExp(searchText, flags);
        return input.replace(regex, (match) => 
          `<mark class="bg-yellow-300 dark:bg-yellow-600">${match}</mark>`
        );
      }
    } catch {
      return input;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Find & Replace
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Find and replace text with support for regex and advanced options
        </p>

        {/* Find and Replace Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Find Text
            </label>
            <input
              type="text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Enter text to find..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Replace With
            </label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Enter replacement text..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Options */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Options
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.caseSensitive}
                onChange={(e) => setOptions({ ...options, caseSensitive: e.target.checked })}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Case Sensitive
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.wholeWord}
                onChange={(e) => setOptions({ ...options, wholeWord: e.target.checked })}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Whole Word
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.regex}
                onChange={(e) => setOptions({ ...options, regex: e.target.checked })}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Use Regex
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.global}
                onChange={(e) => setOptions({ ...options, global: e.target.checked })}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Replace All
              </span>
            </label>
          </div>
        </div>

        {/* Input Text */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Preview with Highlights */}
        {input && findText && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Preview (Matches Highlighted)
              </label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {matchCount} match{matchCount !== 1 ? 'es' : ''} found
              </span>
            </div>
            <div
              className="w-full min-h-[12rem] p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: highlightMatches() }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleReplace}
            disabled={!input || !findText}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Replace className="inline-block w-5 h-5 mr-2" />
            Replace
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Output */}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Result
              </label>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm"
            />
          </div>
        )}

        {/* Info */}
        {options.regex && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Regex Mode Enabled
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Use regex patterns like <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">\d+</code> for digits, 
              <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded ml-1">\w+</code> for words, or 
              <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded ml-1">(pattern)</code> for capture groups.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindReplace;
