import { useTheme } from '@/contexts/ThemeContext';

export const AdvertisePanel = () => {
  const { theme } = useTheme();
  const cardClass = theme === 'glassmorphism' ? 'glass-panel' : 'bg-card border border-border';
  const linkClass = theme === 'glassmorphism' ? 'text-white hover:text-white/80' : 'text-primary hover:text-primary/80';

  return (
    <div className={`${cardClass} p-6 h-full flex flex-col items-center justify-center text-center space-y-4`}>
      <div className="text-2xl font-bold">Advertise with Us</div>
      <p className="text-sm opacity-80 max-w-xs">
        Promote your product to a focused audience of developers and tech-savvy users.
      </p>
      <a
        href="https://x.com/TanayVasishtha"
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkClass} text-sm underline`}
      >
        Contact on X (Twitter)
      </a>
    </div>
  );
};


