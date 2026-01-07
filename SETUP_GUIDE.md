# 🚀 Complete Setup Guide - Developer Tools

## Quick Start (TL;DR)

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Detailed Setup Instructions

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- **npm** (comes with Node.js)
  - Check: `npm --version`

### Step-by-Step Installation

#### 1. Navigate to Project Directory

```bash
cd /path/to/daily-tools
```

#### 2. Install Dependencies

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Zustand (state management)
- Lucide React (icons)
- react-markdown (markdown rendering)
- crypto-js (cryptographic functions)

```bash
npm install
```

Expected output: Package installation should complete without errors.

#### 3. Start Development Server

```bash
npm run dev
```

You should see output similar to:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 4. Open in Browser

Open your browser and navigate to: `http://localhost:5173`

You should see the Developer Tools homepage with all available tools.

---

## Available NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Testing the Application

### 1. Test Theme Switching
- Click the moon/sun icon in the header
- Theme should persist after page reload

### 2. Test Search Functionality
- Type in the search bar (e.g., "json", "hash")
- Tool cards should filter in real-time

### 3. Test Individual Tools

#### JSON Formatter
- Paste JSON: `{"name":"John","age":30}`
- Click "Format JSON"
- Should display formatted output

#### Base64 Converter
- Enter text: "Hello World"
- Click "Encode to Base64"
- Should show: `SGVsbG8gV29ybGQ=`

#### Hash Generator
- Enter text: "password123"
- Should automatically generate MD5, SHA-1, SHA-256, etc.

#### Color Converter
- Change any color value
- All formats (HEX, RGB, HSL) should update automatically

#### Markdown Preview
- Type markdown in left panel
- Should see live preview on right

---

## Project Structure Explained

```
daily-tools/
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx       # App shell with header/footer
│   │   ├── ToolCard.tsx     # Individual tool card
│   │   └── SearchBar.tsx    # Search input with filtering
│   │
│   ├── pages/               # Route components (one per tool)
│   │   ├── Home.tsx         # Landing page
│   │   ├── JsonFormatter.tsx
│   │   ├── Base64Converter.tsx
│   │   └── ... (other tools)
│   │
│   ├── config/
│   │   └── tools.ts         # Tool metadata & configuration
│   │
│   ├── store/
│   │   └── useAppStore.ts   # Global state (theme, search)
│   │
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   │
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + Tailwind
│
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Documentation
```

---

## Technology Stack Details

### Core Technologies
- **React 18** - UI library with hooks
- **TypeScript 5** - Type-safe JavaScript
- **Vite 5** - Fast build tool and dev server

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **@tailwindcss/typography** - Prose styling for markdown

### Routing & State
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management with persistence

### UI & Utilities
- **Lucide React** - Icon library
- **react-markdown** - Markdown renderer
- **remark-gfm** - GitHub Flavored Markdown support
- **crypto-js** - Cryptographic functions

---

## Common Issues & Solutions

### Issue: "Cannot find module 'react-router-dom'"
**Solution:**
```bash
npm install react-router-dom
```

### Issue: Port 5173 already in use
**Solution:**
```bash
# Kill the process using the port, or
# Vite will automatically use next available port
```

### Issue: Dark mode not persisting
**Solution:** 
- Check browser's local storage
- Clear browser cache and reload

### Issue: Tailwind classes not working
**Solution:**
```bash
# Restart dev server
npm run dev
```

### Issue: TypeScript errors
**Solution:**
```bash
# Install type definitions
npm install --save-dev @types/node
```

---

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy

The `dist/` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Example for Netlify:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

---

## Adding Custom Tools

### 1. Create Tool Component

Create `src/pages/YourTool.tsx`:

```typescript
export const YourTool = () => {
  return (
    <div>
      <h2>Your Tool</h2>
      {/* Your tool UI */}
    </div>
  );
};
```

### 2. Add Tool Configuration

Edit `src/config/tools.ts`:

```typescript
{
  id: 'your-tool',
  name: 'Your Tool',
  description: 'Description of your tool',
  icon: YourIcon, // from lucide-react
  path: '/tool/your-tool',
  category: 'Utilities',
  keywords: ['keyword1', 'keyword2'],
}
```

### 3. Add Route

Edit `src/App.tsx`:

```typescript
import { YourTool } from './pages/YourTool';

// Add route:
<Route path="/tool/your-tool" element={<YourTool />} />
```

---

## Performance Optimization Tips

1. **Code Splitting** - Already implemented via React Router
2. **Image Optimization** - Use WebP format for images
3. **Bundle Analysis** - Run `npm run build -- --stats` to analyze bundle size
4. **Lazy Loading** - Import heavy components lazily

---

## Security Best Practices

1. **Client-Side Only** - All tools run in browser, no data sent to servers
2. **No API Keys** - No external API dependencies
3. **HTTPS** - Use HTTPS in production
4. **Content Security Policy** - Add CSP headers in production

---

## Browser Compatibility

This application works on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Getting Help

If you encounter issues:

1. Check this guide
2. Review error messages in browser console
3. Check terminal output
4. Verify all dependencies are installed
5. Try clearing node_modules and reinstalling:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

MIT License - Free to use for personal and commercial projects.

---

**Happy Coding! 🎉**
