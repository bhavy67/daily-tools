# Developer Tools 🛠️

A comprehensive, production-ready collection of essential developer utilities built with React, TypeScript, and Tailwind CSS. All tools run locally in your browser for maximum privacy and speed.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## 🚀 Features

- **12+ Developer Tools** - JSON formatter, Base64 converter, hash generator, color converter, and more
- **Dark/Light Theme** - Beautiful UI with theme persistence
- **100% Client-Side** - All processing happens in your browser, no data sent to servers
- **Fast Search** - Quickly find the tool you need
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Production Ready** - Built with best practices and modern technologies

## 📦 Available Tools

### Formatters & Validators
- **JSON Formatter** - Format, validate, beautify, and minify JSON
- **Markdown Preview** - Live markdown editor with GitHub Flavored Markdown support

### Encoders & Decoders
- **URL Encoder/Decoder** - Encode and decode URL/URI components
- **Base64 Converter** - Encode and decode Base64 strings

### Cryptography
- **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512, SHA-3 hashes
- **JWT Decoder** - Decode and inspect JSON Web Tokens

### Utilities
- **Color Converter** - Convert between HEX, RGB, and HSL formats
- **Timestamp Converter** - Convert between timestamps and dates
- **Regex Tester** - Test and debug regular expressions
- **Number Base Converter** - Convert between binary, decimal, hex, and octal

### Generators
- **UUID Generator** - Generate UUIDs (v1, v4)
- **QR Code Generator** - Generate QR codes from text

## 🏗️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with custom theme
- **Routing**: React Router DOM
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Markdown**: react-markdown with remark-gfm
- **Cryptography**: crypto-js

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ and npm

### Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd daily-tools
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
daily-tools/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx       # Main layout with header/footer
│   │   ├── ToolCard.tsx     # Tool card component
│   │   └── SearchBar.tsx    # Search functionality
│   ├── pages/               # Tool pages
│   │   ├── Home.tsx         # Landing page with tool grid
│   │   ├── JsonFormatter.tsx
│   │   ├── UrlEncoderDecoder.tsx
│   │   ├── Base64Converter.tsx
│   │   ├── HashGenerator.tsx
│   │   ├── ColorConverter.tsx
│   │   └── MarkdownPreview.tsx
│   ├── config/
│   │   └── tools.ts         # Tool configurations
│   ├── store/
│   │   └── useAppStore.ts   # Zustand store (theme, search)
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles & Tailwind
├── public/                  # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Customization

### Adding a New Tool

1. Create a new component in `src/pages/YourTool.tsx`
2. Add the tool configuration to `src/config/tools.ts`
3. Add the route in `src/App.tsx`

Example:
```typescript
// In tools.ts
{
  id: 'your-tool',
  name: 'Your Tool',
  description: 'Tool description',
  icon: IconComponent,
  path: '/tool/your-tool',
  category: 'Utilities',
  keywords: ['keyword1', 'keyword2'],
}

// In App.tsx
<Route path="/tool/your-tool" element={<YourTool />} />
```

### Changing Theme Colors

Edit `tailwind.config.js` to customize the primary color palette.

## 🔒 Privacy & Security

- **All processing is client-side** - No data is sent to external servers
- **No tracking or analytics** - Your privacy is respected
- **Open source** - Inspect the code yourself

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new tools
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

- Inspired by EasyDevTools and similar developer toolkits
- Built with modern web technologies
- Icons by Lucide
- UI components styled with Tailwind CSS

---

**Built with ❤️ for developers by developers**


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
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

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
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
