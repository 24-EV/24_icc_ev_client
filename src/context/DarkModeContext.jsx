import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggleDark = useCallback(() => setDark((d) => !d), []);

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>{children}</DarkModeContext.Provider>
  );
}

export function useDarkModeContext() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error('useDarkModeContext must be used within a DarkModeProvider');
  return ctx;
}
