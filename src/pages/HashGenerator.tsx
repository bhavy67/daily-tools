import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import CryptoJS from 'crypto-js';

export const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const hashes = {
    'MD5': input ? CryptoJS.MD5(input).toString() : '',
    'SHA-1': input ? CryptoJS.SHA1(input).toString() : '',
    'SHA-256': input ? CryptoJS.SHA256(input).toString() : '',
    'SHA-512': input ? CryptoJS.SHA512(input).toString() : '',
    'SHA-3': input ? CryptoJS.SHA3(input).toString() : '',
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
          Hash Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512, SHA-3)
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
          placeholder="Enter text to generate hashes..."
          className="textarea-field h-32 resize-none"
        />
      </div>

      {/* Hash Results */}
      <div className="space-y-4">
        {Object.entries(hashes).map(([algorithm, hash]) => (
          <div
            key={algorithm}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {algorithm}
              </h3>
              {hash && (
                <button
                  onClick={() => copyToClipboard(hash, algorithm)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied === algorithm ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              )}
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm break-all">
              {hash || (
                <span className="text-gray-400 dark:text-gray-500">
                  Hash will appear here...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          ⚠️ Important Security Note:
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          MD5 and SHA-1 are considered cryptographically broken and should not be used for security purposes.
          Use SHA-256 or SHA-512 for password hashing and security-critical applications.
          For password storage, use proper password hashing algorithms like bcrypt, scrypt, or Argon2.
        </p>
      </div>
    </div>
  );
};
