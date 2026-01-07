import { useState } from 'react';
import { Type, Copy, Check, RefreshCw } from 'lucide-react';

export const LoremIpsumGenerator = () => {
  const [paragraphs, setParagraphs] = useState('3');
  const [wordsPerParagraph, setWordsPerParagraph] = useState('50');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [includeHTML, setIncludeHTML] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'mauris', 'augue',
    'neque', 'gravida', 'cum', 'sociis', 'natoque', 'penatibus', 'magnis', 'dis',
    'parturient', 'montes', 'nascetur', 'ridiculus', 'mus', 'donec', 'quam',
    'felis', 'ultricies', 'nec', 'pellentesque', 'eu', 'pretium', 'quis',
    'sem', 'nulla', 'consequat', 'massa', 'integer', 'vitae', 'justo', 'eget',
    'arcu', 'dictum', 'varius', 'duis', 'at', 'tellus', 'elementum', 'sagittis',
    'vitae', 'diam', 'maecenas', 'ultricies', 'mi', 'eget', 'mauris', 'pharetra',
    'et', 'ultrices', 'neque', 'ornare', 'aenean', 'euismod', 'faucibus',
    'turpis', 'egestas', 'integer', 'eget', 'aliquet', 'nibh', 'praesent',
    'tristique', 'magna', 'sit', 'amet', 'purus', 'gravida', 'quis', 'blandit',
  ];

  const generateLorem = () => {
    const numParagraphs = parseInt(paragraphs) || 1;
    const numWords = parseInt(wordsPerParagraph) || 50;
    const result: string[] = [];

    for (let i = 0; i < numParagraphs; i++) {
      const paragraph: string[] = [];
      
      // First paragraph starts with "Lorem ipsum" if enabled
      if (i === 0 && startWithLorem) {
        paragraph.push('Lorem', 'ipsum');
      }

      // Fill rest of paragraph with random words
      while (paragraph.length < numWords) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        paragraph.push(randomWord);
      }

      // Capitalize first letter
      paragraph[0] = paragraph[0].charAt(0).toUpperCase() + paragraph[0].slice(1);

      // Join words and add period
      let text = paragraph.join(' ') + '.';

      // Wrap in <p> tags if HTML is enabled
      if (includeHTML) {
        text = `<p>${text}</p>`;
      }

      result.push(text);
    }

    setGeneratedText(result.join(includeHTML ? '\n' : '\n\n'));
  };

  const handleCopy = async () => {
    if (!generatedText) return;
    
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Lorem Ipsum Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate placeholder text for your designs and mockups
        </p>
      </div>

      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Paragraphs
              </label>
              <input
                type="number"
                value={paragraphs}
                onChange={(e) => setParagraphs(e.target.value)}
                min="1"
                max="20"
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Words per Paragraph
              </label>
              <input
                type="number"
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(e.target.value)}
                min="10"
                max="200"
                className="input-field w-full"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Start with "Lorem ipsum"
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHTML}
                onChange={(e) => setIncludeHTML(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Wrap paragraphs in &lt;p&gt; tags
              </span>
            </label>
          </div>

          <button
            onClick={generateLorem}
            className="mt-6 w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Lorem Ipsum
          </button>
        </div>

        {/* Generated Text */}
        {generatedText && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Generated Text
                </h3>
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                {generatedText}
              </pre>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>
                {generatedText.split(/\n\n|\n/).filter(p => p.trim()).length} paragraphs
              </span>
              <span>•</span>
              <span>
                {generatedText.split(/\s+/).length} words
              </span>
              <span>•</span>
              <span>
                {generatedText.length} characters
              </span>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            About Lorem Ipsum
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing 
            industries for previewing layouts and visual mockups. It helps designers focus on 
            layout and visual elements without being distracted by meaningful content.
          </p>
        </div>
      </div>
    </div>
  );
};
