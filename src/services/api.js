import axios from "axios";
import { authNotifications, generalNotifications } from "./toastNotifications";

// Базовая конфигурация API
const API_BASE_URL = "https://wedev-api.sky.pro";
const API_TOKEN =
  "d874c4asboc054cod06g5g5k5o5s5w606g3983bo3d43cw3k3983bo3d43cw3co3bc";

// Создание экземпляра axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "text/plain", // API требует text/plain
  },
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

// Централизованная обработка ошибок
const handleApiError = (error, defaultMessage) => {
  console.error(`API Error: ${defaultMessage}`, error);

  if (error.response) {
    // Ошибка с ответом от сервера
    const errorMessage =
      error.response.data?.error ||
      error.response.data?.message ||
      defaultMessage;
    return new Error(errorMessage);
  } else if (error.request) {
    // Ошибка сети
    return new Error("Проблемы с сетью. Проверьте подключение к интернету");
  } else {
    // Другие ошибки
    return new Error(error.message || defaultMessage);
  }
};

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
      const response = await api.post(
        "/api/user/login",
        JSON.stringify(credentials)
      );
      const data = response.data;

      // API возвращает токен в user.token
      if (data.user && data.user.token) {
        localStorage.setItem("authToken", data.user.token);
        authApi.setCurrentUser(data.user);
        authNotifications.loginSuccess();
        return data;
      } else {
        throw new Error("Токен не получен");
      }
    } catch (error) {
      const apiError = handleApiError(error, "Ошибка авторизации");
      authNotifications.loginError(apiError.message);
      throw apiError;
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

      const response = await api.post("/api/user", JSON.stringify(apiData));
      const data = response.data;

      // API возвращает токен в user.token при регистрации
      if (data.user && data.user.token) {
        localStorage.setItem("authToken", data.user.token);
        authApi.setCurrentUser(data.user);
        authNotifications.registerSuccess();
        return data;
      } else {
        // Если токена нет, все равно считаем регистрацию успешной
        if (data.user) {
          authApi.setCurrentUser(data.user);
        }
        authNotifications.registerSuccess();
        return data;
      }
    } catch (error) {
      const apiError = handleApiError(error, "Ошибка регистрации");
      authNotifications.registerError(apiError.message);
      throw apiError;
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
      throw handleApiError(error, "Ошибка при получении данных пользователя");
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
      throw handleApiError(error, "Ошибка при обновлении профиля");
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
      throw handleApiError(error, "Ошибка при смене пароля");
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
      return transactions;
    } catch (error) {
      throw handleApiError(error, "Ошибка при загрузке транзакций");
    }
  },

  /**
   * Получение аналитики транзакций за период
   * @param {Date} startDate - Начальная дата периода
   * @param {Date} endDate - Конечная дата периода
   * @returns {Promise} Аналитика транзакций
   */
  getAnalytics: async (startDate, endDate) => {
    try {
      // Получаем все транзакции
      const transactions = await transactionsApi.getTransactions();

      // Фильтруем транзакции по периоду
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      console.log(
        `Найдено ${filteredTransactions.length} транзакций за выбранный период`
      );

      // Группируем по категориям и считаем суммы
      const analytics = filteredTransactions.reduce(
        (acc, transaction) => {
          const category = transaction.category || "Прочие расходы";
          if (!acc.categories[category]) {
            acc.categories[category] = {
              name: category,
              amount: 0,
              count: 0,
            };
          }
          const amount = parseFloat(transaction.sum || transaction.amount || 0);
          acc.categories[category].amount += amount;
          acc.categories[category].count += 1;
          acc.totalExpenses += amount;

          return acc;
        },
        {
          totalExpenses: 0,
          categories: {},
          period: {
            start: startDate,
            end: endDate,
          },
        }
      );

      // Преобразуем объект категорий в массив и сортируем по сумме
      analytics.categoriesArray = Object.values(analytics.categories).sort(
        (a, b) => b.amount - a.amount
      );

      return analytics;
    } catch (error) {
      throw handleApiError(error, "Ошибка при загрузке аналитики");
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
      throw handleApiError(error, "Ошибка при загрузке транзакции");
    }
  },

  /**
   * Создание новой транзакции
   * @param {Object} transactionData - Данные транзакции
   * @returns {Promise} Созданная транзакция
   */
  createTransaction: async (transactionData) => {
    try {
      const response = await api.post(
        "/api/transactions",
        JSON.stringify(transactionData)
      );
      return response.data.transaction || response.data;
    } catch (error) {
      throw handleApiError(error, "Ошибка при создании транзакции");
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
      const response = await api.put(
        `/api/transactions/${id}`,
        JSON.stringify(transactionData)
      );
      return response.data.transaction || response.data;
    } catch (error) {
      throw handleApiError(error, "Ошибка при обновлении транзакции");
    }
  },

  /**
   * Удаление транзакции
   * @param {string|number} id - ID транзакции
   * @returns {Promise} Результат удаления
   */
  deleteTransaction: async (id) => {
    try {
      // Проверяем, что ID валидный
      if (!id || id.startsWith("new-") || id.startsWith("temp-")) {
        throw new Error(
          "Невалидный ID транзакции. Нельзя удалить транзакцию без серверного ID."
        );
      }

      const response = await api.delete(`/api/transactions/${id}`);
      return response.data || { success: true };
    } catch (error) {
      throw handleApiError(error, "Ошибка при удалении транзакции");
    }
  },
};

// Экспорт основного экземпляра API
export default api;
