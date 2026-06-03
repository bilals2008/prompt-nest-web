import { createContext, useContext, useEffect, useState } from "react";
import { THEMES } from "@/data/themes";

const ThemeContext = createContext(null);

function applyTheme(tokens) {
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState("cyberpunk");

  useEffect(() => {
    const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
    applyTheme(theme.tokens);
  }, [themeId]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
