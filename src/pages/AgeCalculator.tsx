import { useState } from 'react';
import { Calendar, Cake } from 'lucide-react';

export const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthday: string;
    daysUntilBirthday: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert('Birth date cannot be after target date!');
      return;
    }

    // Calculate age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total values
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate next birthday
    const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.floor(
      (nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      nextBirthday: nextBday.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      daysUntilBirthday,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Age Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate age and time between dates with precision
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Calculate Age On
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="input-field w-full"
            />
          </div>
        </div>

        <button onClick={calculateAge} className="btn-primary w-full mt-6">
          Calculate Age
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Age Display */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cake className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Age</h3>
            </div>
            <div className="flex items-center justify-center gap-8 text-center">
              <div>
                <div className="text-5xl font-bold">{result.years}</div>
                <div className="text-sm opacity-90 mt-1">
                  {result.years === 1 ? 'Year' : 'Years'}
                </div>
              </div>
              <div>
                <div className="text-5xl font-bold">{result.months}</div>
                <div className="text-sm opacity-90 mt-1">
                  {result.months === 1 ? 'Month' : 'Months'}
                </div>
              </div>
              <div>
                <div className="text-5xl font-bold">{result.days}</div>
                <div className="text-sm opacity-90 mt-1">
                  {result.days === 1 ? 'Day' : 'Days'}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Months</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.totalMonths.toLocaleString()}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Weeks</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.totalWeeks.toLocaleString()}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Days</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.totalDays.toLocaleString()}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Hours</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.totalHours.toLocaleString()}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Minutes</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.totalMinutes.toLocaleString()}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Days to Birthday
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.daysUntilBirthday}
              </div>
            </div>
          </div>

          {/* Next Birthday */}
          <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Cake className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-300">
                Next Birthday
              </h3>
            </div>
            <p className="text-pink-800 dark:text-pink-200">
              {result.nextBirthday}
            </p>
            <p className="text-sm text-pink-700 dark:text-pink-300 mt-2">
              {result.daysUntilBirthday === 0
                ? "🎉 It's your birthday today!"
                : `${result.daysUntilBirthday} ${
                    result.daysUntilBirthday === 1 ? 'day' : 'days'
                  } to go!`}
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 Use Cases
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Calculate your exact age in years, months, and days</li>
          <li>• Find out how many days until your next birthday</li>
          <li>• Calculate age for legal, medical, or official purposes</li>
          <li>• Track project timelines and anniversaries</li>
        </ul>
      </div>
    </div>
  );
};
