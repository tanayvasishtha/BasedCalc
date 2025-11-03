import { Palette, Sparkles, Terminal, Apple, Smartphone, Zap } from 'lucide-react';
import { useTheme, Theme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const themes: { id: Theme; name: string; icon: React.ReactNode; description: string }[] = [
  { 
    id: 'cute-animals', 
    name: 'Cute Animals', 
    icon: <Sparkles className="w-5 h-5" />,
    description: '🐾 Warm & playful'
  },
  { 
    id: 'glassmorphism', 
    name: 'Glass', 
    icon: <Palette className="w-5 h-5" />,
    description: 'Modern & premium'
  },
  { 
    id: 'terminal', 
    name: 'Terminal', 
    icon: <Terminal className="w-5 h-5" />,
    description: 'Hacker aesthetic'
  },
  { 
    id: 'macos', 
    name: 'macOS', 
    icon: <Apple className="w-5 h-5" />,
    description: 'Clean & minimal'
  },
  { 
    id: 'ios', 
    name: 'iOS', 
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Mobile first'
  },
  { 
    id: 'retro', 
    name: 'Retro', 
    icon: <Zap className="w-5 h-5" />,
    description: '80s vibes'
  },
];

export const ThemeSidebar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <aside className={`w-64 border-r border-border bg-card p-6 space-y-4 overflow-y-auto ${theme === 'glassmorphism' ? 'glass' : ''}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Themes</h2>
        <p className="text-sm text-muted-foreground">Choose your style</p>
      </div>
      
      <div className="space-y-2">
        {themes.map((t) => (
          <Button
            key={t.id}
            variant={theme === t.id ? 'default' : 'outline'}
            className="w-full justify-start text-left h-auto py-4 button-press"
            onClick={() => setTheme(t.id)}
          >
            <div className="flex items-center gap-3 w-full">
              <div className={theme === t.id ? 'text-primary-foreground' : 'text-foreground'}>
                {t.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{t.name}</div>
                <div className={`text-xs ${theme === t.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {t.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className="pt-4 space-y-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          💝 All donations support animal welfare.
        </p>
      </div>
    </aside>
  );
};
