import { useState } from 'react';
import { Calendar, Plus, Minus } from 'lucide-react';

export const DateCalculator = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('0');
  const [days, setDays] = useState('0');
  const [result, setResult] = useState('');

  // Date Difference Calculator
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [diffResult, setDiffResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
  } | null>(null);

  const calculateDate = () => {
    const date = new Date(startDate);
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    const d = parseInt(days) || 0;

    if (operation === 'add') {
      date.setFullYear(date.getFullYear() + y);
      date.setMonth(date.getMonth() + m);
      date.setDate(date.getDate() + d);
    } else {
      date.setFullYear(date.getFullYear() - y);
      date.setMonth(date.getMonth() - m);
      date.setDate(date.getDate() - d);
    }

    const formatted = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setResult(formatted);
  };

  const calculateDifference = () => {
    if (!date1 || !date2) return;

    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    let [start, end] = d1 < d2 ? [d1, d2] : [d2, d1];

    // Calculate difference
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    setDiffResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
    });
  };

  const loadQuickDate = (type: string) => {
    const today = new Date();
    let newDate = new Date(today);

    switch (type) {
      case 'tomorrow':
        newDate.setDate(today.getDate() + 1);
        break;
      case 'nextWeek':
        newDate.setDate(today.getDate() + 7);
        break;
      case 'nextMonth':
        newDate.setMonth(today.getMonth() + 1);
        break;
      case 'nextYear':
        newDate.setFullYear(today.getFullYear() + 1);
        break;
      case 'yesterday':
        newDate.setDate(today.getDate() - 1);
        break;
      case 'lastWeek':
        newDate.setDate(today.getDate() - 7);
        break;
      case 'lastMonth':
        newDate.setMonth(today.getMonth() - 1);
        break;
      case 'lastYear':
        newDate.setFullYear(today.getFullYear() - 1);
        break;
    }

    setStartDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Date Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add or subtract time from dates and calculate differences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add/Subtract Dates */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add / Subtract Time
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
                  Operation
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOperation('add')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      operation === 'add'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Plus className="w-4 h-4 inline-block mr-2" />
                    Add
                  </button>
                  <button
                    onClick={() => setOperation('subtract')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      operation === 'subtract'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Minus className="w-4 h-4 inline-block mr-2" />
                    Subtract
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years
                  </label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    min="0"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Months
                  </label>
                  <input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    min="0"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Days
                  </label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    min="0"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <button onClick={calculateDate} className="btn-primary w-full">
                Calculate Date
              </button>

              {result && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="text-sm text-blue-800 dark:text-blue-200 mb-1">Result:</div>
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Dates */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Dates
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => loadQuickDate('tomorrow')} className="btn-secondary text-sm">
                Tomorrow
              </button>
              <button onClick={() => loadQuickDate('nextWeek')} className="btn-secondary text-sm">
                Next Week
              </button>
              <button onClick={() => loadQuickDate('nextMonth')} className="btn-secondary text-sm">
                Next Month
              </button>
              <button onClick={() => loadQuickDate('nextYear')} className="btn-secondary text-sm">
                Next Year
              </button>
              <button onClick={() => loadQuickDate('yesterday')} className="btn-secondary text-sm">
                Yesterday
              </button>
              <button onClick={() => loadQuickDate('lastWeek')} className="btn-secondary text-sm">
                Last Week
              </button>
              <button onClick={() => loadQuickDate('lastMonth')} className="btn-secondary text-sm">
                Last Month
              </button>
              <button onClick={() => loadQuickDate('lastYear')} className="btn-secondary text-sm">
                Last Year
              </button>
            </div>
          </div>
        </div>

        {/* Date Difference */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Date Difference
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <button onClick={calculateDifference} className="btn-primary w-full">
              Calculate Difference
            </button>

            {diffResult && (
              <div className="space-y-3">
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                    Duration:
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {diffResult.years}
                      </div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">
                        {diffResult.years === 1 ? 'Year' : 'Years'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {diffResult.months}
                      </div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">
                        {diffResult.months === 1 ? 'Month' : 'Months'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {diffResult.days}
                      </div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">
                        {diffResult.days === 1 ? 'Day' : 'Days'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {diffResult.totalDays.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Days</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {diffResult.totalWeeks.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Weeks</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {diffResult.totalHours.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Hours</div>
                  </div>
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
          <li>• Calculate due dates, deadlines, and project timelines</li>
          <li>• Find out how long until or since an important event</li>
          <li>• Plan future dates by adding or subtracting time</li>
          <li>• Calculate vacation days, work periods, and more</li>
        </ul>
      </div>
    </div>
  );
};
