import React, { useState } from 'react';
import { FileDown, FileUp, Copy, Minimize2, Check } from 'lucide-react';

const JsonMinifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const minifyJson = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          JSON Minifier
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Remove whitespace and minimize your JSON data
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <div className="flex items-center justify-between mb-2 min-h-[40px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Input JSON
              </label>
              <label className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer" title="Upload file">
                <FileUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <input
                  type="file"
                  accept=".json"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Output Section */}
          <div>
            <div className="flex items-center justify-between mb-2 min-h-[40px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minified JSON
              </label>
              {output && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
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
                    onClick={handleDownload}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Download as file"
                  >
                    <FileDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Minified JSON will appear here..."
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm"
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={minifyJson}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <Minimize2 className="inline-block w-5 h-5 mr-2" />
            Minify JSON
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Stats */}
        {output && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Original Size</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {input.length} bytes
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Minified Size</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {output.length} bytes
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {input.length - output.length} bytes
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Reduction</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {((1 - output.length / input.length) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonMinifier;
