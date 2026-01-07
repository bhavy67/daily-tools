# Developer Tools 🛠️

A comprehensive collection of 30+ essential developer utilities built with React, TypeScript, and Tailwind CSS. All tools run locally in your browser for maximum privacy and speed.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Key Features

- **30+ Developer Tools** - JSON tools, encoders, generators, text utilities, and more
- **Dark/Light Theme** - Modern UI with theme persistence
- **100% Client-Side** - All processing in your browser, zero server requests
- **Fast & Responsive** - Optimized for desktop and mobile
- **Privacy First** - No tracking, no data collection

## �️ Tools Available

### Formatters & Validators
JSON Formatter, JSON Minifier, JSON Validator, Markdown Preview

### Encoders & Decoders
URL Encoder/Decoder, Base64 Converter, HTML Encoder/Decoder, Base64 Image Converter

### Security & Cryptography
Hash Generator (MD5, SHA-1, SHA-256, SHA-512, SHA-3), JWT Decoder, Password Generator, API Key Generator

### Generators
UUID Generator, Lorem Ipsum, URL Slug Generator, QR Code Generator

### Text Tools
Case Converter, Word Counter, Line Sorter, Duplicate Lines Handler, Emoji ⇄ Unicode, Find & Replace, Text Diff Checker

### Utilities
Color Converter (HEX/RGB/HSL), Regex Tester, Number Base Converter, Timestamp Converter

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Tech Stack

- **React 18** + TypeScript
- **Vite 5** - Lightning fast build tool
- **Tailwind CSS 3** - Utility-first styling
- **Zustand** - State management
- **React Router** - Client-side routing

## 📝 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## 🎨 Adding a New Tool

1. Create component in `src/pages/YourTool.tsx`
2. Add to `src/config/tools.ts`
3. Add route in `src/App.tsx`

## 🔒 Privacy

All processing happens in your browser. No data is sent to servers. No tracking. No analytics.

## 📄 License

MIT License

---

**Built with ❤️ for developers**
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# daily-tools
