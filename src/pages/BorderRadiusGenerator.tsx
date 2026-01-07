import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const BorderRadiusGenerator = () => {
  const [topLeft, setTopLeft] = useState(8);
  const [topRight, setTopRight] = useState(8);
  const [bottomRight, setBottomRight] = useState(8);
  const [bottomLeft, setBottomLeft] = useState(8);
  const [allCorners, setAllCorners] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleAllCornersChange = (value: number) => {
    setTopLeft(value);
    setTopRight(value);
    setBottomRight(value);
    setBottomLeft(value);
  };

  const getCssCode = () => {
    if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
      return `border-radius: ${topLeft}px;`;
    }
    return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCssCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: 'None', values: [0, 0, 0, 0] },
    { name: 'Small', values: [4, 4, 4, 4] },
    { name: 'Medium', values: [8, 8, 8, 8] },
    { name: 'Large', values: [16, 16, 16, 16] },
    { name: 'Extra Large', values: [24, 24, 24, 24] },
    { name: 'Circle', values: [9999, 9999, 9999, 9999] },
    { name: 'Pill', values: [9999, 9999, 9999, 9999] },
    { name: 'Top Rounded', values: [16, 16, 0, 0] },
    { name: 'Bottom Rounded', values: [0, 0, 16, 16] },
    { name: 'Left Rounded', values: [16, 0, 0, 16] },
    { name: 'Right Rounded', values: [0, 16, 16, 0] },
    { name: 'Blob 1', values: [30, 70, 40, 60] },
    { name: 'Blob 2', values: [60, 40, 70, 30] },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setTopLeft(preset.values[0]);
    setTopRight(preset.values[1]);
    setBottomRight(preset.values[2]);
    setBottomLeft(preset.values[3]);
    setAllCorners(preset.values.every(v => v === preset.values[0]));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Border Radius Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create and customize CSS border radius with live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h3>

            {/* All Corners Toggle */}
            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={allCorners}
                onChange={(e) => setAllCorners(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                All Corners Equal
              </span>
            </label>

            {/* All Corners Slider (when enabled) */}
            {allCorners && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Border Radius: {topLeft}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={topLeft}
                  onChange={(e) => handleAllCornersChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Individual Corner Sliders */}
            {!allCorners && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Top Left: {topLeft}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={topLeft}
                    onChange={(e) => setTopLeft(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Top Right: {topRight}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={topRight}
                    onChange={(e) => setTopRight(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bottom Right: {bottomRight}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={bottomRight}
                    onChange={(e) => setBottomRight(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bottom Left: {bottomLeft}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={bottomLeft}
                    onChange={(e) => setBottomLeft(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            )}
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
                  className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-xs text-gray-700 dark:text-gray-300"
                >
                  {preset.name}
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
            <div className="flex items-center justify-center p-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div
                className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
                style={{
                  borderRadius: `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
                }}
              />
            </div>
            
            {/* Corner Labels */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Top Left</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{topLeft}px</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Top Right</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{topRight}px</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bottom Left</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{bottomLeft}px</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bottom Right</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{bottomRight}px</div>
              </div>
            </div>
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
              <li>• Values are in clockwise order: top-left, top-right, bottom-right, bottom-left</li>
              <li>• Use large values (9999px) to create circles or pills</li>
              <li>• Asymmetric values create unique blob-like shapes</li>
              <li>• Try the presets for common patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
