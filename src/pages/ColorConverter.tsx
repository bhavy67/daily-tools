import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const ColorConverter = () => {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState<string | null>(null);

  // Convert HEX to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const rgbVal = hexToRgb(newHex);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromHsl = (newHsl: { h: number; s: number; l: number }) => {
    setHsl(newHsl);
    const rgbVal = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Color Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Convert colors between HEX, RGB, and HSL formats
        </p>
      </div>

      {/* Color Preview */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div
          className="w-full h-48 rounded-lg shadow-inner mb-4"
          style={{ backgroundColor: hex }}
        />
        <p className="text-center text-lg font-mono font-semibold text-gray-900 dark:text-white">
          {hex.toUpperCase()}
        </p>
      </div>

      {/* Color Formats */}
      <div className="space-y-6">
        {/* HEX */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              HEX
            </h3>
            <button
              onClick={() => copyToClipboard(hex, 'hex')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {copied === 'hex' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-16 h-16 rounded cursor-pointer"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="input-field flex-1"
              placeholder="#3b82f6"
            />
          </div>
        </div>

        {/* RGB */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              RGB
            </h3>
            <button
              onClick={() =>
                copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')
              }
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {copied === 'rgb' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Red
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) =>
                  updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Green
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) =>
                  updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Blue
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) =>
                  updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })
                }
                className="input-field"
              />
            </div>
          </div>
          <p className="mt-3 text-sm font-mono text-gray-600 dark:text-gray-400">
            rgb({rgb.r}, {rgb.g}, {rgb.b})
          </p>
        </div>

        {/* HSL */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              HSL
            </h3>
            <button
              onClick={() =>
                copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')
              }
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {copied === 'hsl' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Hue (0-360)
              </label>
              <input
                type="number"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) =>
                  updateFromHsl({ ...hsl, h: parseInt(e.target.value) || 0 })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Saturation (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) =>
                  updateFromHsl({ ...hsl, s: parseInt(e.target.value) || 0 })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Lightness (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) =>
                  updateFromHsl({ ...hsl, l: parseInt(e.target.value) || 0 })
                }
                className="input-field"
              />
            </div>
          </div>
          <p className="mt-3 text-sm font-mono text-gray-600 dark:text-gray-400">
            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
          </p>
        </div>
      </div>
    </div>
  );
};
