import { Star, TrendingUp, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const TopNav = () => {
  const { theme } = useTheme();
  
  return (
    <nav className={`flex items-center gap-2 p-4 border-b border-border bg-card ${theme === 'glassmorphism' ? 'glass' : ''}`}>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-primary">BasedCalc</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 button-press"
          asChild
        >
          <a
            href="https://github.com/tanayvasishtha/BasedCalc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">Star</span>
          </a>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="gap-2 button-press"
          asChild
        >
          <a
            href="https://peerlist.io/tanayvasishtha/project/basedcalc--based-for-animal-welfare"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Upvote</span>
          </a>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          className="gap-2 button-press"
          asChild
        >
          <a
            href="https://buymeacoffee.com/tanayvasishtha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Coffee className="w-4 h-4" />
            <span className="hidden sm:inline">Support</span>
          </a>
        </Button>
      </div>
    </nav>
  );
};
