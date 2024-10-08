import { updateUISettings } from '@/utils/helpers';
import { createContext, useEffect, useState } from 'react';

const getTheme = () => {
  const theme = window.localStorage.getItem('theme');
  return ['undefined', 'null'].includes(theme) || !theme ? 'dark' : theme;
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getTheme);
  const settings = JSON.parse(localStorage.getItem('local_settings'));

  const changeTheme = (newTheme, firstTime) => {
    if (theme === newTheme && !firstTime) return;

    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
    document.documentElement.className = `${newTheme} theme-transition`;
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 400);
  };

  useEffect(() => {
    updateUISettings(settings || { theme: 'orange', animation: true });
    changeTheme(getTheme(), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
