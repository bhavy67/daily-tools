import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CaseConverter = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const conversions = {
    'Sentence case': (text: string) => {
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    },
    'lowercase': (text: string) => text.toLowerCase(),
    'UPPERCASE': (text: string) => text.toUpperCase(),
    'Title Case': (text: string) => {
      return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    },
    'camelCase': (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    },
    'PascalCase': (text: string) => {
      const camel = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    },
    'snake_case': (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    },
    'kebab-case': (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    },
    'CONSTANT_CASE': (text: string) => {
      return text
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    },
    'dot.case': (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '.')
        .replace(/^\.+|\.+$/g, '');
    },
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Case Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Convert text between different case formats
        </p>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="textarea-field h-32 resize-none"
        />
      </div>

      {/* Conversions */}
      {input && (
        <div className="space-y-4">
          {Object.entries(conversions).map(([name, converter]) => {
            const converted = converter(input);
            return (
              <div
                key={name}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {name}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(converted, name)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copied === name ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm break-all text-gray-900 dark:text-gray-100">
                  {converted}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Examples */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Examples:
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <div><strong>Input:</strong> hello world</div>
          <div><strong>camelCase:</strong> helloWorld</div>
          <div><strong>snake_case:</strong> hello_world</div>
          <div><strong>kebab-case:</strong> hello-world</div>
        </div>
      </div>
    </div>
  );
};
