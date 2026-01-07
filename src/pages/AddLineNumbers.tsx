import { useState } from 'react';
import { ListOrdered, Copy, Check, Trash2 } from 'lucide-react';

export const AddLineNumbers = () => {
  const [inputText, setInputText] = useState('');
  const [startNumber, setStartNumber] = useState('1');
  const [numberFormat, setNumberFormat] = useState<'number' | 'zero-padded' | 'roman'>('number');
  const [separator, setSeparator] = useState('. ');
  const [skipEmpty, setSkipEmpty] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const toRoman = (num: number): string => {
    const romanNumerals: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    
    let result = '';
    for (const [value, numeral] of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const formatNumber = (num: number, maxDigits: number): string => {
    switch (numberFormat) {
      case 'zero-padded':
        return num.toString().padStart(maxDigits, '0');
      case 'roman':
        return toRoman(num);
      default:
        return num.toString();
    }
  };

  const handleAddNumbers = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n');
    const start = parseInt(startNumber) || 1;
    let lineNumber = start;
    
    // Calculate max digits for zero-padding
    const totalLines = skipEmpty 
      ? lines.filter(line => line.trim()).length 
      : lines.length;
    const maxDigits = (start + totalLines - 1).toString().length;

    const numberedLines = lines.map(line => {
      if (skipEmpty && !line.trim()) {
        return line;
      }
      
      const formatted = formatNumber(lineNumber, maxDigits) + separator + line;
      lineNumber++;
      return formatted;
    });

    setOutputText(numberedLines.join('\n'));
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
    inputLines: inputText ? inputText.split('\n').length : 0,
    numberedLines: outputText ? outputText.split('\n').filter(line => {
      if (skipEmpty) {
        return line.trim().length > 0;
      }
      return true;
    }).length : 0,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add Line Numbers
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add line numbers to your text with various formatting options
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
              placeholder="Paste your text here...&#10;Each line will be numbered&#10;Try adding some lines!"
              className="input-field w-full h-96 font-mono text-sm"
            />
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {stats.inputLines} lines
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          {/* Options */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Number Format
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setNumberFormat('number')}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  numberFormat === 'number'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                1, 2, 3
              </button>
              <button
                onClick={() => setNumberFormat('zero-padded')}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  numberFormat === 'zero-padded'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                01, 02, 03
              </button>
              <button
                onClick={() => setNumberFormat('roman')}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  numberFormat === 'roman'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                I, II, III
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Number
                </label>
                <input
                  type="number"
                  value={startNumber}
                  onChange={(e) => setStartNumber(e.target.value)}
                  min="1"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Separator
                </label>
                <input
                  type="text"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  placeholder=". "
                  className="input-field w-full"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={skipEmpty}
                onChange={(e) => setSkipEmpty(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Skip empty lines (don't number them)
              </span>
            </label>

            <button
              onClick={handleAddNumbers}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ListOrdered className="w-5 h-5" />
              Add Line Numbers
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
              placeholder="Numbered text will appear here..."
              className="input-field w-full h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900"
            />
            {outputText && (
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {stats.numberedLines} line{stats.numberedLines !== 1 ? 's' : ''} numbered
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
          <li>Use zero-padded numbers for better alignment (001, 002, 003)</li>
          <li>Roman numerals are great for formal documents or outlines</li>
          <li>Customize the separator to match your preferred style</li>
          <li>Skip empty lines to number only content lines</li>
          <li>Perfect for code snippets, lists, and documentation</li>
        </ul>
      </div>
    </div>
  );
};
