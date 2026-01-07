import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const WordCounter = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const getStatistics = () => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Reading time (average reading speed: 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    // Speaking time (average speaking speed: 130 words per minute)
    const speakingTime = Math.ceil(words / 130);

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    };
  };

  const stats = getStatistics();

  const copyStats = () => {
    const statsText = `
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Lines: ${stats.lines}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading Time: ${stats.readingTime} min
Speaking Time: ${stats.speakingTime} min
    `.trim();
    
    navigator.clipboard.writeText(statsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Word Counter
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Count words, characters, lines, and more
        </p>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="textarea-field h-64 resize-none"
        />
      </div>

      {/* Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Statistics
          </h3>
          {text && (
            <button
              onClick={copyStats}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {stats.words.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {stats.characters.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {stats.sentences.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {stats.paragraphs.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {stats.charactersNoSpaces.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Chars (no spaces)</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {stats.lines.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lines</div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.readingTime} min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Reading Time</div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.speakingTime} min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Speaking Time</div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          About the Statistics:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>Reading Time:</strong> Based on 200 words per minute average</li>
          <li>• <strong>Speaking Time:</strong> Based on 130 words per minute average</li>
          <li>• <strong>Words:</strong> Counted by whitespace separation</li>
          <li>• <strong>Sentences:</strong> Counted by punctuation (.!?)</li>
        </ul>
      </div>
    </div>
  );
};
