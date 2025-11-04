import { useTheme } from '@/contexts/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();

  const containerClass = theme === 'glassmorphism'
    ? 'glass-panel'
    : 'bg-card border-t border-border';

  const linkClass = theme === 'glassmorphism'
    ? 'text-white hover:text-white/80'
    : 'text-foreground hover:text-foreground/80';

  return (
    <footer className={`mt-auto w-full ${containerClass} px-4 md:px-8 py-6`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between">
        <div className="text-sm opacity-90">
          <span className="font-semibold">BasedCalc</span> · Built with love for animals
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <a
            href="https://x.com/TanayVasishtha"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            X (Twitter)
          </a>
          <span className="opacity-40">·</span>
          <a
            href="https://chromewebstore.google.com/detail/speedbang-multiplatform-v/kaacodjcoaepldmhnpgodhafbcmlkfgo?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SpeedBang
          </a>
          <span className="opacity-40">·</span>
          <a
            href="https://chromewebstore.google.com/detail/volume-bang-premium-audio/ancjplaiedoominjbebhdgjipcgfbopl"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Volume Bang
          </a>
          <span className="opacity-40">·</span>
          <a
            href="https://chromewebstore.google.com/detail/dark-mode-bang-universal/hnnplkbhhlfopkkhfepdiljdbclfbpjh"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Dark Mode Bang
          </a>
        </nav>
      </div>
    </footer>
  );
};


