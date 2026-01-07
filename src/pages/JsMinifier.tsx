import { useState } from 'react';
import { Copy, Check, Download, Upload } from 'lucide-react';

export const JsMinifier = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });
  const [removeComments, setRemoveComments] = useState(true);
  const [removeWhitespace, setRemoveWhitespace] = useState(true);

  const minifyJs = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    let minified = input;

    // Remove single-line comments
    if (removeComments) {
      minified = minified.replace(/\/\/.*$/gm, '');
      // Remove multi-line comments
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    }

    if (removeWhitespace) {
      // Remove whitespace
      minified = minified
        .replace(/\s+/g, ' ') // Multiple spaces to single space
        .replace(/\s*{\s*/g, '{') // Spaces around {
        .replace(/\s*}\s*/g, '}') // Spaces around }
        .replace(/\s*\(\s*/g, '(') // Spaces around (
        .replace(/\s*\)\s*/g, ')') // Spaces around )
        .replace(/\s*;\s*/g, ';') // Spaces around ;
        .replace(/\s*,\s*/g, ',') // Spaces around ,
        .replace(/\s*:\s*/g, ':') // Spaces around :
        .replace(/\s*=\s*/g, '=') // Spaces around =
        .replace(/\s*\+\s*/g, '+') // Spaces around +
        .replace(/\s*-\s*/g, '-') // Spaces around -
        .replace(/\s*\*\s*/g, '*') // Spaces around *
        .replace(/\s*\/\s*/g, '/') // Spaces around /
        .replace(/\s*<\s*/g, '<') // Spaces around <
        .replace(/\s*>\s*/g, '>') // Spaces around >
        .replace(/\s*\?\s*/g, '?') // Spaces around ?
        .replace(/\s*\|\s*/g, '|') // Spaces around |
        .replace(/\s*&\s*/g, '&') // Spaces around &
        .replace(/\s*\[\s*/g, '[') // Spaces around [
        .replace(/\s*\]\s*/g, ']') // Spaces around ]
        .trim();
    }

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
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.js';
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
    const example = `// Utility functions
function greet(name) {
  const message = 'Hello, ' + name + '!';
  console.log(message);
  return message;
}

/* Array utilities */
function filterArray(arr, predicate) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Event handler
const handleClick = (event) => {
  event.preventDefault();
  const target = event.target;
  
  // Add class
  target.classList.add('active');
  
  // Remove after delay
  setTimeout(() => {
    target.classList.remove('active');
  }, 1000);
};

// Export module
export { greet, filterArray, handleClick };`;
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
          JavaScript Minifier
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Minify and compress JavaScript code to reduce file size
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeComments}
              onChange={(e) => setRemoveComments(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Remove comments
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeWhitespace}
              onChange={(e) => setRemoveWhitespace(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Remove whitespace
            </span>
          </label>

          <button onClick={minifyJs} className="btn-primary">
            Minify JavaScript
          </button>

          <button onClick={loadExample} className="btn-secondary">
            Load Example
          </button>

          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload JS
            <input
              type="file"
              accept=".js,.jsx,.ts,.tsx"
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
          <div className="flex items-center justify-between mb-2 min-h-[40px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              JavaScript Input
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JavaScript code here..."
            className="textarea-field h-96 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2 min-h-[40px]">
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
            placeholder="Minified JavaScript will appear here..."
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
          <li>• Single-line comments (//...)</li>
          <li>• Multi-line comments (/* ... */)</li>
          <li>• Unnecessary whitespace and line breaks</li>
          <li>• Spaces around operators and punctuation</li>
          <li>• Leading and trailing whitespace</li>
        </ul>
      </div>

      {/* Warning */}
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          ⚠️ Note
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This is a basic minifier for simple use cases. For production applications, 
          use specialized tools like Terser, UglifyJS, or esbuild which provide advanced 
          optimizations, variable renaming, and safe transformations.
        </p>
      </div>
    </div>
  );
};
