import React, { useState } from 'react';
import { Smile, Copy, ArrowLeftRight } from 'lucide-react';

const EmojiUnicode: React.FC = () => {
  const [mode, setMode] = useState<'toUnicode' | 'toEmoji'>('toUnicode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const emojiToUnicode = (text: string): string => {
    return Array.from(text)
      .map(char => {
        const codePoint = char.codePointAt(0);
        if (codePoint && codePoint > 127) {
          return `\\u{${codePoint.toString(16).toUpperCase()}}`;
        }
        return char;
      })
      .join('');
  };

  const unicodeToEmoji = (text: string): string => {
    try {
      // Handle both \u{} and \u formats
      return text
        .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, code) => 
          String.fromCodePoint(parseInt(code, 16))
        )
        .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => 
          String.fromCharCode(parseInt(code, 16))
        )
        .replace(/U\+([0-9a-fA-F]+)/gi, (_, code) => 
          String.fromCodePoint(parseInt(code, 16))
        );
    } catch (err) {
      return text;
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Auto-convert on input
    if (mode === 'toUnicode') {
      setOutput(emojiToUnicode(value));
    } else {
      setOutput(unicodeToEmoji(value));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === 'toUnicode' ? 'toEmoji' : 'toUnicode');
    if (mode === 'toUnicode') {
      setOutput(unicodeToEmoji(output));
    } else {
      setOutput(emojiToUnicode(output));
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const popularEmojis = [
    { emoji: '😀', name: 'Grinning Face' },
    { emoji: '❤️', name: 'Red Heart' },
    { emoji: '👍', name: 'Thumbs Up' },
    { emoji: '🎉', name: 'Party Popper' },
    { emoji: '🔥', name: 'Fire' },
    { emoji: '⭐', name: 'Star' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '💡', name: 'Light Bulb' },
    { emoji: '🌈', name: 'Rainbow' },
    { emoji: '🎨', name: 'Artist Palette' },
    { emoji: '🎵', name: 'Musical Note' },
    { emoji: '🌟', name: 'Glowing Star' }
  ];

  const handleEmojiClick = (emoji: string) => {
    setInput(input + emoji);
    setOutput(output + emojiToUnicode(emoji));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Emoji ⇄ Unicode Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Convert between emoji and Unicode representations
        </p>

        {/* Mode Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setMode('toUnicode');
              setInput('');
              setOutput('');
            }}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              mode === 'toUnicode'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Emoji → Unicode
          </button>
          <button
            onClick={() => {
              setMode('toEmoji');
              setInput('');
              setOutput('');
            }}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              mode === 'toEmoji'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Unicode → Emoji
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'toUnicode' ? 'Input (Emoji)' : 'Input (Unicode)'}
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                mode === 'toUnicode'
                  ? 'Enter text with emojis...'
                  : 'Enter Unicode (e.g., \\u{1F600}, U+1F600, \\u0041)...'
              }
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              style={{ fontSize: mode === 'toUnicode' ? '1.5rem' : '0.875rem' }}
            />
          </div>

          {/* Output Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'toUnicode' ? 'Output (Unicode)' : 'Output (Emoji)'}
              </label>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <Copy className="inline-block w-4 h-4 mr-1" />
                Copy
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
              style={{ fontSize: mode === 'toEmoji' ? '1.5rem' : '0.875rem' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSwap}
            disabled={!output}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <ArrowLeftRight className="inline-block w-5 h-5 mr-2" />
            Swap
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Emoji Picker */}
        {mode === 'toUnicode' && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Smile className="w-5 h-5" />
              Quick Add Emojis
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {popularEmojis.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(item.emoji)}
                  title={item.name}
                  className="p-3 bg-white dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-2xl"
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Supported Unicode Formats
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 font-mono">
              <li>• \u{'{'}1F600{'}'} (ES6)</li>
              <li>• \u0041 (4-digit hex)</li>
              <li>• U+1F600 (Unicode notation)</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">
              Example
            </h3>
            <p className="text-sm text-green-800 dark:text-green-400 font-mono">
              😀 → \u{'{'}1F600{'}'}
              <br />
              ❤️ → \u{'{'}2764{'}'}\u{'{'}FE0F{'}'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiUnicode;
