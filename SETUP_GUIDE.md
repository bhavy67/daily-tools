# Setup Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Requirements

- Node.js 18+
- npm or yarn

## Development

Dev server runs on `http://localhost:5173`

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Lint code

## Project Structure

```
src/
├── components/     # UI components
├── pages/         # Tool pages
├── config/        # Configurations
├── store/         # State management
└── App.tsx        # Main app
```

## Adding a Tool

1. Create `src/pages/YourTool.tsx`
2. Add to `src/config/tools.ts`
3. Add route in `src/App.tsx`

## Deployment

Build output is in `dist/` folder. Deploy to any static hosting (Vercel, Netlify, GitHub Pages).
