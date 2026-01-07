import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { JsonFormatter } from './pages/JsonFormatter';
import { UrlEncoderDecoder } from './pages/UrlEncoderDecoder';
import { Base64Converter } from './pages/Base64Converter';
import { HashGenerator } from './pages/HashGenerator';
import { ColorConverter } from './pages/ColorConverter';
import { MarkdownPreview } from './pages/MarkdownPreview';
import { UuidGenerator } from './pages/UuidGenerator';
import { TimestampConverter } from './pages/TimestampConverter';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool/json-formatter" element={<JsonFormatter />} />
          <Route path="/tool/url-encoder-decoder" element={<UrlEncoderDecoder />} />
          <Route path="/tool/base64-converter" element={<Base64Converter />} />
          <Route path="/tool/hash-generator" element={<HashGenerator />} />
          <Route path="/tool/color-converter" element={<ColorConverter />} />
          <Route path="/tool/markdown-preview" element={<MarkdownPreview />} />
          <Route path="/tool/uuid-generator" element={<UuidGenerator />} />
          <Route path="/tool/timestamp-converter" element={<TimestampConverter />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

