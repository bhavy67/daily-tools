import { useState } from 'react';
import { Car, RefreshCw, Copy, Check, Info } from 'lucide-react';

export const VinGenerator = () => {
  const [vin, setVin] = useState('');
  const [copied, setCopied] = useState(false);

  // VIN structure components
  const WMI_CODES = ['1G1', '1FA', '1HG', '1J4', '2G1', '2T1', '3VW', '4T1', '5NP', 'JM1', 'KM8', 'WBA', 'WDB', 'YV1', 'ZFF'];
  const VDS_CHARS = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ'; // I, O, Q excluded
  const VIS_NUMBERS = '0123456789';
  const VIS_LETTERS = 'ABCDEFGHJKLMNPRSTUVWXYZ';

  // Calculate check digit using VIN algorithm
  const calculateCheckDigit = (vinWithoutCheck: string): string => {
    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    const values: { [key: string]: number } = {
      '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9,
      'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9
    };

    let sum = 0;
    for (let i = 0; i < vinWithoutCheck.length; i++) {
      const char = vinWithoutCheck[i];
      sum += (values[char] || 0) * weights[i];
    }

    const remainder = sum % 11;
    return remainder === 10 ? 'X' : remainder.toString();
  };

  const generateVIN = () => {
    // WMI (World Manufacturer Identifier) - 3 characters
    const wmi = WMI_CODES[Math.floor(Math.random() * WMI_CODES.length)];

    // VDS (Vehicle Descriptor Section) - 5 characters
    let vds = '';
    for (let i = 0; i < 5; i++) {
      vds += VDS_CHARS[Math.floor(Math.random() * VDS_CHARS.length)];
    }

    // VIS (Vehicle Identifier Section) - 8 characters
    // Position 10 (index 9) is the model year
    const modelYearCode = VIS_LETTERS[Math.floor(Math.random() * VIS_LETTERS.length)];
    
    // Position 11 (index 10) is the plant code
    const plantCode = VDS_CHARS[Math.floor(Math.random() * VDS_CHARS.length)];

    // Positions 12-17 (index 11-16) are the sequential production number
    let sequentialNumber = '';
    for (let i = 0; i < 6; i++) {
      sequentialNumber += VIS_NUMBERS[Math.floor(Math.random() * VIS_NUMBERS.length)];
    }

    // Build VIN without check digit
    const vinWithoutCheck = wmi + vds + '0' + modelYearCode + plantCode + sequentialNumber;

    // Calculate check digit
    const checkDigit = calculateCheckDigit(vinWithoutCheck);

    // Insert check digit at position 9 (index 8)
    const finalVin = vinWithoutCheck.substring(0, 8) + checkDigit + vinWithoutCheck.substring(9);

    setVin(finalVin);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Car className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
          VIN Generator
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-sans">
          Generate valid Vehicle Identification Numbers (VIN) for testing and development
        </p>
      </div>

      {/* Generator Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={generateVIN}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            Generate VIN
          </button>
          {vin && (
            <button
              onClick={copyToClipboard}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-semibold text-sm sm:text-base flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Generated VIN Display */}
      {vin && (
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-heading">
            Generated VIN
          </label>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-300 dark:border-indigo-700 rounded-xl p-4 sm:p-6">
            <pre className="text-lg sm:text-xl lg:text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-100 break-all whitespace-pre-wrap">
              {vin}
            </pre>
          </div>
        </div>
      )}

      {/* VIN Structure Info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 sm:p-6 mb-6">
        <h3 className="text-sm sm:text-base font-bold text-blue-900 dark:text-blue-300 mb-3 font-heading flex items-center gap-2">
          <Info className="w-5 h-5" />
          VIN Structure (17 Characters)
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-blue-800 dark:text-blue-200 font-sans">
          <div className="flex items-start gap-2">
            <span className="font-bold font-mono bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded">1-3</span>
            <div>
              <span className="font-semibold">WMI (World Manufacturer Identifier):</span> Identifies the manufacturer and country of origin
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold font-mono bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded">4-8</span>
            <div>
              <span className="font-semibold">VDS (Vehicle Descriptor Section):</span> Vehicle features, model, body type, engine
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold font-mono bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded">9</span>
            <div>
              <span className="font-semibold">Check Digit:</span> Validates the VIN using mathematical formula
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold font-mono bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded">10</span>
            <div>
              <span className="font-semibold">Model Year:</span> Letter representing the vehicle's model year
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold font-mono bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded">11</span>
            <div>
              <span className="font-semibold">Plant Code:</span> Manufacturing plant identifier
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold font-mono bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded">12-17</span>
            <div>
              <span className="font-semibold">Sequential Number:</span> Unique production sequence number
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm sm:text-base font-bold text-yellow-900 dark:text-yellow-300 mb-3 font-heading flex items-center gap-2">
          <span className="text-lg">⚠️</span> Important Notes
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-yellow-800 dark:text-yellow-200 font-sans">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">•</span>
            <span>These VINs are <strong>randomly generated for testing purposes only</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">•</span>
            <span>VINs follow the <strong>ISO 3779 standard</strong> and include valid check digits</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">•</span>
            <span><strong>Do not use for fraud or illegal purposes</strong> - for development and testing only</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">•</span>
            <span>Letters <strong>I, O, Q</strong> are excluded from VINs to avoid confusion with numbers 1 and 0</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">•</span>
            <span>Generated VINs use common manufacturer codes (Ford, GM, Honda, Toyota, etc.)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
