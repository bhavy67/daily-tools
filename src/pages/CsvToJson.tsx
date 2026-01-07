import { useState } from 'react';
import { Copy, Check, Download, Upload } from 'lucide-react';
import Papa from 'papaparse';

export const CsvToJson = () => {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const [includeHeaders, setIncludeHeaders] = useState(true);

  const convertToJson = () => {
    try {
      if (!csvInput.trim()) {
        setError('Please enter CSV data');
        setJsonOutput('');
        return;
      }

      Papa.parse(csvInput, {
        header: includeHeaders,
        skipEmptyLines: true,
        complete: (results) => {
          const formatted = JSON.stringify(results.data, null, indentSize);
          setJsonOutput(formatted);
          setError('');
        },
        error: (err: Error) => {
          setError(err.message);
          setJsonOutput('');
        }
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setJsonOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvInput(text);
      };
      reader.readAsText(file);
    }
  };

  const loadExample = () => {
    const example = `name,age,city,country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Bob Johnson,35,Toronto,Canada`;
    setCsvInput(example);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CSV to JSON Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Convert CSV data to JSON format
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Indent Size:
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="input-field py-1.5 px-3 min-w-[120px]"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
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
              First row as headers
            </span>
          </label>

          <button onClick={convertToJson} className="btn-primary">
            Convert to JSON
          </button>

          <button onClick={loadExample} className="btn-secondary">
            Load Example
          </button>

          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload CSV
            <input
              type="file"
              accept=".csv,.txt"
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
              CSV Input
            </label>
          </div>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="Paste CSV data here or upload a file..."
            className="textarea-field h-96 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2 min-h-[40px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON Output
            </label>
            {jsonOutput && (
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
                  onClick={downloadJson}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Download as file"
                >
                  <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>
          <textarea
            value={jsonOutput}
            readOnly
            placeholder="JSON output will appear here..."
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
          <li>• Paste CSV data or upload a CSV file</li>
          <li>• Enable "First row as headers" to use column names as JSON keys</li>
          <li>• Supports comma-separated and tab-separated values</li>
          <li>• Empty lines are automatically skipped</li>
        </ul>
      </div>
    </div>
  );
};
