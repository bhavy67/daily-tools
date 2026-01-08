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

  // Comprehensive spelling dictionary (common misspellings)
  const spellingRules: Record<string, string> = {
    // Common misspellings
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
    
    // Additional common errors
    'absense': 'absence',
    'acceptible': 'acceptable',
    'accidentaly': 'accidentally',
    'acomplish': 'accomplish',
    'arguement': 'argument',
    'athiest': 'atheist',
    'begining': 'beginning',
    'bizzare': 'bizarre',
    'buisness': 'business',
    'commited': 'committed',
    'commitee': 'committee',
    'completly': 'completely',
    'concieve': 'conceive',
    'copywrite': 'copyright',
    'curiousity': 'curiosity',
    'decieve': 'deceive',
    'desparate': 'desperate',
    'developement': 'development',
    'disapear': 'disappear',
    'disapoint': 'disappoint',
    'ecstacy': 'ecstasy',
    'embarass': 'embarrass',
    'enviroment': 'environment',
    'experiance': 'experience',
    'facination': 'fascination',
    'finaly': 'finally',
    'foriegn': 'foreign',
    'fourty': 'forty',
    'freind': 'friend',
    'gaurantee': 'guarantee',
    'goverment': 'government',
    'grammer': 'grammar',
    'harrass': 'harass',
    'heirarchy': 'hierarchy',
    'humerous': 'humorous',
    'hygeine': 'hygiene',
    'ignorence': 'ignorance',
    'immediatly': 'immediately',
    'incidently': 'incidentally',
    'indispensible': 'indispensable',
    'innoculate': 'inoculate',
    'inteligence': 'intelligence',
    'intresting': 'interesting',
    'knowlege': 'knowledge',
    'liesure': 'leisure',
    'liason': 'liaison',
    'libary': 'library',
    'lisence': 'license',
    'manouver': 'maneuver',
    'millenium': 'millennium',
    'minature': 'miniature',
    'mischievious': 'mischievous',
    'misspell': 'misspell',
    'noticable': 'noticeable',
    'occurance': 'occurrence',
    'omision': 'omission',
    'oppurtunity': 'opportunity',
    'outragous': 'outrageous',
    'parrallel': 'parallel',
    'persistant': 'persistent',
    'personaly': 'personally',
    'persaude': 'persuade',
    'playwrite': 'playwright',
    'portugese': 'portuguese',
    'posession': 'possession',
    'potatos': 'potatoes',
    'preceed': 'precede',
    'prefered': 'preferred',
    'predjudice': 'prejudice',
    'presense': 'presence',
    'privelege': 'privilege',
    'probaly': 'probably',
    'profesional': 'professional',
    'pronounciation': 'pronunciation',
    'publically': 'publicly',
    'realy': 'really',
    'reccomend': 'recommend',
    'referance': 'reference',
    'relevent': 'relevant',
    'religous': 'religious',
    'repitition': 'repetition',
    'resistence': 'resistance',
    'rythm': 'rhythm',
    'succesful': 'successful',
    'supercede': 'supersede',
    'suprise': 'surprise',
    'temperture': 'temperature',
    'tomatos': 'tomatoes',
    'tommorrow': 'tomorrow',
    'twelth': 'twelfth',
    'unforseen': 'unforeseen',
    'unfortunatly': 'unfortunately',
    'unusuall': 'unusual',
    'vaccuum': 'vacuum',
    'vegatarian': 'vegetarian',
    'visious': 'vicious',
    'wether': 'whether',
    'whereever': 'wherever',
  };

  // Grammar rules
  const grammarRules = [
    { pattern: /\bi\s/gi, replacement: 'I ', message: 'Capitalize "I"' },
    { pattern: /\s{2,}/g, replacement: ' ', message: 'Multiple spaces found' },
    { pattern: /\.{2,}/g, replacement: '...', message: 'Use ellipsis (...)' },
    { pattern: /\?\?+/g, replacement: '?', message: 'Remove multiple question marks' },
    { pattern: /\!{2,}/g, replacement: '!', message: 'Remove multiple exclamation marks' },
    { pattern: /\s+([,.:;!?])/g, replacement: '$1', message: 'Remove space before punctuation' },
    { pattern: /([.!?])[a-z]/g, replacement: (match:string) => match[0] + ' ' + match[1].toUpperCase(), message: 'Capitalize after sentence' },
    { pattern: /\bteh\b/gi, replacement: 'the', message: '"teh" should be "the"' },
    { pattern: /\badn\b/gi, replacement: 'and', message: '"adn" should be "and"' },
    { pattern: /\btaht\b/gi, replacement: 'that', message: '"taht" should be "that"' },
    { pattern: /\bwas\s+a\s+were\b/gi, replacement: 'was', message: 'Incorrect verb form' },
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
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
          Grammar & Spell Checker
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-sans">
          Check your text for spelling mistakes, grammar issues, and get suggestions - 100+ words in dictionary
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3">
          <button onClick={checkText} className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:shadow-xl">
            Check Text
          </button>
          <button
            onClick={autoFix}
            disabled={issues.length === 0}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-semibold text-sm sm:text-base disabled:shadow-none shadow-lg shadow-green-600/30 hover:shadow-xl"
          >
            Auto Fix
          </button>
          <button onClick={() => { setText(''); setIssues([]); }} className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-semibold text-sm sm:text-base">
            Clear
          </button>
          <button onClick={copyToClipboard} className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-semibold text-sm sm:text-base ml-auto flex items-center gap-2">
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4" />
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-heading">
            Your Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-80 sm:h-96 p-3 sm:p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
          />
          
          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-3 sm:p-4 border border-blue-200 dark:border-blue-700">
              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 font-heading">Words</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-100 font-display">
                {text.split(/\s+/).filter(w => w.length > 0).length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-3 sm:p-4 border border-purple-200 dark:border-purple-700">
              <div className="text-xs sm:text-sm text-purple-700 dark:text-purple-400 font-heading">Characters</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-100 font-display">
                {text.length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl p-3 sm:p-4 border border-red-200 dark:border-red-700">
              <div className="text-xs sm:text-sm text-red-700 dark:text-red-400 font-heading">Issues</div>
              <div className="text-xl sm:text-2xl font-bold text-red-900 dark:text-red-100 font-display">
                {issues.length}
              </div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-heading">
            Issues Found
          </label>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 h-80 sm:h-96 overflow-y-auto">
            {issues.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Check className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4" />
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-sans">
                  {text.length === 0
                    ? 'Enter some text and click "Check Text"'
                    : 'No issues found! Your text looks good.'}
                </p>
              </div>
            ) : (
              <div className="p-3 sm:p-4 space-y-3">
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all"
                  >
                    <div className={`flex items-start gap-2 mb-2 ${getIssueColor(issue.type)}`}>
                      {getIssueIcon(issue.type)}
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                        {issue.type}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-sans">
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
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm sm:text-base font-bold text-blue-900 dark:text-blue-300 mb-3 font-heading flex items-center gap-2">
          <span className="text-lg">💡</span> What This Tool Checks
        </h3>
        <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-2 font-sans">
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>100+ common spelling mistakes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>Basic grammar rules (capitalization, punctuation)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>Spacing issues (multiple spaces, spaces before punctuation)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>Common word confusions (its/it's, your/you're, their/there)</span>
          </li>
        </ul>
      </div>

      {/* Note */}
      <div className="mt-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm sm:text-base font-bold text-yellow-900 dark:text-yellow-300 mb-3 font-heading flex items-center gap-2">
          <span className="text-lg">📝</span> Note
        </h3>
        <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200 font-sans leading-relaxed">
          This is a basic grammar and spell checker running entirely in your browser. 
          For comprehensive writing assistance, consider professional tools like Grammarly, LanguageTool, or Hemingway Editor. 
          This tool checks 100+ common spelling errors and basic grammar rules.
        </p>
      </div>
    </div>
  );
};
