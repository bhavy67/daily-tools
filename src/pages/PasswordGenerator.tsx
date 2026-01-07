import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      setPassword('Please select at least one character type');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = (pwd: string): { strength: string; color: string } => {
    if (!pwd || pwd.length < 8) return { strength: 'Weak', color: 'red' };
    if (pwd.length < 12) return { strength: 'Fair', color: 'orange' };
    if (pwd.length < 16) return { strength: 'Good', color: 'yellow' };
    return { strength: 'Strong', color: 'green' };
  };

  const strength = getPasswordStrength(password);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Password Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate secure random passwords
        </p>
      </div>

      {/* Password Display */}
      {password && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Password
            </h3>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-lg break-all text-gray-900 dark:text-gray-100 mb-3">
            {password}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Strength:</span>
            <span className={`text-sm font-semibold text-${strength.color}-600`}>
              {strength.strength}
            </span>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Options
        </h3>

        <div className="space-y-4">
          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Include Uppercase (A-Z)
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Include Lowercase (a-z)
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Include Numbers (0-9)
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Include Symbols (!@#$%^&*)
              </span>
            </label>
          </div>
        </div>

        <button onClick={generatePassword} className="btn-primary w-full mt-6">
          Generate Password
        </button>
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Password Security Tips:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Use at least 12 characters for better security</li>
          <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
          <li>• Avoid using personal information or common words</li>
          <li>• Use a unique password for each account</li>
          <li>• Consider using a password manager</li>
        </ul>
      </div>
    </div>
  );
};
