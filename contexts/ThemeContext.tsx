import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: typeof lightColors | typeof darkColors;
}

const lightColors = {
  primary: "#1877f2",
  background: "#f0f2f5",
  surface: "#ffffff",
  text: "#050505",
  textSecondary: "#65676b",
  border: "#e0e0e0",
  overlay: "rgba(0, 0, 0, 0.5)",
  error: "#ff3b30",
  success: "#45bd62",
  warning: "#f7b928",
};

const darkColors = {
  primary: "#1877f2",
  background: "#000000",
  surface: "#1c1c1e",
  text: "#ffffff",
  textSecondary: "#8e8e93",
  border: "#38383a",
  overlay: "rgba(0, 0, 0, 0.7)",
  error: "#ff453a",
  success: "#32d74b",
  warning: "#ffd60a",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark");
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
