import { useState } from 'react';
import { Copy, Check, Download, Upload } from 'lucide-react';
import Papa from 'papaparse';

export const JsonToCsv = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [delimiter, setDelimiter] = useState(',');

  const convertToCsv = () => {
    try {
      if (!jsonInput.trim()) {
        setError('Please enter JSON data');
        setCsvOutput('');
        return;
      }

      const parsed = JSON.parse(jsonInput);
      
      if (!Array.isArray(parsed)) {
        setError('JSON must be an array of objects');
        setCsvOutput('');
        return;
      }

      const csv = Papa.unparse(parsed, {
        header: includeHeaders,
        delimiter: delimiter
      });

      setCsvOutput(csv);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setCsvOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setJsonInput(text);
      };
      reader.readAsText(file);
    }
  };

  const loadExample = () => {
    const example = `[
  {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "country": "USA"
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "city": "London",
    "country": "UK"
  },
  {
    "name": "Bob Johnson",
    "age": 35,
    "city": "Toronto",
    "country": "Canada"
  }
]`;
    setJsonInput(example);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          JSON to CSV Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Convert JSON array to CSV format
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Delimiter:
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="input-field py-1.5 px-3 min-w-[120px]"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Include headers
            </span>
          </label>

          <button onClick={convertToCsv} className="btn-primary">
            Convert to CSV
          </button>

          <button onClick={loadExample} className="btn-secondary">
            Load Example
          </button>

          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload JSON
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2 min-h-[40px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON Input
            </label>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[{"name": "John", "age": 30}]'
            className="textarea-field h-96 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2 min-h-[40px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              CSV Output
            </label>
            {csvOutput && (
              <div className="flex gap-2">
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
                <button
                  onClick={downloadCsv}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Download as file"
                >
                  <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>
          <textarea
            value={csvOutput}
            readOnly
            placeholder="CSV output will appear here..."
            className="textarea-field h-96 resize-none font-mono text-sm"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• JSON must be an array of objects</li>
          <li>• All objects should have the same structure for best results</li>
          <li>• Choose your preferred delimiter</li>
          <li>• Export to open in Excel or other spreadsheet software</li>
        </ul>
      </div>
    </div>
  );
};
