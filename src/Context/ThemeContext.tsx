import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React,{ createContext,useContext,useEffect,useMemo,useState } from "react";
import type { ProviderProps } from "../Types/types";
import { Theme,ThemeContextType } from "../Types/types";

const { paperTrailLightColors, paperTrailDarkColors } = require("../../tailwind.config");
const STORAGE_THEME_KEY = "@papertrial_app_theme";
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC<ProviderProps> = ({
  children
}) => {
    const { setColorScheme } = useColorScheme();
    const [theme, setThemeState] = useState<Theme>("light");
    const [ready, setReady] = useState(false);

    useEffect(() => {
      let active = true;
      async function loadTheme() {
        let initialTheme: Theme = "light";
        try {
          const stored = await AsyncStorage.getItem(STORAGE_THEME_KEY);
          if (stored === "dark") initialTheme = "dark";
        } catch (error) {
          console.error("Erro ao carregar tema armazenado:", error);
        }
        if (active) {
          setThemeState(initialTheme);
          setColorScheme(initialTheme);
          setReady(true);
        }
      }
      void loadTheme();
      return () => { active = false; };
    }, [setColorScheme]);

    const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      setColorScheme(newTheme);
      AsyncStorage.setItem(STORAGE_THEME_KEY, newTheme).catch(err => {
        console.error("Erro ao salvar tema:", err);
      });
    };
    const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };
    const isDark = theme === "dark";
    const colors = useMemo(() => isDark ? paperTrailDarkColors : paperTrailLightColors, [isDark]);
    if (!ready) return null;

    return (
      <ThemeContext.Provider value={{
        theme,
        isDark,
        colors,
        setTheme,
        toggleTheme
      }}>
        {children}
      </ThemeContext.Provider>
    );
  };
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
