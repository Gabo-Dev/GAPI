import { useState, useEffect, useCallback } from "react";

const THEME_KEY = "gapi-theme";
const DEFAULT_THEME = "dark"; 

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }

    return DEFAULT_THEME;
  });

  useEffect(() => {
    const htmlElement = document.documentElement; 
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };
}