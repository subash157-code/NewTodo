import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const v = localStorage.getItem("todo_theme");
      return v ? JSON.parse(v) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("todo_theme", JSON.stringify(darkMode));
    } catch {}
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = useCallback(() => setDarkMode((s) => !s), []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
