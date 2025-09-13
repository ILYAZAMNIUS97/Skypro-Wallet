/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

// Создаем контекст авторизации
const AuthContext = createContext(null);

/**
 * Провайдер контекста авторизации
 */
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Проверка текущего состояния авторизации
   */
  const checkAuth = () => {
    try {
      const isAuthenticated = authApi.isAuthenticated();
      const currentUser = authApi.getCurrentUser();

      setIsAuth(isAuthenticated);
      setUser(currentUser);
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
      setIsAuth(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Вход в систему
   * @param {Object} credentials - Данные для входа
   * @returns {Promise} Результат авторизации
   */
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(credentials);
      const currentUser = authApi.getCurrentUser();

      setIsAuth(true);
      setUser(currentUser);

      return response;
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setIsAuth(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Регистрация пользователя
   * @param {Object} userData - Данные для регистрации
   * @returns {Promise} Результат регистрации
   */
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(userData);
      const currentUser = authApi.getCurrentUser();

      setIsAuth(true);
      setUser(currentUser);

      return response;
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setIsAuth(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Выход из системы
   */
  const logout = () => {
    try {
      authApi.logout();
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  // Значения контекста
  const value = {
    isAuth,
    user,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Хук для использования контекста авторизации
 * @returns {Object} Контекст авторизации
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }

  return context;
};
