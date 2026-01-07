import { useState, useEffect } from 'react';
import { IndianRupee, RefreshCw, TrendingUp, ArrowLeftRight, AlertCircle } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
];

// Fallback exchange rates (base: USD = 1) - Updated January 7, 2026
const fallbackRates: Record<string, number> = {
  USD: 1,
  INR: 83.12,      // Indian Rupee
  EUR: 0.9156,     // Euro
  GBP: 0.7889,     // British Pound
  JPY: 157.42,     // Japanese Yen
  AUD: 1.5842,     // Australian Dollar
  CAD: 1.4398,     // Canadian Dollar
  CHF: 0.9089,     // Swiss Franc
  CNY: 7.2856,     // Chinese Yuan
  SEK: 10.8563,    // Swedish Krona
  NZD: 1.7256,     // New Zealand Dollar
  SGD: 1.3545,     // Singapore Dollar
  HKD: 7.7968,     // Hong Kong Dollar
  NOK: 11.0234,    // Norwegian Krone
  KRW: 1452.35,    // South Korean Won
  MXN: 20.4512,    // Mexican Peso
  BRL: 6.0856,     // Brazilian Real
  ZAR: 18.2345,    // South African Rand
  AED: 3.6725,     // UAE Dirham
  SAR: 3.7513,     // Saudi Riyal
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(fallbackRates);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch exchange rates from free CDN service
  const fetchRates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Using Frankfurter API - free, no API key required, ECB data
      // Fetches latest rates with USD as base
      const response = await fetch('https://api.frankfurter.app/latest?from=USD');
      
      if (!response.ok) {
        throw new Error('Failed to fetch rates');
      }
      
      const data = await response.json();
      
      if (data.rates) {
        // Add USD to rates since Frankfurter doesn't include base currency
        const ratesWithUSD = { USD: 1, ...data.rates };
        setExchangeRates(ratesWithUSD);
        setLastUpdated(new Date(data.date || Date.now()));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
      setError('Using cached rates. Unable to fetch live rates.');
      setExchangeRates(fallbackRates);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch rates on component mount
  useEffect(() => {
    fetchRates();
  }, []);

  const convert = () => {
    const value = parseFloat(amount) || 0;
    if (value === 0) {
      setConvertedAmount(0);
      return;
    }

    // Convert from source currency to USD, then to target currency
    const inUSD = value / (exchangeRates[fromCurrency] || 1);
    const result = inUSD * (exchangeRates[toCurrency] || 1);
    setConvertedAmount(result);
  };

  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleRefresh = () => {
    fetchRates();
  };

  const getRate = () => {
    if (fromCurrency === toCurrency) return 1;
    const inUSD = 1 / (exchangeRates[fromCurrency] || 1);
    return inUSD * (exchangeRates[toCurrency] || 1);
  };

  const rate = getRate();

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  const toCurrencyData = currencies.find(c => c.code === toCurrency);

  // Format last updated date
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Loading...';
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    return lastUpdated.toLocaleDateString();
  };

  const popularConversions = [
    { from: 'INR', to: 'USD', label: 'Rupee to Dollar' },
    { from: 'USD', to: 'INR', label: 'Dollar to Rupee' },
    { from: 'INR', to: 'EUR', label: 'Rupee to Euro' },
    { from: 'GBP', to: 'INR', label: 'Pound to Rupee' },
    { from: 'INR', to: 'AED', label: 'Rupee to Dirham' },
    { from: 'INR', to: 'SAR', label: 'Rupee to Riyal' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Currency Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Convert between 20+ world currencies with live exchange rates
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Converter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <div className="space-y-3">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="input-field w-full"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                    {fromCurrencyData?.symbol}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="input-field w-full pl-10 text-xl"
                  />
                </div>
              </div>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <div className="space-y-3">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="input-field w-full"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                    {toCurrencyData?.symbol}
                  </span>
                  <input
                    type="text"
                    value={convertedAmount.toFixed(2)}
                    readOnly
                    className="input-field w-full pl-10 text-xl bg-gray-50 dark:bg-gray-900 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-3">
            <button
              onClick={handleSwap}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
              title="Swap currencies"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Exchange Rate</h3>
                {isLoading && (
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    Updating...
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold">
                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
              </p>
              <p className="text-sm opacity-90 mt-2">
                {error ? (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </span>
                ) : (
                  `Updated ${formatLastUpdated()}`
                )}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all ${
                isLoading ? 'animate-spin cursor-not-allowed' : ''
              }`}
              title="Refresh rates"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Popular Conversions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-blue-500" />
            Popular Conversions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularConversions.map((conversion, index) => {
              const fromData = currencies.find(c => c.code === conversion.from);
              const toData = currencies.find(c => c.code === conversion.to);
              const inUSD = 1 / (exchangeRates[conversion.from] || 1);
              const conversionRate = inUSD * (exchangeRates[conversion.to] || 1);

              return (
                <button
                  key={index}
                  onClick={() => {
                    setFromCurrency(conversion.from);
                    setToCurrency(conversion.to);
                  }}
                  className="text-left px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{fromData?.flag}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {conversion.from} → {conversion.to}
                    </span>
                    <span>{toData?.flag}</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    1 {conversion.from} = {conversionRate.toFixed(4)} {conversion.to}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Quick Amounts
          </h3>
          <div className="flex flex-wrap gap-2">
            {['100', '500', '1000', '5000', '10000', '50000', '100000'].map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  amount === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {fromCurrencyData?.symbol}{parseInt(value).toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            💡 About Exchange Rates
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Live Rates:</strong> Exchange rates are fetched from Frankfurter API 
            (powered by European Central Bank data) and updated daily. Fallback rates are 
            updated as of January 7, 2026. For actual financial transactions, please verify 
            rates with your bank or authorized money exchange service, as rates may include 
            additional fees and charges.
          </p>
        </div>
      </div>
    </div>
  );
};
