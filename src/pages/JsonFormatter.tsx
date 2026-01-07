import { useState } from 'react';
import { Copy, Check, Download, Upload } from 'lucide-react';

export const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          JSON Formatter & Validator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Format, validate, and beautify your JSON data
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Indent Size:
            </span>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="input-field py-1 px-2"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </label>

          <button onClick={formatJson} className="btn-primary">
            Format JSON
          </button>

          <button onClick={minifyJson} className="btn-secondary">
            Minify JSON
          </button>

          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload File
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="textarea-field h-96 resize-none"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            {output && (
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
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="textarea-field h-96 resize-none"
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
    </div>
  );
};
