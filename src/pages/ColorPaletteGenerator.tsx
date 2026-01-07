import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#667eea');
  const [paletteType, setPaletteType] = useState<'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'monochromatic'>('analogous');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generatePalette = () => {
    const hsl = hexToHsl(baseColor);
    const colors: string[] = [baseColor];

    switch (paletteType) {
      case 'analogous':
        colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h - 60 + 360) % 360, hsl.s, hsl.l));
        break;
      case 'complementary':
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 0)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 100)));
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, Math.max(hsl.l - 20, 0)));
        break;
      case 'triadic':
        colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 0)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 100)));
        break;
      case 'tetradic':
        colors.push(hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 0)));
        break;
      case 'monochromatic':
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 30, 0)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 0)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 100)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 30, 100)));
        break;
    }

    return colors;
  };

  const palette = generatePalette();

  const randomColor = () => {
    setBaseColor('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
  };

  const copyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Color Palette Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate harmonious color palettes from a base color
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Base Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Base Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-16 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="input-field flex-1"
                placeholder="#667eea"
              />
            </div>
          </div>

          {/* Palette Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Harmony Type
            </label>
            <select
              value={paletteType}
              onChange={(e) => setPaletteType(e.target.value as any)}
              className="input-field"
            >
              <option value="analogous">Analogous</option>
              <option value="complementary">Complementary</option>
              <option value="triadic">Triadic</option>
              <option value="tetradic">Tetradic</option>
              <option value="monochromatic">Monochromatic</option>
            </select>
          </div>

          {/* Random Button */}
          <div className="flex items-end">
            <button
              onClick={randomColor}
              className="btn-secondary w-full"
            >
              <RefreshCw className="w-4 h-4 inline-block mr-2" />
              Random Color
            </button>
          </div>
        </div>
      </div>

      {/* Palette */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {palette.map((color, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div
              className="h-32 w-full cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => copyColor(color, index)}
            />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                  {color.toUpperCase()}
                </span>
                <button
                  onClick={() => copyColor(color, index)}
                  className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Copy color"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
          Color Harmony Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
          <div>
            <strong>Analogous:</strong> Colors adjacent on the color wheel, creating serene and comfortable designs
          </div>
          <div>
            <strong>Complementary:</strong> Colors opposite on the color wheel, creating vibrant contrast
          </div>
          <div>
            <strong>Triadic:</strong> Three colors evenly spaced on the color wheel, vibrant yet balanced
          </div>
          <div>
            <strong>Tetradic:</strong> Four colors arranged in two complementary pairs
          </div>
          <div>
            <strong>Monochromatic:</strong> Variations of a single hue, creating a cohesive look
          </div>
        </div>
      </div>
    </div>
  );
};
