import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext.jsx";

/**
 * Объединенный провайдер всех контекстов приложения
 */
const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
