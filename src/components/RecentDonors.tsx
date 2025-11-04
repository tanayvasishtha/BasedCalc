import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Coffee } from 'lucide-react';

interface Donor {
  name: string;
  amount: number;
  timeAgo: string;
}

interface RecentDonorsProps {
  donors: Donor[];
  asAside?: boolean;
  className?: string;
}

export const RecentDonors = ({ donors, asAside = true, className = '' }: RecentDonorsProps) => {
  const { theme } = useTheme();

  const Container: any = asAside ? 'aside' : 'div';
  const baseClass = `${asAside ? 'w-64 border-l' : ''} border-border p-6 space-y-4 overflow-y-auto ${theme === 'glassmorphism' ? 'glass-panel' : 'bg-card'} transition-all duration-300 ${className}`;

  return (
    <Container className={baseClass}>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-destructive fill-current" />
          Recent Donors
        </h2>
        <p className="text-xs text-muted-foreground">
          Thank you for your support! 🐾
        </p>
      </div>

      <div className="space-y-3">
        {donors.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Coffee className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Be the first to donate!</p>
          </div>
        ) : (
          donors.map((donor, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${theme === 'glassmorphism' ? 'border-white/20 bg-white/5' : 'bg-muted/50 border-border'} transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground text-sm">
                  {donor.name || 'Anonymous'}
                </span>
                <span className="text-primary font-bold text-sm">
                  ${donor.amount.toFixed(2)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {donor.timeAgo}
              </span>
            </div>
          ))
        )}
      </div>

      <div className={`mt-4 p-3 rounded-lg ${theme === 'glassmorphism' ? 'bg-white/10 border border-white/20' : 'bg-primary/10 border border-primary/20'}`}>
        <p className="text-xs text-center text-muted-foreground">
          💝 Every donation helps save animals in need
        </p>
      </div>

    </Container>
  );
};

