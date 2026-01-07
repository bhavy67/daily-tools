import { useState, useEffect } from 'react';
import { Copy, Check, Clock } from 'lucide-react';

export const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateString, setDateString] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const date = new Date(timestamp * 1000);
    setDateString(date.toISOString().slice(0, 16));
  }, []);

  const timestampToDate = () => {
    const date = new Date(timestamp * 1000);
    setDateString(date.toISOString().slice(0, 16));
  };

  const dateToTimestamp = () => {
    const date = new Date(dateString);
    setTimestamp(Math.floor(date.getTime() / 1000));
  };

  const setToNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now);
    timestampToDate();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (date: Date) => {
    return {
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const currentTimestamp = Math.floor(currentTime.getTime() / 1000);
  const convertedDate = new Date(timestamp * 1000);
  const formats = formatDate(convertedDate);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Timestamp Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Convert between Unix timestamps and human-readable dates
        </p>
      </div>

      {/* Current Time */}
      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-300">
            Current Time
          </h3>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-mono font-bold text-primary-700 dark:text-primary-300">
            {currentTimestamp}
          </p>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {currentTime.toISOString()}
          </p>
        </div>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Timestamp Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Unix Timestamp (seconds)
          </label>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(parseInt(e.target.value) || 0)}
            className="input-field mb-4"
          />
          <div className="flex gap-2">
            <button onClick={timestampToDate} className="btn-primary flex-1">
              Convert to Date
            </button>
            <button onClick={setToNow} className="btn-secondary">
              Now
            </button>
          </div>
        </div>

        {/* Date Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={dateString}
            onChange={(e) => setDateString(e.target.value)}
            className="input-field mb-4"
          />
          <button onClick={dateToTimestamp} className="btn-primary w-full">
            Convert to Timestamp
          </button>
        </div>
      </div>

      {/* Formatted Outputs */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Formatted Outputs
        </h3>

        {Object.entries(formats).map(([format, value]) => (
          <div
            key={format}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase">
                {format}
              </h4>
              <button
                onClick={() => copyToClipboard(value, format)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {copied === format ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          About Unix Timestamps:
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Unix timestamp (or Epoch time) is the number of seconds that have elapsed since January 1, 1970 (UTC).
          It's a widely used time representation in programming and databases.
        </p>
      </div>
    </div>
  );
};
