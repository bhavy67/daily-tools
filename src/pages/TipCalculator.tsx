import { useState } from 'react';
import { IndianRupee, Users } from 'lucide-react';

export const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState('10');
  const [numPeople, setNumPeople] = useState('1');
  const [customTip, setCustomTip] = useState('');

  const tipPresets = [
    { label: '5%', value: '5' },
    { label: '10%', value: '10' },
    { label: '15%', value: '15' },
    { label: '18%', value: '18' },
    { label: '20%', value: '20' },
  ];

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = parseFloat(customTip || tipPercent) || 0;
    const people = parseInt(numPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;

    return {
      tipAmount,
      total,
      perPerson,
      tipPerPerson,
    };
  };

  const result = calculateTip();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tip Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate tips and split bills easily
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Bill Amount */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <IndianRupee className="w-4 h-4 inline-block mr-2" />
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xl">
                ₹
              </span>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="input-field w-full pl-8 text-xl"
              />
            </div>
          </div>

          {/* Tip Percentage */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tip Percentage
            </label>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {tipPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => {
                    setTipPercent(preset.value);
                    setCustomTip('');
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    tipPercent === preset.value && !customTip
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-2">
                Custom Tip %
              </label>
              <input
                type="number"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Enter custom %"
                min="0"
                max="100"
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Number of People */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Users className="w-4 h-4 inline-block mr-2" />
              Number of People
            </label>
            <input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              placeholder="1"
              min="1"
              className="input-field w-full"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Bill Amount:</span>
                <span className="text-xl font-bold">{formatCurrency(parseFloat(billAmount) || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Tip ({customTip || tipPercent}%):</span>
                <span className="text-xl font-bold">{formatCurrency(result.tipAmount)}</span>
              </div>
              <div className="border-t border-white/30 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-3xl font-bold">{formatCurrency(result.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Per Person Breakdown */}
          {parseInt(numPeople) > 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Per Person ({numPeople} people)
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="text-sm text-green-800 dark:text-green-200 mb-1">
                    Total per person
                  </div>
                  <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {formatCurrency(result.perPerson)}
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                    Tip per person
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {formatCurrency(result.tipPerPerson)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              💡 Tipping Guide
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Basic Service:</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="flex justify-between">
                <span>Good Service:</span>
                <span className="font-medium">10%</span>
              </div>
              <div className="flex justify-between">
                <span>Great Service:</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex justify-between">
                <span>Exceptional:</span>
                <span className="font-medium">20%+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 Tip
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Tipping customs vary by country and region. In India, 5-10% is common for restaurant 
          service, though 10% is becoming standard in upscale restaurants. Always check if service 
          charge is already included in your bill before adding a tip.
        </p>
      </div>
    </div>
  );
};
