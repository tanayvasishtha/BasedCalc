import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ThemeSidebar } from '@/components/ThemeSidebar';
import { TopNav } from '@/components/TopNav';
import { Calculator } from '@/components/Calculator';
import { CursorFollower } from '@/components/CursorFollower';

const MainContent = () => {
  const { theme } = useTheme();
  
  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Cursor follower - only for cute animals theme */}
      {theme === 'cute-animals' && <CursorFollower />}
      
      {/* Background decorations - only for cute animals theme */}
      {theme === 'cute-animals' && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-8xl animate-pulse">💝</div>
          <div className="absolute bottom-10 right-10 text-8xl animate-pulse delay-1000">🐾</div>
        </div>
      )}
            
            <div className="relative z-10 w-full max-w-2xl space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-primary">
                  BasedCalc
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                  Calculate. Donate. Save Animals. 
                  <span className="block mt-2 text-sm">
                    Every calculation can make a difference! 🐶🐱
                  </span>
                </p>
              </div>
              
              <Calculator />
              
              <div className="text-center space-y-2 text-sm text-muted-foreground">
                <p>
                  💡 <strong>Tip:</strong> Try different themes from the sidebar!
                </p>
                <p>
                  ⌨️ Use your keyboard for faster calculations
                </p>
              </div>
      </div>
    </main>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col w-full">
        <TopNav />
        
        <div className="flex flex-1 w-full">
          <ThemeSidebar />
          <MainContent />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
