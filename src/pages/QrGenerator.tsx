import { useState, useEffect } from 'react';
import { QrCode, Download, Copy, Check } from 'lucide-react';
import QRCodeLib from 'qrcode';

export const QrGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (text) {
      generateQRCode();
    } else {
      setQrCodeUrl('');
    }
  }, [text, size]);

  const generateQRCode = async () => {
    try {
      const url = await QRCodeLib.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrCodeUrl) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              QR Code Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Generate QR codes from any text or URL
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Enter Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or any data to encode..."
              rows={6}
              className="textarea-field"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              QR Code Size: {size}x{size}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>128px</span>
              <span>256px</span>
              <span>384px</span>
              <span>512px</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-3">
              💡 Usage Tips
            </h3>
            <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
              <li>• Works with URLs, text, contact info, WiFi credentials</li>
              <li>• Larger sizes provide better scanning from distance</li>
              <li>• Keep text short for simpler, cleaner QR codes</li>
              <li>• Test your QR code with a scanner before use</li>
            </ul>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
            {qrCodeUrl ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-2xl shadow-lg">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="w-full h-auto"
                      style={{ maxWidth: `${size}px` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={downloadQRCode}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PNG
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Image
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter text or URL to generate QR code
                </p>
              </div>
            )}
          </div>

          {/* Common Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Quick Examples
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setText('https://github.com')}
                className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors text-sm"
              >
                <span className="font-semibold text-gray-900 dark:text-white">Website URL</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">https://github.com</p>
              </button>
              <button
                onClick={() => setText('mailto:hello@example.com')}
                className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors text-sm"
              >
                <span className="font-semibold text-gray-900 dark:text-white">Email Address</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">mailto:hello@example.com</p>
              </button>
              <button
                onClick={() => setText('tel:+1234567890')}
                className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors text-sm"
              >
                <span className="font-semibold text-gray-900 dark:text-white">Phone Number</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">tel:+1234567890</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
