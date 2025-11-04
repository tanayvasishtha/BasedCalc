import { useTheme } from '@/contexts/ThemeContext';
import { Target } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  goal: number;
}

export const ProgressBar = ({ current, goal }: ProgressBarProps) => {
  const { theme } = useTheme();
  const percentage = Math.min((current / goal) * 100, 100);
  const isLoading = current === 0 && goal > 0;
  const formattedCurrent = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0 
  }).format(current);
  const formattedGoal = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0 
  }).format(goal);

  return (
    <div className={`w-full p-4 rounded-lg ${theme === 'glassmorphism' ? 'glass-panel' : 'bg-card border border-border'} transition-all duration-300`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Fundraising Goal</span>
        </div>
        <span className="text-sm font-bold text-primary">
          {formattedCurrent} / {formattedGoal}
        </span>
      </div>
      
      <div className={`w-full h-3 rounded-full overflow-hidden ${theme === 'glassmorphism' ? 'bg-white/10' : 'bg-muted'}`}>
        <div
          className={`h-full bg-primary transition-all duration-500 ease-out relative ${isLoading ? 'opacity-50' : ''}`}
          style={{ width: isLoading ? '0%' : `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        {isLoading ? 'Loading...' : `${percentage.toFixed(1)}% towards saving animals 🐾`}
      </div>
    </div>
  );
};

