import { useState } from 'react';
import { Ruler, ArrowRightLeft } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'time';

interface ConversionUnit {
  name: string;
  value: number; // Conversion factor to base unit
  symbol: string;
}

const units: Record<UnitCategory, { base: string; units: ConversionUnit[] }> = {
  length: {
    base: 'meter',
    units: [
      { name: 'Millimeter', value: 0.001, symbol: 'mm' },
      { name: 'Centimeter', value: 0.01, symbol: 'cm' },
      { name: 'Meter', value: 1, symbol: 'm' },
      { name: 'Kilometer', value: 1000, symbol: 'km' },
      { name: 'Inch', value: 0.0254, symbol: 'in' },
      { name: 'Foot', value: 0.3048, symbol: 'ft' },
      { name: 'Yard', value: 0.9144, symbol: 'yd' },
      { name: 'Mile', value: 1609.344, symbol: 'mi' },
    ],
  },
  weight: {
    base: 'kilogram',
    units: [
      { name: 'Milligram', value: 0.000001, symbol: 'mg' },
      { name: 'Gram', value: 0.001, symbol: 'g' },
      { name: 'Kilogram', value: 1, symbol: 'kg' },
      { name: 'Metric Ton', value: 1000, symbol: 't' },
      { name: 'Ounce', value: 0.0283495, symbol: 'oz' },
      { name: 'Pound', value: 0.453592, symbol: 'lb' },
      { name: 'Stone', value: 6.35029, symbol: 'st' },
    ],
  },
  temperature: {
    base: 'celsius',
    units: [
      { name: 'Celsius', value: 1, symbol: '°C' },
      { name: 'Fahrenheit', value: 1, symbol: '°F' },
      { name: 'Kelvin', value: 1, symbol: 'K' },
    ],
  },
  volume: {
    base: 'liter',
    units: [
      { name: 'Milliliter', value: 0.001, symbol: 'ml' },
      { name: 'Liter', value: 1, symbol: 'L' },
      { name: 'Cubic Meter', value: 1000, symbol: 'm³' },
      { name: 'Gallon (US)', value: 3.78541, symbol: 'gal' },
      { name: 'Quart (US)', value: 0.946353, symbol: 'qt' },
      { name: 'Pint (US)', value: 0.473176, symbol: 'pt' },
      { name: 'Cup (US)', value: 0.236588, symbol: 'cup' },
      { name: 'Fluid Ounce (US)', value: 0.0295735, symbol: 'fl oz' },
    ],
  },
  area: {
    base: 'square meter',
    units: [
      { name: 'Square Millimeter', value: 0.000001, symbol: 'mm²' },
      { name: 'Square Centimeter', value: 0.0001, symbol: 'cm²' },
      { name: 'Square Meter', value: 1, symbol: 'm²' },
      { name: 'Square Kilometer', value: 1000000, symbol: 'km²' },
      { name: 'Hectare', value: 10000, symbol: 'ha' },
      { name: 'Square Inch', value: 0.00064516, symbol: 'in²' },
      { name: 'Square Foot', value: 0.092903, symbol: 'ft²' },
      { name: 'Square Yard', value: 0.836127, symbol: 'yd²' },
      { name: 'Acre', value: 4046.86, symbol: 'ac' },
      { name: 'Square Mile', value: 2589988, symbol: 'mi²' },
    ],
  },
  time: {
    base: 'second',
    units: [
      { name: 'Millisecond', value: 0.001, symbol: 'ms' },
      { name: 'Second', value: 1, symbol: 's' },
      { name: 'Minute', value: 60, symbol: 'min' },
      { name: 'Hour', value: 3600, symbol: 'h' },
      { name: 'Day', value: 86400, symbol: 'd' },
      { name: 'Week', value: 604800, symbol: 'wk' },
      { name: 'Month (30 days)', value: 2592000, symbol: 'mo' },
      { name: 'Year (365 days)', value: 31536000, symbol: 'yr' },
    ],
  },
};

export const UnitConverter = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius = value;
    if (from === 'Fahrenheit') {
      celsius = (value - 32) * (5 / 9);
    } else if (from === 'Kelvin') {
      celsius = value - 273.15;
    }

    // Convert from Celsius to target
    if (to === 'Fahrenheit') {
      return celsius * (9 / 5) + 32;
    } else if (to === 'Kelvin') {
      return celsius + 273.15;
    }
    return celsius;
  };

  const convert = (value: string, isFromUnit: boolean) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setFromValue('');
      setToValue('');
      return;
    }

    const currentUnits = units[category].units;
    const from = currentUnits[fromUnit];
    const to = currentUnits[toUnit];

    if (category === 'temperature') {
      if (isFromUnit) {
        const result = convertTemperature(numValue, from.name, to.name);
        setFromValue(value);
        setToValue(result.toFixed(4));
      } else {
        const result = convertTemperature(numValue, to.name, from.name);
        setToValue(value);
        setFromValue(result.toFixed(4));
      }
    } else {
      if (isFromUnit) {
        const baseValue = numValue * from.value;
        const result = baseValue / to.value;
        setFromValue(value);
        setToValue(result.toFixed(6));
      } else {
        const baseValue = numValue * to.value;
        const result = baseValue / from.value;
        setToValue(value);
        setFromValue(result.toFixed(6));
      }
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    setFromUnit(0);
    setToUnit(1);
    setFromValue('');
    setToValue('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Unit Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Convert between different units of measurement
        </p>
      </div>

      {/* Category Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Category
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {(Object.keys(units) as UnitCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                category === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          {/* From Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => convert(e.target.value, true)}
                placeholder="Enter value"
                className="input-field flex-1"
              />
              <select
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(parseInt(e.target.value));
                  if (fromValue) convert(fromValue, true);
                }}
                className="input-field w-48"
              >
                {units[category].units.map((unit, index) => (
                  <option key={index} value={index}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Swap units"
            >
              <ArrowRightLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={toValue}
                onChange={(e) => convert(e.target.value, false)}
                placeholder="Result"
                className="input-field flex-1"
              />
              <select
                value={toUnit}
                onChange={(e) => {
                  setToUnit(parseInt(e.target.value));
                  if (fromValue) convert(fromValue, true);
                }}
                className="input-field w-48"
              >
                {units[category].units.map((unit, index) => (
                  <option key={index} value={index}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Ruler className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💡 Supported Conversions
            </h3>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              Convert between metric and imperial units for length, weight, temperature, volume, area, and time.
              All conversions are accurate to 6 decimal places.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
