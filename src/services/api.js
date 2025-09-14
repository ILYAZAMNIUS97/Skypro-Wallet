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

      // API возвращает токен в user.token, а не access_token
      if (data.user && data.user.token) {
        localStorage.setItem("authToken", data.user.token);
        // Сохраняем данные пользователя
        authApi.setCurrentUser(data.user);
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
   * @param {Object} userData - Данные пользователя (name, email, password)
   * @returns {Promise} Результат регистрации
   */
  register: async (userData) => {
    try {
      // Преобразуем email в login для API
      const apiData = {
        name: userData.name,
        login: userData.email, // API ожидает login, а не email
        password: userData.password,
      };

      // Используем fetch для регистрации
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(apiData),
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

      // API возвращает токен в user.token при регистрации
      if (data.user && data.user.token) {
        localStorage.setItem("authToken", data.user.token);
        // Сохраняем данные пользователя
        authApi.setCurrentUser(data.user);
        authNotifications.registerSuccess();
        return data;
      } else {
        // Если токена нет, все равно считаем регистрацию успешной
        // Сохраняем данные пользователя если они есть
        if (data.user) {
          authApi.setCurrentUser(data.user);
        }
        authNotifications.registerSuccess();
        return data;
      }
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

// API методы для работы с транзакциями
export const transactionsApi = {
  /**
   * Получение всех транзакций пользователя
   * @returns {Promise} Список транзакций
   */
  getTransactions: async () => {
    try {
      const response = await api.get("/api/transactions");
      const transactions = response.data.transactions || response.data;
      console.log("Получены транзакции:", transactions);
      if (transactions && transactions.length > 0) {
        console.log("Пример структуры транзакции:", transactions[0]);
      }
      return transactions;
    } catch (error) {
      console.error("Ошибка при получении транзакций:", error);
      throw new Error(
        error.response?.data?.error || "Ошибка при загрузке транзакций"
      );
    }
  },

  /**
   * Получение транзакции по ID
   * @param {string|number} id - ID транзакции
   * @returns {Promise} Данные транзакции
   */
  getTransaction: async (id) => {
    try {
      const response = await api.get(`/api/transactions/${id}`);
      return response.data.transaction || response.data;
    } catch (error) {
      console.error("Ошибка при получении транзакции:", error);
      throw new Error(
        error.response?.data?.error || "Ошибка при загрузке транзакции"
      );
    }
  },

  /**
   * Создание новой транзакции
   * @param {Object} transactionData - Данные транзакции
   * @returns {Promise} Созданная транзакция
   */
  createTransaction: async (transactionData) => {
    try {
      console.log("Отправляем данные на сервер:", transactionData);
      console.log("JSON данные:", JSON.stringify(transactionData));

      // Используем fetch с правильными заголовками как в методах авторизации
      const token = localStorage.getItem("authToken") || API_TOKEN;

      console.log("Используемый токен:", token);
      console.log("URL запроса:", `${API_BASE_URL}/api/transactions`);

      const response = await fetch(`${API_BASE_URL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Ошибка от сервера:", {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
        });

        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || "Ошибка при создании транзакции");
        } catch {
          throw new Error(
            `Ошибка HTTP: ${response.status} - ${
              errorText || response.statusText
            }`
          );
        }
      }

      const data = await response.json();
      console.log("Успешный ответ от сервера:", data);
      return data.transaction || data;
    } catch (error) {
      console.error("Ошибка при создании транзакции:", error);
      throw new Error(error.message || "Ошибка при создании транзакции");
    }
  },

  /**
   * Обновление транзакции
   * @param {string|number} id - ID транзакции
   * @param {Object} transactionData - Новые данные транзакции
   * @returns {Promise} Обновленная транзакция
   */
  updateTransaction: async (id, transactionData) => {
    try {
      // Используем fetch с правильными заголовками
      const token = localStorage.getItem("authToken") || API_TOKEN;
      const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorText = await response.text();

        try {
          const errorData = JSON.parse(errorText);
          throw new Error(
            errorData.error || "Ошибка при обновлении транзакции"
          );
        } catch {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
      }

      const data = await response.json();
      return data.transaction || data;
    } catch (error) {
      console.error("Ошибка при обновлении транзакции:", error);
      throw new Error(error.message || "Ошибка при обновлении транзакции");
    }
  },

  /**
   * Удаление транзакции
   * @param {string|number} id - ID транзакции
   * @returns {Promise} Результат удаления
   */
  deleteTransaction: async (id) => {
    try {
      // Используем fetch с правильными заголовками
      const token = localStorage.getItem("authToken") || API_TOKEN;
      const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || "Ошибка при удалении транзакции");
        } catch {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка при удалении транзакции:", error);
      throw new Error(error.message || "Ошибка при удалении транзакции");
    }
  },
};

// Экспорт основного экземпляра API
export default api;
