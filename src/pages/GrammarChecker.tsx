import { useState } from 'react';
import { Check, AlertCircle, Copy, Check as CheckIcon } from 'lucide-react';

interface Issue {
  type: 'spelling' | 'grammar' | 'suggestion';
  message: string;
  position: number;
  length: number;
}

export const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [copied, setCopied] = useState(false);

  // Simple spelling dictionary (common misspellings)
  const spellingRules: Record<string, string> = {
    'recieve': 'receive',
    'occured': 'occurred',
    'seperate': 'separate',
    'definately': 'definitely',
    'untill': 'until',
    'thier': 'their',
    'truely': 'truly',
    'occassion': 'occasion',
    'wierd': 'weird',
    'neccessary': 'necessary',
    'accomodate': 'accommodate',
    'acheive': 'achieve',
    'beleive': 'believe',
    'calender': 'calendar',
    'concious': 'conscious',
    'excercise': 'exercise',
    'greatful': 'grateful',
    'independant': 'independent',
    'judgement': 'judgment',
    'maintainance': 'maintenance',
  };

  // Grammar rules
  const grammarRules = [
    { pattern: /\bi\s/gi, replacement: 'I ', message: 'Capitalize "I"' },
    { pattern: /\s{2,}/g, replacement: ' ', message: 'Multiple spaces' },
    { pattern: /\.{2,}/g, replacement: '...', message: 'Use ellipsis (...)' },
    { pattern: /\?\?+/g, replacement: '?', message: 'Multiple question marks' },
    { pattern: /\!{2,}/g, replacement: '!', message: 'Multiple exclamation marks' },
    { pattern: /\s+([,.:;!?])/g, replacement: '$1', message: 'Space before punctuation' },
    { pattern: /([.!?])[a-z]/g, replacement: (match:string) => match[0] + ' ' + match[1].toUpperCase(), message: 'Capitalize after sentence' },
  ];

  const checkText = () => {
    const foundIssues: Issue[] = [];
    const words = text.toLowerCase().split(/\b/);
    let position = 0;

    // Check spelling
    words.forEach((word) => {
      const cleanWord = word.replace(/[^a-z]/gi, '');
      if (cleanWord && spellingRules[cleanWord]) {
        foundIssues.push({
          type: 'spelling',
          message: `"${cleanWord}" might be misspelled. Did you mean "${spellingRules[cleanWord]}"?`,
          position,
          length: word.length,
        });
      }
      position += word.length;
    });

    // Check grammar
    grammarRules.forEach((rule) => {
      const matches = text.matchAll(rule.pattern);
      for (const match of matches) {
        if (match.index !== undefined) {
          foundIssues.push({
            type: 'grammar',
            message: rule.message,
            position: match.index,
            length: match[0].length,
          });
        }
      }
    });

    // Check common grammar issues
    if (/\bits\s+a\s+/gi.test(text)) {
      foundIssues.push({
        type: 'suggestion',
        message: 'Consider using "it\'s" (it is) instead of "its" (possessive)',
        position: text.toLowerCase().indexOf('its a'),
        length: 5,
      });
    }

    if (/\byour\s+going\s+/gi.test(text)) {
      foundIssues.push({
        type: 'suggestion',
        message: 'Did you mean "you\'re going" (you are going)?',
        position: text.toLowerCase().indexOf('your going'),
        length: 11,
      });
    }

    setIssues(foundIssues.sort((a, b) => a.position - b.position));
  };

  const autoFix = () => {
    let fixed = text;

    // Fix grammar rules
    grammarRules.forEach((rule) => {
      if (typeof rule.replacement === 'string') {
        fixed = fixed.replace(rule.pattern, rule.replacement);
      } else {
        fixed = fixed.replace(rule.pattern, rule.replacement as any);
      }
    });

    // Fix spelling
    Object.keys(spellingRules).forEach((wrong) => {
      const correct = spellingRules[wrong];
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      fixed = fixed.replace(regex, correct);
    });

    setText(fixed);
    setIssues([]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'spelling':
        return 'text-red-600 dark:text-red-400';
      case 'grammar':
        return 'text-orange-600 dark:text-orange-400';
      case 'suggestion':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'spelling':
      case 'grammar':
        return <AlertCircle className="w-4 h-4" />;
      case 'suggestion':
        return <Check className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Grammar & Spell Checker
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Check your text for spelling mistakes, grammar issues, and get suggestions
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3">
          <button onClick={checkText} className="btn-primary">
            Check Text
          </button>
          <button
            onClick={autoFix}
            disabled={issues.length === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Auto Fix
          </button>
          <button onClick={() => { setText(''); setIssues([]); }} className="btn-secondary">
            Clear
          </button>
          <button onClick={copyToClipboard} className="btn-secondary ml-auto">
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4 inline-block mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 inline-block mr-2" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="textarea-field h-96 resize-none font-mono text-sm"
          />
          
          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {text.split(/\s+/).filter(w => w.length > 0).length}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {text.length}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">Issues</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {issues.length}
              </div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Issues Found
          </label>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-96 overflow-y-auto">
            {issues.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Check className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {text.length === 0
                    ? 'Enter some text and click "Check Text"'
                    : 'No issues found! Your text looks good.'}
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  >
                    <div className={`flex items-start gap-2 mb-2 ${getIssueColor(issue.type)}`}>
                      {getIssueIcon(issue.type)}
                      <span className="text-xs font-semibold uppercase">
                        {issue.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {issue.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 What This Tool Checks
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Common spelling mistakes</li>
          <li>• Basic grammar rules (capitalization, punctuation)</li>
          <li>• Spacing issues (multiple spaces, spaces before punctuation)</li>
          <li>• Common word confusions (its/it's, your/you're)</li>
        </ul>
      </div>

      {/* Note */}
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          📝 Note
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This is a basic grammar and spell checker. For comprehensive writing assistance, 
          consider professional tools like Grammarly, LanguageTool, or Hemingway Editor. 
          This tool checks common issues only and may not catch all errors.
        </p>
      </div>
    </div>
  );
};
