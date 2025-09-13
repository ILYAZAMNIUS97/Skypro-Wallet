import axios from "axios";
import { authNotifications, generalNotifications } from "./toastNotifications";

// Базовая конфигурация API
const API_BASE_URL = "https://wedev-api.sky.pro";
const API_TOKEN = "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

// Создание экземпляра axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  // Убираем Content-Type заголовок, так как API его не принимает
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken") || API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибок авторизации
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      authNotifications.sessionExpired();
    } else if (error.response?.status >= 500) {
      generalNotifications.serverError();
    } else if (!navigator.onLine) {
      generalNotifications.networkError();
    }
    return Promise.reject(error);
  }
);

// API методы для авторизации
export const authApi = {
  /**
   * Логин пользователя
   * @param {Object} credentials - Данные для входа (login, password)
   * @returns {Promise} Результат авторизации
   */
  login: async (credentials) => {
    try {
      // Используем fetch напрямую для корректной работы с API
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Парсим JSON ошибку если возможно
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || "Ошибка авторизации");
        } catch {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
      }

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        // Сохраняем данные пользователя если они есть
        if (data.user) {
          authApi.setCurrentUser(data.user);
        }
        authNotifications.loginSuccess();
        return data;
      } else {
        throw new Error("Токен не получен");
      }
    } catch (error) {
      authNotifications.loginError(error.message);
      throw error;
    }
  },

  /**
   * Регистрация пользователя
   * @param {Object} userData - Данные пользователя (name, login, password)
   * @returns {Promise} Результат регистрации
   */
  register: async (userData) => {
    try {
      // Используем fetch для регистрации
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();

        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || "Ошибка регистрации");
        } catch {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
      }

      const data = await response.json();
      // Сохраняем данные пользователя если они есть
      if (data.user) {
        authApi.setCurrentUser(data.user);
      }
      authNotifications.registerSuccess();
      return data;
    } catch (error) {
      authNotifications.registerError(error.message);
      throw error;
    }
  },

  /**
   * Получение информации о пользователе
   * @returns {Promise} Данные пользователя
   */
  getUser: async () => {
    try {
      const response = await api.get("/api/user");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          "Ошибка при получении данных пользователя"
      );
    }
  },

  /**
   * Обновление данных пользователя
   * @param {Object} userData - Новые данные пользователя
   * @returns {Promise} Обновленные данные
   */
  updateUser: async (userData) => {
    try {
      const response = await api.put("/api/user", userData);
      authNotifications.updateSuccess();
      return response.data;
    } catch (error) {
      authNotifications.updateError();
      throw new Error(
        error.response?.data?.error || "Ошибка при обновлении профиля"
      );
    }
  },

  /**
   * Изменение пароля
   * @param {Object} passwordData - Данные для смены пароля
   * @returns {Promise} Результат операции
   */
  changePassword: async (passwordData) => {
    try {
      const response = await api.put("/api/user/password", passwordData);
      authNotifications.passwordChanged();
      return response.data;
    } catch (error) {
      authNotifications.passwordError();
      throw new Error(error.response?.data?.error || "Ошибка при смене пароля");
    }
  },

  /**
   * Выход из системы
   */
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    authNotifications.logoutSuccess();
  },

  /**
   * Проверка авторизации
   * @returns {boolean} Статус авторизации
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  /**
   * Получение текущего пользователя из localStorage
   * @returns {Object|null} Данные пользователя или null
   */
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem("currentUser");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      return null;
    }
  },

  /**
   * Сохранение данных пользователя в localStorage
   * @param {Object} userData - Данные пользователя
   */
  setCurrentUser: (userData) => {
    try {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Ошибка при сохранении данных пользователя:", error);
    }
  },
};

// Экспорт основного экземпляра API
export default api;
