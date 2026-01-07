import React, { useState } from 'react';
import { Link2, Copy, RefreshCw, Check } from 'lucide-react';

const UrlSlugGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    lowercase: true,
    separator: '-',
    removeSpecialChars: true,
    maxLength: 100
  });

  const generateSlug = (text: string) => {
    let slug = text;

    // Convert to lowercase
    if (options.lowercase) {
      slug = slug.toLowerCase();
    }

    // Remove accents and diacritics
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Remove special characters
    if (options.removeSpecialChars) {
      slug = slug.replace(/[^\w\s-]/g, '');
    }

    // Replace spaces and multiple separators with chosen separator
    slug = slug.trim()
      .replace(/[\s_]+/g, options.separator)
      .replace(new RegExp(`\\${options.separator}+`, 'g'), options.separator);

    // Remove leading/trailing separators
    slug = slug.replace(new RegExp(`^\\${options.separator}+|\\${options.separator}+$`, 'g'), '');

    // Limit length
    if (options.maxLength && slug.length > options.maxLength) {
      slug = slug.substring(0, options.maxLength);
      // Remove trailing separator after truncation
      slug = slug.replace(new RegExp(`\\${options.separator}+$`, 'g'), '');
    }

    return slug;
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      setSlug(generateSlug(value));
    } else {
      setSlug('');
    }
  };

  const handleOptionChange = (key: string, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    if (input.trim()) {
      setSlug(generateSlug(input));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setSlug('');
  };

  const examples = [
    'Hello World!',
    'The Quick Brown Fox Jumps Over The Lazy Dog',
    'Café & Restaurant - Paris, France',
    'C++ Programming Tutorial #1',
    'São Paulo: A Beautiful City',
    '10 Tips for Better SEO in 2024'
  ];

  const handleExample = (example: string) => {
    setInput(example);
    setSlug(generateSlug(example));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          URL Slug Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Convert text into SEO-friendly URL slugs
        </p>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter text to convert to URL slug..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Options */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => handleOptionChange('lowercase', e.target.checked)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Convert to lowercase
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.removeSpecialChars}
                  onChange={(e) => handleOptionChange('removeSpecialChars', e.target.checked)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Remove special characters
                </span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Separator
              </label>
              <select
                value={options.separator}
                onChange={(e) => handleOptionChange('separator', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Dot (.)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Max Length
              </label>
              <input
                type="number"
                value={options.maxLength}
                onChange={(e) => handleOptionChange('maxLength', parseInt(e.target.value) || 100)}
                min="10"
                max="200"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated Slug
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!slug}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 min-h-[3rem] flex items-center">
            {slug ? (
              <div className="flex items-center gap-2 flex-wrap">
                <Link2 className="w-5 h-5 text-gray-400" />
                <code className="text-blue-600 dark:text-blue-400 font-mono text-lg break-all">
                  {slug}
                </code>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Your URL slug will appear here...</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <RefreshCw className="inline-block w-5 h-5 mr-2" />
            Clear
          </button>
        </div>

        {/* Examples */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Try Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExample(example)}
                className="text-left p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <p className="text-sm text-gray-900 dark:text-gray-100 mb-1">{example}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                  → {generateSlug(example)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            What is a URL Slug?
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-400">
            A URL slug is the part of a URL that identifies a particular page on a website in a readable format. 
            It's typically lowercase, uses hyphens instead of spaces, and contains only alphanumeric characters. 
            Good slugs are SEO-friendly and improve user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrlSlugGenerator;
