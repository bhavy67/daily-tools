import React, { useState } from 'react';
import { Image as ImageIcon, FileUp, Copy, Download, X, Check } from 'lucide-react';

const Base64ImageConverter: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [base64String, setBase64String] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageInfo, setImageInfo] = useState<{
    size: number;
    type: string;
    width: number;
    height: number;
  } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBase64String(result);
      setImagePreview(result);

      // Get image info
      const img = new Image();
      img.onload = () => {
        setImageInfo({
          size: file.size,
          type: file.type,
          width: img.width,
          height: img.height
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleBase64Input = (value: string) => {
    setBase64String(value);
    setError('');

    if (!value.trim()) {
      setImagePreview('');
      setImageInfo(null);
      return;
    }

    try {
      // Validate base64 format
      let base64Data = value.trim();
      
      // Check if it already has data URI prefix
      if (!base64Data.startsWith('data:')) {
        // Try to detect image type or use default
        base64Data = `data:image/png;base64,${base64Data}`;
      }

      // Try to load the image
      const img = new Image();
      img.onload = () => {
        setImagePreview(base64Data);
        
        // Estimate size from base64 string
        const base64Length = base64Data.split(',')[1]?.length || 0;
        const sizeInBytes = Math.floor((base64Length * 3) / 4);
        
        setImageInfo({
          size: sizeInBytes,
          type: base64Data.split(';')[0].split(':')[1] || 'image/png',
          width: img.width,
          height: img.height
        });
        setError('');
      };
      img.onerror = () => {
        setError('Invalid base64 image data');
        setImagePreview('');
        setImageInfo(null);
      };
      img.src = base64Data;
    } catch (err) {
      setError('Invalid base64 format');
      setImagePreview('');
      setImageInfo(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64String);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!imagePreview) return;

    const link = document.createElement('a');
    link.href = imagePreview;
    link.download = `image-${Date.now()}.${imageInfo?.type.split('/')[1] || 'png'}`;
    link.click();
  };

  const handleClear = () => {
    setBase64String('');
    setImagePreview('');
    setImageInfo(null);
    setError('');
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Base64 Image Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Convert images to Base64 and vice versa
        </p>

        {/* Mode Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setMode('encode');
              handleClear();
            }}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <ImageIcon className="inline-block w-5 h-5 mr-2" />
            Image to Base64
          </button>
          <button
            onClick={() => {
              setMode('decode');
              handleClear();
            }}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <ImageIcon className="inline-block w-5 h-5 mr-2" />
            Base64 to Image
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            {mode === 'encode' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PNG, JPG, GIF, SVG, WebP (MAX. 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base64 String
                </label>
                <textarea
                  value={base64String}
                  onChange={(e) => handleBase64Input(e.target.value)}
                  placeholder="Paste base64 string here (with or without data URI prefix)..."
                  className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            )}

            {/* Base64 Output for Encode Mode */}
            {mode === 'encode' && base64String && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Base64 String
                  </label>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <textarea
                  value={base64String}
                  readOnly
                  className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-xs resize-none"
                />
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Preview
              </label>
              {imagePreview && (
                <div className="flex gap-2">
                  {mode === 'decode' && (
                    <button
                      onClick={handleDownload}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Download image"
                    >
                      <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                  <button
                    onClick={handleClear}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Clear"
                  >
                    <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[16rem] flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-96 object-contain rounded"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No image to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Image Info */}
        {imageInfo && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {imageInfo.type.split('/')[1].toUpperCase()}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Size</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatBytes(imageInfo.size)}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Width</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {imageInfo.width}px
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {imageInfo.height}px
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Base64ImageConverter;
