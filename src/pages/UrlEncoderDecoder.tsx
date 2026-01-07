import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const UrlEncoderDecoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeUrl = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (e) {
      setOutput('Error encoding URL');
    }
  };

  const decodeUrl = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (e) {
      setOutput('Error decoding URL');
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
          URL Encoder / Decoder
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Encode and decode URL/URI components
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <button onClick={encodeUrl} className="btn-primary">
            Encode URL
          </button>
          <button onClick={decodeUrl} className="btn-secondary">
            Decode URL
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
            placeholder="Enter text or URL to encode/decode..."
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

      {/* Examples */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Examples:
        </h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <div>
            <strong>Original:</strong> <code>Hello World!</code>
          </div>
          <div>
            <strong>Encoded:</strong> <code>Hello%20World%21</code>
          </div>
          <div className="pt-2">
            <strong>Original:</strong> <code>user@example.com</code>
          </div>
          <div>
            <strong>Encoded:</strong> <code>user%40example.com</code>
          </div>
        </div>
      </div>
    </div>
  );
};
