import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { JsonFormatter } from './pages/JsonFormatter';
import JsonMinifier from './pages/JsonMinifier';
import JsonValidator from './pages/JsonValidator';
import JsonDiff from './pages/JsonDiff';
import { UrlEncoderDecoder } from './pages/UrlEncoderDecoder';
import { Base64Converter } from './pages/Base64Converter';
import HtmlEncoderDecoder from './pages/HtmlEncoderDecoder';
import Base64ImageConverter from './pages/Base64ImageConverter';
import { HashGenerator } from './pages/HashGenerator';
import { ColorConverter } from './pages/ColorConverter';
import { MarkdownPreview } from './pages/MarkdownPreview';
import { UuidGenerator } from './pages/UuidGenerator';
import UrlSlugGenerator from './pages/UrlSlugGenerator';
import { TimestampConverter } from './pages/TimestampConverter';
import { JwtDecoder } from './pages/JwtDecoder';
import { PasswordGenerator } from './pages/PasswordGenerator';
import ApiKeyGenerator from './pages/ApiKeyGenerator';
import { CaseConverter } from './pages/CaseConverter';
import { WordCounter } from './pages/WordCounter';
import { LoremIpsum } from './pages/LoremIpsum';
import { TextDiff } from './pages/TextDiff';
import { LineSorter } from './pages/LineSorter';
import { DuplicateLines } from './pages/DuplicateLines';
import EmojiUnicode from './pages/EmojiUnicode';
import FindReplace from './pages/FindReplace';
import RegexTester from './pages/RegexTester';
import { NumberBaseConverter } from './pages/NumberBaseConverter';
import { QrGenerator } from './pages/QrGenerator';
import { CsvToJson } from './pages/CsvToJson';
import { JsonToCsv } from './pages/JsonToCsv';

// Component to scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool/json-formatter" element={<JsonFormatter />} />
          <Route path="/tool/json-minifier" element={<JsonMinifier />} />
          <Route path="/tool/json-validator" element={<JsonValidator />} />
          <Route path="/tool/json-diff" element={<JsonDiff />} />
          <Route path="/tool/url-encoder-decoder" element={<UrlEncoderDecoder />} />
          <Route path="/tool/base64-converter" element={<Base64Converter />} />
          <Route path="/tool/html-encoder-decoder" element={<HtmlEncoderDecoder />} />
          <Route path="/tool/base64-image" element={<Base64ImageConverter />} />
          <Route path="/tool/hash-generator" element={<HashGenerator />} />
          <Route path="/tool/color-converter" element={<ColorConverter />} />
          <Route path="/tool/markdown-preview" element={<MarkdownPreview />} />
          <Route path="/tool/uuid-generator" element={<UuidGenerator />} />
          <Route path="/tool/url-slug-generator" element={<UrlSlugGenerator />} />
          <Route path="/tool/timestamp-converter" element={<TimestampConverter />} />
          <Route path="/tool/jwt-decoder" element={<JwtDecoder />} />
          <Route path="/tool/password-generator" element={<PasswordGenerator />} />
          <Route path="/tool/api-key-generator" element={<ApiKeyGenerator />} />
          <Route path="/tool/case-converter" element={<CaseConverter />} />
          <Route path="/tool/word-counter" element={<WordCounter />} />
          <Route path="/tool/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/tool/text-diff" element={<TextDiff />} />
          <Route path="/tool/line-sorter" element={<LineSorter />} />
          <Route path="/tool/duplicate-lines" element={<DuplicateLines />} />
          <Route path="/tool/emoji-unicode" element={<EmojiUnicode />} />
          <Route path="/tool/find-replace" element={<FindReplace />} />
          <Route path="/tool/regex-tester" element={<RegexTester />} />
          <Route path="/tool/number-base-converter" element={<NumberBaseConverter />} />
          <Route path="/tool/qr-generator" element={<QrGenerator />} />
          <Route path="/tool/csv-to-json" element={<CsvToJson />} />
          <Route path="/tool/json-to-csv" element={<JsonToCsv />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

