import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const Base64Converter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const encodeBase64 = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setError('');
    } catch (e) {
      setError('Error encoding to Base64. Make sure the input is valid.');
      setOutput('');
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setError('');
    } catch (e) {
      setError('Error decoding Base64. Make sure the input is valid Base64.');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Base64 Encoder / Decoder
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Encode text to Base64 or decode Base64 to text
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <button onClick={encodeBase64} className="btn-primary">
            Encode to Base64
          </button>
          <button onClick={decodeBase64} className="btn-secondary">
            Decode from Base64
          </button>
        </div>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or Base64 string..."
            className="textarea-field h-64 resize-none"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="textarea-field h-64 resize-none"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          About Base64:
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
          It's commonly used for encoding data in email, JSON, XML, and URLs where binary data isn't supported.
        </p>
      </div>
    </div>
  );
};
