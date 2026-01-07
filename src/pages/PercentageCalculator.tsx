import { useState } from 'react';
import { Calculator } from 'lucide-react';

export const PercentageCalculator = () => {
  // What is X% of Y?
  const [percentOf, setPercentOf] = useState({ percent: '', value: '' });
  const [percentOfResult, setPercentOfResult] = useState('');

  // X is what % of Y?
  const [whatPercent, setWhatPercent] = useState({ value: '', total: '' });
  const [whatPercentResult, setWhatPercentResult] = useState('');

  // X is Y% of what?
  const [percentOfWhat, setPercentOfWhat] = useState({ value: '', percent: '' });
  const [percentOfWhatResult, setPercentOfWhatResult] = useState('');

  // Percentage Change
  const [percentChange, setPercentChange] = useState({ from: '', to: '' });
  const [percentChangeResult, setPercentChangeResult] = useState('');

  const calculatePercentOf = () => {
    const percent = parseFloat(percentOf.percent);
    const value = parseFloat(percentOf.value);
    if (!isNaN(percent) && !isNaN(value)) {
      const result = (percent / 100) * value;
      setPercentOfResult(result.toFixed(2));
    }
  };

  const calculateWhatPercent = () => {
    const value = parseFloat(whatPercent.value);
    const total = parseFloat(whatPercent.total);
    if (!isNaN(value) && !isNaN(total) && total !== 0) {
      const result = (value / total) * 100;
      setWhatPercentResult(result.toFixed(2) + '%');
    }
  };

  const calculatePercentOfWhat = () => {
    const value = parseFloat(percentOfWhat.value);
    const percent = parseFloat(percentOfWhat.percent);
    if (!isNaN(value) && !isNaN(percent) && percent !== 0) {
      const result = (value * 100) / percent;
      setPercentOfWhatResult(result.toFixed(2));
    }
  };

  const calculatePercentChange = () => {
    const from = parseFloat(percentChange.from);
    const to = parseFloat(percentChange.to);
    if (!isNaN(from) && !isNaN(to) && from !== 0) {
      const change = ((to - from) / from) * 100;
      const isIncrease = change > 0;
      setPercentChangeResult(
        `${isIncrease ? '+' : ''}${change.toFixed(2)}% (${isIncrease ? 'Increase' : 'Decrease'})`
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Percentage Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate percentages, percentage changes, and more
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What is X% of Y? */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              What is X% of Y?
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 dark:text-gray-300">What is</span>
              <input
                type="number"
                value={percentOf.percent}
                onChange={(e) => setPercentOf({ ...percentOf, percent: e.target.value })}
                placeholder="0"
                className="input-field w-24 text-center"
              />
              <span className="text-gray-700 dark:text-gray-300">% of</span>
              <input
                type="number"
                value={percentOf.value}
                onChange={(e) => setPercentOf({ ...percentOf, value: e.target.value })}
                placeholder="0"
                className="input-field w-24 text-center"
              />
              <span className="text-gray-700 dark:text-gray-300">?</span>
            </div>
            <button onClick={calculatePercentOf} className="btn-primary w-full">
              Calculate
            </button>
            {percentOfResult && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-sm text-blue-800 dark:text-blue-200 mb-1">Result:</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {percentOfResult}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* X is what % of Y? */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              X is what % of Y?
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={whatPercent.value}
                onChange={(e) => setWhatPercent({ ...whatPercent, value: e.target.value })}
                placeholder="0"
                className="input-field w-24 text-center"
              />
              <span className="text-gray-700 dark:text-gray-300">is what % of</span>
              <input
                type="number"
                value={whatPercent.total}
                onChange={(e) => setWhatPercent({ ...whatPercent, total: e.target.value })}
                placeholder="0"
                className="input-field w-24 text-center"
              />
              <span className="text-gray-700 dark:text-gray-300">?</span>
            </div>
            <button onClick={calculateWhatPercent} className="btn-primary w-full">
              Calculate
            </button>
            {whatPercentResult && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-sm text-green-800 dark:text-green-200 mb-1">Result:</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {whatPercentResult}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* X is Y% of what? */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              X is Y% of what?
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={percentOfWhat.value}
                onChange={(e) => setPercentOfWhat({ ...percentOfWhat, value: e.target.value })}
                placeholder="0"
                className="input-field w-24 text-center"
              />
              <span className="text-gray-700 dark:text-gray-300">is</span>
              <input
                type="number"
                value={percentOfWhat.percent}
                onChange={(e) => setPercentOfWhat({ ...percentOfWhat, percent: e.target.value })}
                placeholder="0"
                className="input-field w-24 text-center"
              />
              <span className="text-gray-700 dark:text-gray-300">% of what?</span>
            </div>
            <button onClick={calculatePercentOfWhat} className="btn-primary w-full">
              Calculate
            </button>
            {percentOfWhatResult && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="text-sm text-purple-800 dark:text-purple-200 mb-1">Result:</div>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {percentOfWhatResult}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Percentage Change */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Percentage Change
            </h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300 w-20">From:</span>
                <input
                  type="number"
                  value={percentChange.from}
                  onChange={(e) => setPercentChange({ ...percentChange, from: e.target.value })}
                  placeholder="0"
                  className="input-field flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300 w-20">To:</span>
                <input
                  type="number"
                  value={percentChange.to}
                  onChange={(e) => setPercentChange({ ...percentChange, to: e.target.value })}
                  placeholder="0"
                  className="input-field flex-1"
                />
              </div>
            </div>
            <button onClick={calculatePercentChange} className="btn-primary w-full">
              Calculate Change
            </button>
            {percentChangeResult && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="text-sm text-orange-800 dark:text-orange-200 mb-1">Change:</div>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {percentChangeResult}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 Common Percentage Calculations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800 dark:text-blue-200">
          <div>• Sales discounts and markups</div>
          <div>• Tax calculations</div>
          <div>• Tip calculations</div>
          <div>• Grade percentages</div>
          <div>• Financial ratios</div>
          <div>• Statistics and data analysis</div>
        </div>
      </div>
    </div>
  );
};
