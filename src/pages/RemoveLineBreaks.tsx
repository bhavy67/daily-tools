import { useState } from 'react';
import { WrapText, Copy, Check, Trash2 } from 'lucide-react';

export const RemoveLineBreaks = () => {
  const [inputText, setInputText] = useState('');
  const [removeType, setRemoveType] = useState<'all' | 'extra' | 'custom'>('all');
  const [replacementChar, setReplacementChar] = useState(' ');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRemove = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;

    switch (removeType) {
      case 'all':
        // Remove all line breaks
        result = inputText.replace(/\r?\n/g, replacementChar);
        break;
      case 'extra':
        // Remove extra line breaks (keep single line breaks, remove multiple)
        result = inputText.replace(/\r?\n\r?\n+/g, '\n');
        break;
      case 'custom':
        // Replace line breaks with custom character
        result = inputText.replace(/\r?\n/g, replacementChar);
        break;
    }

    setOutputText(result);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const stats = {
    inputLines: inputText ? inputText.split(/\r?\n/).length : 0,
    outputLines: outputText ? outputText.split(/\r?\n/).length : 0,
    inputChars: inputText.length,
    outputChars: outputText.length,
    removedLines: inputText ? inputText.split(/\r?\n/).length - (outputText ? outputText.split(/\r?\n/).length : 0) : 0,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Remove Line Breaks
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Remove or replace line breaks from your text
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Input Text
              </h3>
              <button
                onClick={handleClear}
                className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text with line breaks here..."
              className="input-field w-full h-96 font-mono text-sm"
            />
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{stats.inputLines} lines</span>
              <span>•</span>
              <span>{stats.inputChars} characters</span>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          {/* Options */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Remove Mode
            </label>
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="all"
                  checked={removeType === 'all'}
                  onChange={(e) => setRemoveType(e.target.value as 'all')}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Remove All Line Breaks
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Combine all lines into one
                  </div>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="extra"
                  checked={removeType === 'extra'}
                  onChange={(e) => setRemoveType(e.target.value as 'extra')}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Remove Extra Line Breaks
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Keep single line breaks, remove multiple
                  </div>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="custom"
                  checked={removeType === 'custom'}
                  onChange={(e) => setRemoveType(e.target.value as 'custom')}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Replace with Custom Character
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Replace line breaks with your chosen character
                  </div>
                </div>
              </label>
            </div>

            {(removeType === 'all' || removeType === 'custom') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Replacement Character
                </label>
                <input
                  type="text"
                  value={replacementChar}
                  onChange={(e) => setReplacementChar(e.target.value)}
                  placeholder="Space, comma, etc."
                  className="input-field w-full"
                />
              </div>
            )}

            <button
              onClick={handleRemove}
              className="mt-4 w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <WrapText className="w-5 h-5" />
              Remove Line Breaks
            </button>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Output
              </h3>
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Processed text will appear here..."
              className="input-field w-full h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900"
            />
            {outputText && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{stats.outputLines} lines</span>
                  <span>•</span>
                  <span>{stats.outputChars} characters</span>
                </div>
                {stats.removedLines > 0 && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    ✓ Removed {stats.removedLines} line break{stats.removedLines !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Use "Remove All" to create a single continuous line of text</li>
          <li>Use "Remove Extra" to clean up text with multiple consecutive line breaks</li>
          <li>Replace with custom characters like commas, semicolons, or spaces</li>
          <li>Great for cleaning up copied text from PDFs or web pages</li>
        </ul>
      </div>
    </div>
  );
};
