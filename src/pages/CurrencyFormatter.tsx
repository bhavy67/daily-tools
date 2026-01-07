import { useState } from 'react';
import { IndianRupee, Copy, Check } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  locale: string;
}

const currencies: Currency[] = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN' },
  { code: 'USD', name: 'US Dollar', symbol: 'US$', locale: 'en-US' },
  { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE' },
  { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', locale: 'ja-JP' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', locale: 'zh-CN' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', locale: 'en-AU' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', locale: 'en-CA' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', locale: 'de-CH' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', locale: 'sv-SE' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', locale: 'en-NZ' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', locale: 'en-SG' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', locale: 'en-HK' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', locale: 'nb-NO' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', locale: 'ko-KR' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', locale: 'es-MX' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', locale: 'pt-BR' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', locale: 'en-ZA' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', locale: 'ru-RU' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', locale: 'ar-AE' },
];

export const CurrencyFormatter = () => {
  const [amount, setAmount] = useState('1234.56');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [useSymbol, setUseSymbol] = useState(true);
  const [useGrouping, setUseGrouping] = useState(true);
  const [decimals, setDecimals] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatCurrency = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return 'Invalid amount';

    const formatter = new Intl.NumberFormat(selectedCurrency.locale, {
      style: 'currency',
      currency: selectedCurrency.code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: useGrouping,
      currencyDisplay: useSymbol ? 'symbol' : 'code',
    });

    return formatter.format(numAmount);
  };

  const formattedValue = formatCurrency();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const examples = [
    { amount: '1234.56', label: 'Standard' },
    { amount: '1000000', label: 'Million' },
    { amount: '0.99', label: 'Cents' },
    { amount: '99.99', label: 'Price' },
    { amount: '12345678.90', label: 'Large' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Currency Formatter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Format numbers as currency with locale-specific formatting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Amount Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              step="0.01"
              className="input-field w-full text-lg"
            />
          </div>

          {/* Currency Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Currency
            </label>
            <select
              value={selectedCurrency.code}
              onChange={(e) => {
                const currency = currencies.find((c) => c.code === e.target.value);
                if (currency) setSelectedCurrency(currency);
              }}
              className="input-field w-full"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>

          {/* Options */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Formatting Options
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSymbol}
                  onChange={(e) => setUseSymbol(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Use currency symbol (₹ instead of INR)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useGrouping}
                  onChange={(e) => setUseGrouping(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Use thousand separators (1,000 vs 1000)
                </span>
              </label>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Decimal places: {decimals}
                </label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={decimals}
                  onChange={(e) => setDecimals(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Formatted Output */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Formatted Currency
              </label>
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
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2">
                <IndianRupee className="w-8 h-8 text-blue-500" />
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 break-all">
                  {formattedValue}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Quick Examples
            </h3>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setAmount(example.amount)}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {example.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {example.amount}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 About Currency Formatting
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <p>
            Currency formatting uses the Intl.NumberFormat API to format numbers according to
            locale-specific conventions. Different countries use different:
          </p>
          <ul className="list-disc list-inside ml-2 mt-2">
            <li>Currency symbols and positions</li>
            <li>Decimal and thousand separators</li>
            <li>Grouping patterns (e.g., Indian numbering: 1,23,45,678)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
