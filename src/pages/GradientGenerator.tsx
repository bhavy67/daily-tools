import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export const GradientGenerator = () => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [copied, setCopied] = useState(false);

  const generateRandomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  const getCssCode = () => {
    if (gradientType === 'linear') {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCssCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: 'Purple Bliss', color1: '#667eea', color2: '#764ba2', angle: 90 },
    { name: 'Sunset', color1: '#ff6a00', color2: '#ee0979', angle: 135 },
    { name: 'Ocean', color1: '#2E3192', color2: '#1BFFFF', angle: 180 },
    { name: 'Forest', color1: '#134E5E', color2: '#71B280', angle: 45 },
    { name: 'Fire', color1: '#f12711', color2: '#f5af19', angle: 90 },
    { name: 'Sky', color1: '#00c6ff', color2: '#0072ff', angle: 135 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setColor1(preset.color1);
    setColor2(preset.color2);
    setAngle(preset.angle);
    setGradientType('linear');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CSS Gradient Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create beautiful CSS gradients with live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h3>

            {/* Gradient Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gradient Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGradientType('linear')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    gradientType === 'linear'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setGradientType('radial')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    gradientType === 'radial'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Radial
                </button>
              </div>
            </div>

            {/* Angle (for linear) */}
            {gradientType === 'linear' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Angle: {angle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Color 1 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color 1
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="input-field flex-1"
                  placeholder="#667eea"
                />
              </div>
            </div>

            {/* Color 2 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color 2
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="input-field flex-1"
                  placeholder="#764ba2"
                />
              </div>
            </div>

            {/* Random Button */}
            <button
              onClick={generateRandomGradient}
              className="btn-secondary w-full"
            >
              <RefreshCw className="w-4 h-4 inline-block mr-2" />
              Random Gradient
            </button>
          </div>

          {/* Presets */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Presets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="relative h-16 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-colors group"
                  style={{
                    background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})`
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Preview
            </h3>
            <div
              className="w-full h-64 rounded-lg shadow-inner"
              style={{
                background: gradientType === 'linear'
                  ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
                  : `radial-gradient(circle, ${color1}, ${color2})`
              }}
            />
          </div>

          {/* CSS Code */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                CSS Code
              </h3>
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
            <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                {getCssCode()}
              </code>
            </pre>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💡 Tips
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Linear gradients flow in a straight line at the specified angle</li>
              <li>• Radial gradients radiate from the center outward</li>
              <li>• 0° points up, 90° points right, 180° points down, 270° points left</li>
              <li>• Try the presets or generate random gradients for inspiration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
