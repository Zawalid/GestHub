import { createContext, useEffect, useState } from 'react';

const getTheme = () => {
  const theme = window.localStorage.getItem('theme');
  return ['undefined', 'null'].includes(theme) || !theme ? 'dark' : theme;
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getTheme);

  const changeTheme = (newTheme,firstTime) => {
    if(theme === newTheme && !firstTime) return 
    
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
    document.documentElement.className = `${newTheme} theme-transition`;
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 400);
  };

  useEffect(() => {
    changeTheme(getTheme(),true);
  }, []);

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
