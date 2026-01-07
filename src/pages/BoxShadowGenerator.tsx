import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const BoxShadowGenerator = () => {
  const [hOffset, setHOffset] = useState(0);
  const [vOffset, setVOffset] = useState(8);
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.1);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getCssCode = () => {
    const shadowColor = hexToRgba(color, opacity);
    const insetText = inset ? 'inset ' : '';
    return `box-shadow: ${insetText}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor};`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCssCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: 'Subtle', hOffset: 0, vOffset: 1, blur: 3, spread: 0, opacity: 0.1 },
    { name: 'Card', hOffset: 0, vOffset: 4, blur: 6, spread: -1, opacity: 0.1 },
    { name: 'Medium', hOffset: 0, vOffset: 10, blur: 15, spread: -3, opacity: 0.1 },
    { name: 'Large', hOffset: 0, vOffset: 20, blur: 25, spread: -5, opacity: 0.1 },
    { name: 'Extra Large', hOffset: 0, vOffset: 25, blur: 50, spread: -12, opacity: 0.25 },
    { name: 'Inner', hOffset: 0, vOffset: 2, blur: 4, spread: 0, opacity: 0.06, inset: true },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setHOffset(preset.hOffset);
    setVOffset(preset.vOffset);
    setBlur(preset.blur);
    setSpread(preset.spread);
    setOpacity(preset.opacity);
    setInset(preset.inset || false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Box Shadow Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create and customize CSS box shadows with live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h3>

            {/* Horizontal Offset */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Horizontal Offset: {hOffset}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={hOffset}
                onChange={(e) => setHOffset(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Vertical Offset */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vertical Offset: {vOffset}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={vOffset}
                onChange={(e) => setVOffset(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Blur Radius */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blur Radius: {blur}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Spread Radius */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Spread Radius: {spread}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Opacity: {(opacity * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Color */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shadow Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="input-field flex-1"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Inset */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Inset Shadow
              </span>
            </label>
          </div>

          {/* Presets */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Presets
            </h3>
            <div className="space-y-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm text-gray-700 dark:text-gray-300"
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
                className="w-48 h-48 bg-white dark:bg-gray-800 rounded-lg"
                style={{
                  boxShadow: `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`
                }}
              />
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
              <li>• Horizontal offset: positive moves right, negative moves left</li>
              <li>• Vertical offset: positive moves down, negative moves up</li>
              <li>• Blur radius: higher values create softer shadows</li>
              <li>• Spread radius: positive expands, negative contracts the shadow</li>
              <li>• Use inset for inner shadows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
