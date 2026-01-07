import { useState } from 'react';
import { IndianRupee, TrendingUp, Calendar } from 'lucide-react';

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('1000000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTenure, setLoanTenure] = useState('20');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths =
      tenureType === 'years'
        ? parseInt(loanTenure) * 12
        : parseInt(loanTenure) || 0;

    if (principal === 0 || monthlyRate === 0 || tenureMonths === 0) {
      return {
        emi: 0,
        totalAmount: 0,
        totalInterest: 0,
        breakdown: [],
      };
    }

    // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - principal;

    // Calculate year-wise breakdown
    const breakdown = [];
    let remainingPrincipal = principal;
    const yearsToShow = Math.ceil(tenureMonths / 12);

    for (let year = 1; year <= yearsToShow; year++) {
      const monthsInYear = Math.min(12, tenureMonths - (year - 1) * 12);
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= monthsInYear; month++) {
        const interest = remainingPrincipal * monthlyRate;
        const principalPaid = emi - interest;
        yearlyPrincipal += principalPaid;
        yearlyInterest += interest;
        remainingPrincipal -= principalPaid;
      }

      breakdown.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(0, remainingPrincipal),
      });
    }

    return {
      emi,
      totalAmount,
      totalInterest,
      breakdown,
    };
  };

  const result = calculateEMI();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} L`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(2)} K`;
    }
    return formatCurrency(num);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Loan Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate EMI, total interest, and payment schedule for loans
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Loan Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="input-field w-full"
                />
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>₹1L</span>
                  <span>{formatLargeNumber(parseFloat(loanAmount))}</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  step="0.1"
                  className="input-field w-full"
                />
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1%</span>
                  <span>{interestRate}%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Tenure
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="input-field flex-1"
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                    className="input-field w-32"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <input
                  type="range"
                  min="1"
                  max={tenureType === 'years' ? '30' : '360'}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 {tenureType === 'years' ? 'yr' : 'mo'}</span>
                  <span>
                    {loanTenure} {tenureType === 'years' ? 'yrs' : 'mos'}
                  </span>
                  <span>{tenureType === 'years' ? '30 yrs' : '360 mos'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Quick Loan Types
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setLoanAmount('3000000');
                  setInterestRate('8.5');
                  setLoanTenure('20');
                  setTenureType('years');
                }}
                className="btn-secondary text-sm"
              >
                Home Loan
              </button>
              <button
                onClick={() => {
                  setLoanAmount('1000000');
                  setInterestRate('9.5');
                  setLoanTenure('7');
                  setTenureType('years');
                }}
                className="btn-secondary text-sm"
              >
                Car Loan
              </button>
              <button
                onClick={() => {
                  setLoanAmount('500000');
                  setInterestRate('10.5');
                  setLoanTenure('5');
                  setTenureType('years');
                }}
                className="btn-secondary text-sm"
              >
                Personal Loan
              </button>
              <button
                onClick={() => {
                  setLoanAmount('2000000');
                  setInterestRate('7.5');
                  setLoanTenure('10');
                  setTenureType('years');
                }}
                className="btn-secondary text-sm"
              >
                Education Loan
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* EMI Result */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Monthly EMI</h3>
            </div>
            <div className="text-5xl font-bold mb-2">
              {formatCurrency(result.emi)}
            </div>
            <p className="text-sm opacity-90">
              Pay this amount every month for{' '}
              {tenureType === 'years'
                ? `${loanTenure} years`
                : `${loanTenure} months`}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Principal Amount
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(parseFloat(loanAmount) || 0)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Interest
              </div>
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {formatCurrency(result.totalInterest)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Amount
              </div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(result.totalAmount)}
              </div>
            </div>
          </div>

          {/* Pie Chart Visual */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Payment Breakdown
            </h3>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                        Principal
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                        {((parseFloat(loanAmount) / result.totalAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
                    <div
                      style={{
                        width: `${(parseFloat(loanAmount) / result.totalAmount) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-orange-600 dark:text-orange-400">
                        Interest
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-orange-600 dark:text-orange-400">
                        {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-orange-200 dark:bg-orange-900">
                    <div
                      style={{
                        width: `${(result.totalInterest / result.totalAmount) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formatCurrency(parseFloat(loanAmount) || 0)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Year-wise Breakdown */}
          {result.breakdown.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Year-wise Breakdown
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                        Year
                      </th>
                      <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                        Principal
                      </th>
                      <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                        Interest
                      </th>
                      <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.breakdown.slice(0, 10).map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-gray-100 dark:border-gray-800"
                      >
                        <td className="px-4 py-2 text-gray-900 dark:text-white">
                          {row.year}
                        </td>
                        <td className="px-4 py-2 text-right text-gray-900 dark:text-white">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="px-4 py-2 text-right text-orange-600 dark:text-orange-400">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">
                          {formatCurrency(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💡 About EMI Calculation
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
              EMI (Equated Monthly Installment) is calculated using the reducing balance method. 
              The formula used is: EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Where P = Principal loan amount, r = Monthly interest rate, n = Loan tenure in months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
