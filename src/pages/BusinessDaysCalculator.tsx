import { useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

export const BusinessDaysCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [businessDays, setBusinessDays] = useState<number | null>(null);

  // Add business days calculator
  const [addStartDate, setAddStartDate] = useState('');
  const [daysToAdd, setDaysToAdd] = useState('');
  const [resultDate, setResultDate] = useState('');

  const [excludeSaturday, setExcludeSaturday] = useState(true);
  const [excludeSunday, setExcludeSunday] = useState(true);

  const isBusinessDay = (date: Date): boolean => {
    const day = date.getDay();
    if (excludeSaturday && day === 6) return false;
    if (excludeSunday && day === 0) return false;
    return true;
  };

  const calculateBusinessDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert('Start date must be before end date!');
      return;
    }

    let count = 0;
    const current = new Date(start);

    while (current <= end) {
      if (isBusinessDay(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    setBusinessDays(count);
  };

  const addBusinessDays = () => {
    if (!addStartDate || !daysToAdd) return;

    const start = new Date(addStartDate);
    const days = parseInt(daysToAdd);

    if (days <= 0) {
      alert('Please enter a positive number of days!');
      return;
    }

    let count = 0;
    const current = new Date(start);

    while (count < days) {
      current.setDate(current.getDate() + 1);
      if (isBusinessDay(current)) {
        count++;
      }
    }

    const formatted = current.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setResultDate(formatted);
  };

  const getWeekendInfo = () => {
    if (excludeSaturday && excludeSunday) return 'Mon-Fri';
    if (excludeSaturday) return 'Sun-Fri';
    if (excludeSunday) return 'Mon-Sat';
    return 'Mon-Sun (All days)';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Business Days Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate business days between dates or add business days to a date
        </p>
      </div>

      {/* Weekend Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Business Days:
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeSaturday}
              onChange={(e) => setExcludeSaturday(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Exclude Saturday</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeSunday}
              onChange={(e) => setExcludeSunday(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Exclude Sunday</span>
          </label>
          <div className="ml-auto text-sm font-medium text-blue-600 dark:text-blue-400">
            {getWeekendInfo()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculate Business Days Between Dates */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Days Between Dates
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <button onClick={calculateBusinessDays} className="btn-primary w-full">
              Calculate Business Days
            </button>

            {businessDays !== null && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
                <div className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  Business Days
                </div>
                <div className="text-5xl font-bold text-blue-900 dark:text-blue-100">
                  {businessDays}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                  {businessDays === 1 ? 'day' : 'days'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Business Days */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Business Days
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={addStartDate}
                onChange={(e) => setAddStartDate(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Days to Add
              </label>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(e.target.value)}
                placeholder="e.g., 10"
                min="1"
                className="input-field w-full"
              />
            </div>

            <button onClick={addBusinessDays} className="btn-primary w-full">
              Calculate End Date
            </button>

            {resultDate && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-sm text-green-800 dark:text-green-200 mb-2">
                  Result Date:
                </div>
                <div className="text-lg font-bold text-green-900 dark:text-green-100">
                  {resultDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 Use Cases
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Calculate project timelines and delivery dates</li>
          <li>• Determine working days between milestones</li>
          <li>• Plan deadlines excluding weekends</li>
          <li>• Calculate service level agreements (SLA) timelines</li>
          <li>• Schedule meetings and events on business days</li>
        </ul>
      </div>

      {/* Note */}
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          📝 Note
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This calculator only excludes weekends. It does not account for public holidays, 
          which vary by country and region. For production use, consider adding holiday 
          exclusions specific to your location.
        </p>
      </div>
    </div>
  );
};
