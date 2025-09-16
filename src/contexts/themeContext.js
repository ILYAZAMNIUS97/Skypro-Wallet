import { createContext, useContext } from "react";

// Создаем контекст темы
export const ThemeContext = createContext();

// Хук для использования темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme должен использоваться внутри ThemeProvider");
  }
  return context;
};
