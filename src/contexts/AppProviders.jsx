import { AuthProvider } from "./AuthContext";
import { TasksProvider } from "./TasksContext";
import { ThemeProvider } from "./ThemeContext.jsx";

/**
 * Объединенный провайдер всех контекстов приложения
 */
const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TasksProvider>{children}</TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
