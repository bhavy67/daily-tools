import React, { useState } from 'react';
import { Code, Copy, FileDown, FileUp } from 'lucide-react';

const HtmlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  const encodeHtml = (text: string): string => {
    return text.replace(/[&<>"'`=\/]/g, (char) => htmlEntities[char]);
  };

  const decodeHtml = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      setOutput(encodeHtml(input));
    } else {
      setOutput(decodeHtml(input));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
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
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          HTML Encoder/Decoder
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Encode or decode HTML entities for safe rendering
        </p>

        {/* Mode Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Encode HTML
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Decode HTML
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
              </label>
              <label className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                <FileUp className="inline-block w-4 h-4 mr-1" />
                Upload
                <input
                  type="file"
                  accept=".txt,.html"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter HTML entities to decode...'}
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Output Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'encode' ? 'HTML Entities' : 'Plain Text'}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <Copy className="inline-block w-4 h-4 mr-1" />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!output}
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <FileDown className="inline-block w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder={mode === 'encode' ? 'Encoded HTML entities will appear here...' : 'Decoded text will appear here...'}
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleProcess}
            disabled={!input}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Code className="inline-block w-5 h-5 mr-2" />
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          <button
            onClick={handleSwap}
            disabled={!output}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ⇄ Swap
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Common HTML Entities Reference */}
        <div className="mt-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common HTML Entities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono">
            {Object.entries(htmlEntities).map(([char, entity]) => (
              <div key={char} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                <span className="text-gray-900 dark:text-gray-100 font-bold">{char}</span>
                <span className="text-gray-600 dark:text-gray-400">{entity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlEncoderDecoder;
