import { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import { ThemeContext } from "./themeContext";

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem("isDarkTheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Сохраняем тему в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  const contextValue = {
    isDarkTheme,
    toggleTheme,
    theme: currentTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
