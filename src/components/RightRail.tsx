import { RecentDonors } from './RecentDonors';
import { AdvertisePanel } from './AdvertisePanel';
import { useTheme } from '@/contexts/ThemeContext';

interface Donor {
  name: string;
  amount: number;
  timeAgo: string;
}

export const RightRail = ({ donors }: { donors: Donor[] }) => {
  const { theme } = useTheme();
  const railBg = theme === 'glassmorphism' ? '' : 'bg-background';

  return (
    <aside className={`w-64 border-l border-border ${railBg} flex flex-col`}> 
      <div className="flex-1 overflow-auto">
        <RecentDonors donors={donors} asAside={false} className="h-full" />
      </div>
      <div className="flex-1 overflow-auto border-t border-border">
        <AdvertisePanel />
      </div>
    </aside>
  );
};


