import { useState } from 'react';
import { Copy, Check, Download, Upload } from 'lucide-react';

export const CssMinifier = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

  const minifyCss = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    // Remove comments
    let minified = input.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove whitespace
    minified = minified
      .replace(/\s+/g, ' ') // Multiple spaces to single space
      .replace(/\s*{\s*/g, '{') // Spaces around {
      .replace(/\s*}\s*/g, '}') // Spaces around }
      .replace(/\s*:\s*/g, ':') // Spaces around :
      .replace(/\s*;\s*/g, ';') // Spaces around ;
      .replace(/\s*,\s*/g, ',') // Spaces around ,
      .replace(/;\s*}/g, '}') // Remove last semicolon in block
      .replace(/\s*>\s*/g, '>') // Spaces around >
      .replace(/\s*\+\s*/g, '+') // Spaces around +
      .replace(/\s*~\s*/g, '~') // Spaces around ~
      .trim();

    setOutput(minified);

    // Calculate stats
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const savedBytes = originalSize - minifiedSize;
    const savedPercent = originalSize > 0 ? ((savedBytes / originalSize) * 100).toFixed(1) : 0;

    setStats({
      original: originalSize,
      minified: minifiedSize,
      saved: Number(savedPercent),
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.css';
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

  const loadExample = () => {
    const example = `/* Main styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #333;
  color: white;
  padding: 1rem 2rem;
}

.button {
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}`;
    setInput(example);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CSS Minifier
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Minify and compress CSS code to reduce file size
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={minifyCss} className="btn-primary">
            Minify CSS
          </button>

          <button onClick={loadExample} className="btn-secondary">
            Load Example
          </button>

          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload CSS
            <input
              type="file"
              accept=".css"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Stats */}
      {output && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original Size</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatBytes(stats.original)}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Minified Size</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatBytes(stats.minified)}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Saved</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.saved}%
            </div>
          </div>
        </div>
      )}

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CSS Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSS code here..."
            className="textarea-field h-96 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Minified Output
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
                  onClick={downloadFile}
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
            placeholder="Minified CSS will appear here..."
            className="textarea-field h-96 resize-none font-mono text-sm"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 What gets removed?
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• All comments (/* ... */)</li>
          <li>• Unnecessary whitespace and line breaks</li>
          <li>• Spaces around operators and punctuation</li>
          <li>• Last semicolons before closing braces</li>
          <li>• Leading and trailing whitespace</li>
        </ul>
      </div>
    </div>
  );
};
