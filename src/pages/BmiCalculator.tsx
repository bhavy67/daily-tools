import { useState } from 'react';
import { Activity, Scale } from 'lucide-react';

export const BmiCalculator = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    let weightKg: number;
    let heightM: number;

    if (unit === 'metric') {
      weightKg = parseFloat(weight);
      heightM = parseFloat(height) / 100; // cm to m
    } else {
      // Convert pounds to kg and inches to meters
      weightKg = parseFloat(weight) * 0.453592;
      const totalInches = parseFloat(feet || '0') * 12 + parseFloat(inches || '0');
      heightM = totalInches * 0.0254;
    }

    if (isNaN(weightKg) || isNaN(heightM) || heightM === 0) {
      alert('Please enter valid values!');
      return;
    }

    const calculatedBMI = weightKg / (heightM * heightM);
    setBmi(calculatedBMI);
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return {
        category: 'Underweight',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        description: 'Below healthy weight range',
      };
    } else if (bmiValue < 25) {
      return {
        category: 'Normal Weight',
        color: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        description: 'Healthy weight range',
      };
    } else if (bmiValue < 30) {
      return {
        category: 'Overweight',
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-200 dark:border-yellow-800',
        description: 'Above healthy weight range',
      };
    } else {
      return {
        category: 'Obese',
        color: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800',
        description: 'Well above healthy weight range',
      };
    }
  };

  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          BMI Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate your Body Mass Index and health category
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Unit Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Unit System
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUnit('metric')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  unit === 'metric'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Metric (kg/cm)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  unit === 'imperial'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Imperial (lb/ft)
              </button>
            </div>
          </div>

          {/* Weight Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Scale className="w-4 h-4 inline-block mr-2" />
              Weight
            </label>
            <div className="relative">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0"
                step="0.1"
                min="0"
                className="input-field w-full pr-16 text-xl"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                {unit === 'metric' ? 'kg' : 'lb'}
              </span>
            </div>
          </div>

          {/* Height Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Activity className="w-4 h-4 inline-block mr-2" />
              Height
            </label>
            {unit === 'metric' ? (
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="0"
                  step="0.1"
                  min="0"
                  className="input-field w-full pr-16 text-xl"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  cm
                </span>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="input-field w-full pr-12 text-xl"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ft
                  </span>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="0"
                    min="0"
                    max="11"
                    className="input-field w-full pr-12 text-xl"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    in
                  </span>
                </div>
              </div>
            )}
          </div>

          <button onClick={calculateBMI} className="btn-primary w-full">
            Calculate BMI
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {bmi && category ? (
            <>
              {/* BMI Result */}
              <div className={`rounded-lg shadow-md p-6 border ${category.bg} ${category.border}`}>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Your BMI
                </h3>
                <div className={`text-6xl font-bold ${category.color} text-center mb-4`}>
                  {bmi.toFixed(1)}
                </div>
                <div className={`text-2xl font-semibold ${category.color} text-center mb-2`}>
                  {category.category}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {category.description}
                </div>
              </div>

              {/* BMI Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  BMI Categories
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-600 dark:text-gray-400">&lt; 18.5</div>
                    <div className="flex-1 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center px-3">
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
                        Underweight
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-600 dark:text-gray-400">18.5-25</div>
                    <div className="flex-1 h-8 bg-green-100 dark:bg-green-900/30 rounded flex items-center px-3">
                      <span className="text-sm font-medium text-green-900 dark:text-green-200">
                        Normal Weight
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-600 dark:text-gray-400">25-30</div>
                    <div className="flex-1 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded flex items-center px-3">
                      <span className="text-sm font-medium text-yellow-900 dark:text-yellow-200">
                        Overweight
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-600 dark:text-gray-400">&gt; 30</div>
                    <div className="flex-1 h-8 bg-red-100 dark:bg-red-900/30 rounded flex items-center px-3">
                      <span className="text-sm font-medium text-red-900 dark:text-red-200">
                        Obese
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-12 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Enter your details and click Calculate BMI
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 About BMI
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>
            Body Mass Index (BMI) is a measure of body fat based on height and weight. It's calculated 
            using the formula: BMI = weight (kg) / height² (m²)
          </p>
          <p>
            BMI categories are based on WHO guidelines. However, BMI is a screening tool and doesn't 
            directly measure body fat or health. Factors like muscle mass, bone density, and body 
            composition aren't considered.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          ⚠️ Medical Disclaimer
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This calculator is for informational purposes only and should not be used as a substitute 
          for professional medical advice. Consult with a healthcare provider for personalized health 
          guidance and weight management plans.
        </p>
      </div>
    </div>
  );
};
