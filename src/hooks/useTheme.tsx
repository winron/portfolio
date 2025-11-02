import { createContext, useContext } from "react";

export interface Theme {
  background: string;
  color: string;
  component: {
    background: string;
    border: string;
    boxShadow: string;
  };
  primary: string;
  secondary: string;
  name: string;
}

export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProviderWrapper");
  }
  return context;
};
