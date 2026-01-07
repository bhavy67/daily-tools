import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Download } from 'lucide-react';

export const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- Inline \`code\`

### Code Blocks

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

- Unordered item
- Another item

### Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

### Blockquotes

> This is a blockquote
> It can span multiple lines

---

**Try editing the markdown on the left to see the preview update in real-time!**
`);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Markdown Live Preview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Write and preview Markdown in real-time with GitHub Flavored Markdown support
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <button onClick={copyToClipboard} className="btn-primary">
            {copied ? (
              <>
                <Check className="w-4 h-4 inline-block mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 inline-block mr-2" />
                Copy Markdown
              </>
            )}
          </button>
          <button onClick={downloadMarkdown} className="btn-secondary">
            <Download className="w-4 h-4 inline-block mr-2" />
            Download as .md
          </button>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Markdown Editor
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Start writing markdown here..."
            className="textarea-field h-[600px] resize-none"
          />
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Live Preview
          </label>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-6 h-[600px] overflow-y-auto">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Supported Features:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• GitHub Flavored Markdown (GFM)</li>
          <li>• Tables, task lists, strikethrough</li>
          <li>• Code syntax highlighting</li>
          <li>• Links, images, and blockquotes</li>
          <li>• Headers, lists, and formatting</li>
        </ul>
      </div>
    </div>
  );
};
