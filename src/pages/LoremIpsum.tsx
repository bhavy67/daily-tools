import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export const LoremIpsum = () => {
  const [output, setOutput] = useState('');
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [copied, setCopied] = useState(false);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 10;
    const words = [];
    for (let i = 0; i < length; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4;
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generate = () => {
    let result = '';

    if (type === 'paragraphs') {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      result = paragraphs.join('\n\n');
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      result = sentences.join(' ');
    } else if (type === 'words') {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      result = words.join(' ');
    }

    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Lorem Ipsum Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate placeholder text for your designs
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="input-field"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Count
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="input-field"
            />
          </div>

          <div className="flex items-end">
            <button onClick={generate} className="btn-primary w-full">
              <RefreshCw className="w-4 h-4 inline-block mr-2" />
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated Text
            </label>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="textarea-field h-96 resize-none"
          />

          {/* Stats */}
          <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Words: {output.split(/\s+/).length}</span>
            <span>Characters: {output.length}</span>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          About Lorem Ipsum:
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries
          for previewing layouts and visual mockups. It has been the industry standard since the 1500s.
        </p>
      </div>
    </div>
  );
};
