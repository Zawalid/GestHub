import { createContext, useEffect, useState } from 'react';

const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const getTheme = () => {
  const theme = window.localStorage.getItem('theme');
  return theme ? theme : getSystemTheme();
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getTheme);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);

    const theme = newTheme === 'system' ? getSystemTheme() : newTheme;

    document.documentElement.className = `${theme} theme-transition`;
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 400);
  };

  useEffect(() => {
    changeTheme(getTheme());
  }, []);

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
