import { useState, ReactNode, useCallback, useMemo, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeMode, ThemeContext } from "../hooks/useTheme";
import { LIGHT_THEME, DARK_THEME } from "../constants";

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const debounceRef = useRef<number | null>(null);
  const isTogglingRef = useRef(false);

  const toggleTheme = useCallback((): void => {
    // Prevent rapid toggling
    if (isTogglingRef.current) {
      return;
    }

    isTogglingRef.current = true;

    // Clear any existing debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Immediate state update for responsive UI
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

    // Reset the toggle lock after a short delay
    debounceRef.current = setTimeout(() => {
      isTogglingRef.current = false;
    }, 150);
  }, []);

  // Memoize theme object to prevent unnecessary re-renders
  const themeObject = useMemo(() => {
    return theme === "light" ? LIGHT_THEME : DARK_THEME;
  }, [theme]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
