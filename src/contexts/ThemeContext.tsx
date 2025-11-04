import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'cute-animals' | 'glassmorphism' | 'terminal' | 'macos' | 'ios' | 'retro';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('basedcalc-theme');
    return (saved as Theme) || 'cute-animals';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('basedcalc-theme', theme);

    // Toggle glassmorphism body background when active
    const body = document.body;
    if (theme === 'glassmorphism') {
      body.classList.add('glassmorphism-theme-active');
    } else {
      body.classList.remove('glassmorphism-theme-active');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
