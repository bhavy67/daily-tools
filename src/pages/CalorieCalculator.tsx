import { useState } from 'react';
import { Activity, Target, TrendingUp } from 'lucide-react';

export const CalorieCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activityLevel, setActivityLevel] = useState('1.55');
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain');

  const activityLevels = [
    { value: '1.2', label: 'Sedentary', description: 'Little or no exercise' },
    { value: '1.375', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    { value: '1.55', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
    { value: '1.725', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: '1.9', label: 'Extra Active', description: 'Very hard exercise & physical job' },
  ];

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activity = parseFloat(activityLevel);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      return {
        bmr: 0,
        maintenance: 0,
        lose: 0,
        gain: 0,
        bmi: 0,
      };
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const maintenance = bmr * activity;
    
    // Calculate goal-based calories
    const lose = maintenance - 500; // 0.5 kg per week
    const gain = maintenance + 500; // 0.5 kg per week

    // Calculate BMI
    const bmi = w / Math.pow(h / 100, 2);

    return {
      bmr,
      maintenance,
      lose,
      gain,
      bmi,
    };
  };

  const result = calculateCalories();

  const getGoalCalories = () => {
    switch (goal) {
      case 'lose':
        return result.lose;
      case 'gain':
        return result.gain;
      default:
        return result.maintenance;
    }
  };

  const getMacros = (calories: number) => {
    // Standard macro split: 40% carbs, 30% protein, 30% fat
    const protein = (calories * 0.3) / 4; // 4 calories per gram
    const carbs = (calories * 0.4) / 4; // 4 calories per gram
    const fat = (calories * 0.3) / 9; // 9 calories per gram

    return { protein, carbs, fat };
  };

  const goalCalories = getGoalCalories();
  const macros = getMacros(goalCalories);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-600 dark:text-blue-400' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-600 dark:text-green-400' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-yellow-600 dark:text-yellow-400' };
    return { text: 'Obese', color: 'text-red-600 dark:text-red-400' };
  };

  const bmiCategory = getBMICategory(result.bmi);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Calorie Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate your daily calorie needs and macronutrient requirements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Personal Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Personal Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGender('male')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      gender === 'male'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      gender === 'female'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  step="0.1"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="input-field w-full"
                />
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Activity Level
            </h3>
            <div className="space-y-2">
              {activityLevels.map((level) => (
                <label
                  key={level.value}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    activityLevel === level.value
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                      : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="activity"
                    value={level.value}
                    checked={activityLevel === level.value}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {level.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {level.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Goal
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setGoal('lose')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  goal === 'lose'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="text-sm">Lose</div>
                <div className="text-xs opacity-75">Weight</div>
              </button>
              <button
                onClick={() => setGoal('maintain')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  goal === 'maintain'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="text-sm">Maintain</div>
                <div className="text-xs opacity-75">Weight</div>
              </button>
              <button
                onClick={() => setGoal('gain')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  goal === 'gain'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="text-sm">Gain</div>
                <div className="text-xs opacity-75">Weight</div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Daily Calorie Target */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Daily Calorie Target</h3>
            </div>
            <div className="text-5xl font-bold mb-2">
              {Math.round(goalCalories)} cal
            </div>
            <p className="text-sm opacity-90">
              {goal === 'lose' && 'To lose 0.5 kg per week'}
              {goal === 'maintain' && 'To maintain current weight'}
              {goal === 'gain' && 'To gain 0.5 kg per week'}
            </p>
          </div>

          {/* Calorie Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Calorie Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">BMR (Base Metabolic Rate)</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {Math.round(result.bmr)} cal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Maintenance Calories</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {Math.round(result.maintenance)} cal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Weight Loss (-500 cal)</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  {Math.round(result.lose)} cal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Weight Gain (+500 cal)</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {Math.round(result.gain)} cal
                </span>
              </div>
            </div>
          </div>

          {/* Macros */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Macronutrients
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Protein (30%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.round(macros.protein)}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Carbs (40%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.round(macros.carbs)}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: '40%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Fat (30%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.round(macros.fat)}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* BMI */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Body Mass Index
              </h3>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${bmiCategory.color}`}>
                {result.bmi.toFixed(1)}
              </div>
              <div className={`text-lg font-medium mt-2 ${bmiCategory.color}`}>
                {bmiCategory.text}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 About This Calculator
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>
            This calculator uses the Mifflin-St Jeor equation to estimate your BMR (Basal Metabolic Rate), 
            which is then multiplied by your activity level to get your TDEE (Total Daily Energy Expenditure).
          </p>
          <p>
            The macro split (40% carbs, 30% protein, 30% fat) is a balanced ratio suitable for most people. 
            Individual needs may vary based on activity type, body composition goals, and health conditions.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          ⚠️ Disclaimer
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This calculator provides estimates only. For personalized nutrition advice, consult with a 
          registered dietitian or healthcare provider. Results may vary based on metabolism, genetics, 
          and other individual factors.
        </p>
      </div>
    </div>
  );
};
