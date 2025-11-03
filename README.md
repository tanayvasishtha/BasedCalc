# BasedCalc

A modern, themeable calculator built with React, TypeScript, Tailwind CSS, and shadcn-ui. BasedCalc is playful at heart and designed to be beautiful, accessible, and responsive. It features multiple premium themes including Glassmorphism, iOS, and macOS, and includes a donation flow for animal welfare.

## Features

- Premium theming with smooth transitions (300ms)
  - Glassmorphism (frosted glass, monochrome, subtle blur)
  - iOS (authentic Apple palette and spacing)
  - macOS (refined dark design with subtle depth)
- Basic and scientific modes (trig, logs, powers, memory functions)
- Keyboard support (numbers, operations, Enter, Escape, Backspace)
- Responsive layout for mobile, tablet, and desktop
- Clean, accessible UI with system fonts
- Donation modal with theme-aware styling

## Themes

- Glassmorphism
  - Deep black background (#0F0F0F), frosted panels (blur 10–12px), subtle borders, soft shadows
  - Number buttons: translucent glass; Operators: soft blue tint
- iOS (dark)
  - Black background (#000000), digit buttons #505050, operators/equal #FF9500, right-aligned display
  - Rounded corners ~8–12px, minimal shadows, system font (SF Pro)
- macOS (dark)
  - Charcoal background (#1D1D1D), digit buttons #3A3A3A, operators #FF9500
  - Subtle depth (light shadows), generous spacing, refined appearance

Theme switching is instant and animated; all components inherit colors via CSS variables.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui
- Radix UI primitives

## Getting Started

Prerequisites: Node.js (LTS) and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/        # UI components (Calculator, ThemeSidebar, TopNav, modals, etc.)
  contexts/          # Theme context and provider
  hooks/             # Reusable hooks
  pages/             # App pages (Index, NotFound)
  lib/               # Utilities
  index.css          # Design system (CSS variables per theme) and global styles
  main.tsx           # App bootstrap
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build production assets
- `npm run preview` – Preview the production build
- `npm run lint` – Run ESLint

## Shortcuts

- Numbers `0–9`, decimal `.`
- Operations `+ - * /`
- Evaluate `Enter` or `=`
- Clear `Esc` or `c/C`, Delete `Backspace`

## Configuration & Theming

All theme tokens live in `src/index.css` under CSS variables. Key variables include:

- `--background`, `--foreground`, `--card`, `--border`
- `--calc-display`, `--calc-button`, `--calc-operator`
- `--radius` (controls component rounding per theme)

To add or refine a theme, update the `[data-theme="<name>"]` block and ensure colors meet contrast guidelines.

## Accessibility

- High-contrast text and large display typography
- Keyboard operability and visual feedback on interactions
- Minimal motion by default; smooth but restrained transitions

## Contributing

1. Fork and create a feature branch
2. Make your changes with clear commits
3. Ensure `npm run build` and `npm run lint` pass
4. Open a pull request with a concise description and screenshots if UI changes

## License
 
## Typography: Apple San Francisco (SF)

Apple currently uses San Francisco (SF) as its primary font across all its platforms, including macOS, iOS, watchOS, and tvOS. Introduced in 2015, San Francisco was designed in‑house by Apple and has since become an integral part of its ecosystem. San Francisco is a modern sans‑serif typeface that emphasizes readability and clarity, particularly on digital screens. It’s used in Apple’s interfaces, marketing materials, and product packaging, making it a cornerstone of Apple’s visual identity.

Why Apple uses San Francisco:

- Designed for screens: optical sizes (SF Pro Text/Display) optimize legibility at different sizes.
- Consistency across platforms: a unified look and feel on macOS and iOS.
- Readability and spacing: tuned metrics for clear hierarchy, numerals, and operators.
- Performance and accessibility: system-provided, fast rendering, excellent contrast.
- International support: broad language coverage and typographic features.

In BasedCalc, the iOS and macOS themes use the system font stack that resolves to SF on Apple devices, providing a realistic native look. On non‑Apple platforms, the stack falls back to high‑quality system sans‑serif fonts.

## Theming Guide

Themes are applied via a `data-theme` attribute on the document root and implemented through CSS variables in `src/index.css`.

1. Add a new block under `@layer base`:

```css
[data-theme="my-theme"] {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --card: 0 0% 100%;
  --border: 0 0% 88%;
  --calc-display: 0 0% 98%;
  --calc-button: 0 0% 96%;
  --calc-operator: 33 100% 50%;
  --radius: 0.75rem;
}
```

2. Ensure the theme ID exists in `src/contexts/ThemeContext.tsx` (type `Theme`).

3. Use `useTheme()` to switch: `setTheme('my-theme')`.

## Design System

- Typography: system stack resolves to SF on Apple devices for iOS/macOS realism.
- Color tokens: all hues are defined in HSL variables and consumed by Tailwind via utility classes.
- Radius: controlled with `--radius` per theme and used across components.
- Effects: Glassmorphism uses `backdrop-filter: blur(...)` with semi‑transparent surfaces and subtle borders.

## Deployment

- Vercel: push to a Git repository and import the project; framework preset: Vite.
- Netlify: `npm run build` as build command; publish directory: `dist/`.
- GitHub Pages: `npm run build` and serve `dist/` with an actions workflow or a static hosting provider.

## Browser Support

- Evergreen browsers (Chrome, Edge, Firefox, Safari).
- Glassmorphism requires `backdrop-filter` support; experience degrades gracefully where unsupported.

## Security & Privacy

- No analytics or tracking by default.
- Validate and sanitize any future inputs if network features are added.

## Roadmap

- Theme-specific spacing refinements (iOS tighter, macOS roomier).
- Optional iOS light mode variant.
- Export/share calculation history.
- Unit tests for core operations and edge cases.

## Acknowledgements

- Built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui.

MIT
