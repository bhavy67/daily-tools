import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export const NumberBaseConverter = () => {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');
  const [octal, setOctal] = useState('');

  const convertFromDecimal = (value: string) => {
    setDecimal(value);
    if (value === '') {
      setBinary('');
      setHex('');
      setOctal('');
      return;
    }
    
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setBinary('Invalid');
      setHex('Invalid');
      setOctal('Invalid');
      return;
    }
    
    setBinary(num.toString(2));
    setHex(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
  };

  const convertFromBinary = (value: string) => {
    setBinary(value);
    if (value === '') {
      setDecimal('');
      setHex('');
      setOctal('');
      return;
    }
    
    const num = parseInt(value, 2);
    if (isNaN(num)) {
      setDecimal('Invalid');
      setHex('Invalid');
      setOctal('Invalid');
      return;
    }
    
    setDecimal(num.toString(10));
    setHex(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
  };

  const convertFromHex = (value: string) => {
    setHex(value);
    if (value === '') {
      setDecimal('');
      setBinary('');
      setOctal('');
      return;
    }
    
    const num = parseInt(value, 16);
    if (isNaN(num)) {
      setDecimal('Invalid');
      setBinary('Invalid');
      setOctal('Invalid');
      return;
    }
    
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setOctal(num.toString(8));
  };

  const convertFromOctal = (value: string) => {
    setOctal(value);
    if (value === '') {
      setDecimal('');
      setBinary('');
      setHex('');
      return;
    }
    
    const num = parseInt(value, 8);
    if (isNaN(num)) {
      setDecimal('Invalid');
      setBinary('Invalid');
      setHex('Invalid');
      return;
    }
    
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setHex(num.toString(16).toUpperCase());
  };

  const clearAll = () => {
    setDecimal('');
    setBinary('');
    setHex('');
    setOctal('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Number Base Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert between binary, decimal, hexadecimal, and octal number systems
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Decimal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Decimal (Base 10)
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-mono">
                0-9
              </span>
            </div>
          </div>
          <input
            type="text"
            value={decimal}
            onChange={(e) => convertFromDecimal(e.target.value)}
            placeholder="Enter decimal number..."
            className="input-field font-mono text-lg"
          />
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
        </div>

        {/* Binary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Binary (Base 2)
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-mono">
                0-1
              </span>
            </div>
          </div>
          <input
            type="text"
            value={binary}
            onChange={(e) => convertFromBinary(e.target.value)}
            placeholder="Enter binary number..."
            className="input-field font-mono text-lg"
          />
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
        </div>

        {/* Hexadecimal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Hexadecimal (Base 16)
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-mono">
                0-9, A-F
              </span>
            </div>
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => convertFromHex(e.target.value.toUpperCase())}
            placeholder="Enter hexadecimal number..."
            className="input-field font-mono text-lg"
          />
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
        </div>

        {/* Octal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Octal (Base 8)
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-mono">
                0-7
              </span>
            </div>
          </div>
          <input
            type="text"
            value={octal}
            onChange={(e) => convertFromOctal(e.target.value)}
            placeholder="Enter octal number..."
            className="input-field font-mono text-lg"
          />
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={clearAll}
            className="btn-secondary"
          >
            Clear All
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
            💡 Quick Guide
          </h3>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <p><strong>Binary:</strong> Uses only 0 and 1 (used in computing)</p>
            <p><strong>Octal:</strong> Uses digits 0-7 (less common today)</p>
            <p><strong>Decimal:</strong> Uses digits 0-9 (everyday numbers)</p>
            <p><strong>Hexadecimal:</strong> Uses digits 0-9 and A-F (common in programming)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
