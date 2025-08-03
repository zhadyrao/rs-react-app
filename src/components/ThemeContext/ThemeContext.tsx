import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from '../utils/ThemeContext.ts';
import { ThemeContext } from '../utils/ThemeContext.ts';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
