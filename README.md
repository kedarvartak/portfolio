# Portfolio Website

A minimalist portfolio website built with Next.js 14, TypeScript, and Victor Mono font.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/layout.tsx` - Root layout with SEO metadata and font configuration
- `app/page.tsx` - Homepage with your bio and accomplishments
- `app/essays/page.tsx` - Essays page (placeholder)
- `app/styles.ts` - CSS-in-JS styles
- `app/globals.css` - Global CSS reset

## SEO Features

- OpenGraph tags for social media sharing
- Twitter Card metadata
- Semantic HTML structure
- Robots meta tags for search engine indexing
- Descriptive title and meta descriptions

## Font

Uses Victor Mono from Google Fonts, loaded via Next.js font optimization for better performance.
