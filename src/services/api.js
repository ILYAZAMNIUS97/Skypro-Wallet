import axios from "axios";
import {
  authNotifications,
  taskNotifications,
  generalNotifications,
} from "./toastNotifications";

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

// Вспомогательные функции для работы с зарегистрированными пользователями
const userStorage = {
  /**
   * Получение всех зарегистрированных пользователей
   * @returns {Array} Массив пользователей
   */
  getUsers: () => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  },

  /**
   * Сохранение списка пользователей
   * @param {Array} users - Массив пользователей для сохранения
   */
  saveUsers: (users) => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  },

  /**
   * Добавление нового пользователя
   * @param {Object} user - Данные пользователя
   */
  addUser: (user) => {
    const users = userStorage.getUsers();
    users.push({
      id: user.id,
      name: user.name,
      login: user.login,
      password: user.password, // В реальном приложении пароль должен быть захеширован
    });
    userStorage.saveUsers(users);
  },

  /**
   * Поиск пользователя по логину и паролю
   * @param {string} login - Логин пользователя
   * @param {string} password - Пароль пользователя
   * @returns {Object|null} Найденный пользователь или null
   */
  findUser: (login, password) => {
    const users = userStorage.getUsers();
    return (
      users.find(
        (user) => user.login === login && user.password === password
      ) || null
    );
  },

  /**
   * Проверка существования пользователя с данным логином
   * @param {string} login - Логин для проверки
   * @returns {boolean} true если пользователь существует
   */
  userExists: (login) => {
    const users = userStorage.getUsers();
    return users.some((user) => user.login === login);
  },
};

// API методы для авторизации
export const authApi = {
  /**
   * Авторизация пользователя
   * @param {Object} credentials - Данные для входа
   * @param {string} credentials.login - Email пользователя
   * @param {string} credentials.password - Пароль пользователя
   * @returns {Promise} Ответ от сервера
   */
  login: async (credentials) => {
    // ВРЕМЕННОЕ РЕШЕНИЕ: Mock авторизация пока нет документации для auth endpoints

    let user = null;

    // Проверяем встроенного админа
    if (credentials.login === "admin" && credentials.password === "admin") {
      user = {
        id: 1,
        name: "Admin User",
        login: "admin",
        token: API_TOKEN,
      };
    } else {
      // Проверяем зарегистрированных пользователей
      const foundUser = userStorage.findUser(
        credentials.login,
        credentials.password
      );
      if (foundUser) {
        user = {
          id: foundUser.id,
          name: foundUser.name,
          login: foundUser.login,
          token: API_TOKEN,
        };
      }
    }

    if (user) {
      localStorage.setItem("authToken", API_TOKEN);
      localStorage.setItem("user", JSON.stringify(user));
      authNotifications.loginSuccess(user.name);
      return { user };
    } else {
      authNotifications.loginError();
      throw new Error("Неверные учетные данные");
    }

    // Когда будет документация для авторизации, раскомментируйте:
    // try {
    //   const response = await api.post("/auth/login", credentials);
    //   if (response.data.user && response.data.user.token) {
    //     localStorage.setItem("authToken", response.data.user.token);
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //   }
    //   return response.data;
    // } catch (error) {
    //   throw new Error(
    //     error.response?.data?.error || "Ошибка при входе в систему"
    //   );
    // }
  },

  /**
   * Регистрация нового пользователя
   * @param {Object} userData - Данные для регистрации
   * @param {string} userData.name - Имя пользователя
   * @param {string} userData.login - Email пользователя
   * @param {string} userData.password - Пароль пользователя
   * @returns {Promise} Ответ от сервера
   */
  register: async (userData) => {
    // ВРЕМЕННОЕ РЕШЕНИЕ: Mock регистрация пока нет документации для auth endpoints

    // Проверяем, что пользователь с таким логином не существует
    if (userStorage.userExists(userData.login) || userData.login === "admin") {
      authNotifications.registerError(
        "Пользователь с таким логином уже существует"
      );
      throw new Error("Пользователь с таким логином уже существует");
    }

    const mockUser = {
      id: Date.now(),
      name: userData.name,
      login: userData.login,
      password: userData.password, // В реальном приложении пароль должен быть захеширован
      token: API_TOKEN,
    };

    // Сохраняем пользователя в список зарегистрированных
    userStorage.addUser(mockUser);

    // Устанавливаем авторизацию для нового пользователя
    const userForStorage = {
      id: mockUser.id,
      name: mockUser.name,
      login: mockUser.login,
      token: API_TOKEN,
    };

    localStorage.setItem("authToken", API_TOKEN);
    localStorage.setItem("user", JSON.stringify(userForStorage));

    authNotifications.registerSuccess();
    return { user: userForStorage };

    // Когда будет документация для регистрации, раскомментируйте:
    // try {
    //   const response = await api.post("/auth/register", userData);
    //   if (response.data.user && response.data.user.token) {
    //     localStorage.setItem("authToken", response.data.user.token);
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //   }
    //   return response.data;
    // } catch (error) {
    //   throw new Error(error.response?.data?.error || "Ошибка при регистрации");
    // }
  },

  /**
   * Выход из системы
   */
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    authNotifications.logoutSuccess();
  },

  /**
   * Получение данных текущего пользователя
   * @returns {Object|null} Данные пользователя или null
   */
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Проверка авторизации
   * @returns {boolean} Статус авторизации
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};

// API методы для работы с задачами
export const tasksApi = {
  /**
   * Получение всех задач
   * @returns {Promise} Список задач
   */
  getTasks: async () => {
    try {
      const response = await api.get("/api/kanban");
      return response.data.tasks || [];
    } catch (error) {
      taskNotifications.loadError();
      throw new Error(
        error.response?.data?.error || "Ошибка при загрузке задач"
      );
    }
  },

  /**
   * Получение задачи по ID
   * @param {string|number} id - ID задачи
   * @returns {Promise} Данные задачи
   */
  getTask: async (id) => {
    try {
      const response = await api.get(`/api/kanban/${id}`);
      return response.data.task;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Ошибка при загрузке задачи"
      );
    }
  },

  /**
   * Создание новой задачи
   * @param {Object} taskData - Данные новой задачи
   * @returns {Promise} Созданная задача
   */
  createTask: async (taskData) => {
    try {
      // Конвертируем дату из формата "21.08.2025" в ISO формат если указана
      let isoDate = null;

      if (
        taskData.date &&
        typeof taskData.date === "string" &&
        taskData.date.trim() !== ""
      ) {
        // Если дата уже в ISO формате, оставляем как есть
        if (taskData.date.includes("-") && taskData.date.includes("T")) {
          isoDate = taskData.date;
        }
        // Если дата в формате DD.MM.YYYY, конвертируем в ISO
        else if (taskData.date.includes(".")) {
          const [day, month, year] = taskData.date.split(".");
          const dayNum = parseInt(day, 10);
          const monthNum = parseInt(month, 10);
          const yearNum = parseInt(year, 10);

          // Валидация компонентов даты
          if (
            !isNaN(dayNum) &&
            !isNaN(monthNum) &&
            !isNaN(yearNum) &&
            dayNum >= 1 &&
            dayNum <= 31 &&
            monthNum >= 1 &&
            monthNum <= 12 &&
            yearNum >= 1900 &&
            yearNum <= 2100
          ) {
            const dateObj = new Date(yearNum, monthNum - 1, dayNum);
            // Проверяем что дата корректная (не переполнилась)
            if (
              dateObj.getFullYear() === yearNum &&
              dateObj.getMonth() === monthNum - 1 &&
              dateObj.getDate() === dayNum
            ) {
              isoDate = dateObj.toISOString();
            }
          }
        }
      }

      // Формируем данные согласно документации API
      const taskForAPI = {
        title: taskData.title,
        topic: taskData.topic,
        status: taskData.status,
        description: taskData.description || "",
      };

      // Добавляем дату только если она корректно обработана
      if (isoDate) {
        taskForAPI.date = isoDate;
      }

      // Используем fetch с Content-Type: text/plain
      const token = localStorage.getItem("authToken") || API_TOKEN;

      const response = await fetch(`${API_BASE_URL}/api/kanban`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(taskForAPI),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json();

      taskNotifications.created(taskForAPI.title);
      return data.tasks; // Возвращает обновленный список
    } catch (error) {
      taskNotifications.saveError();
      throw new Error(error.message || "Ошибка при создании задачи");
    }
  },

  /**
   * Обновление задачи
   * @param {string|number} id - ID задачи
   * @param {Object} taskData - Новые данные задачи
   * @returns {Promise} Обновленная задача
   */
  updateTask: async (id, taskData) => {
    try {
      // Конвертируем дату из формата "21.08.2025" в ISO формат если указана
      let isoDate = null;

      if (
        taskData.date &&
        typeof taskData.date === "string" &&
        taskData.date.trim() !== ""
      ) {
        // Если дата уже в ISO формате, оставляем как есть
        if (taskData.date.includes("-") && taskData.date.includes("T")) {
          isoDate = taskData.date;
        }
        // Если дата в формате DD.MM.YYYY, конвертируем в ISO
        else if (taskData.date.includes(".")) {
          const [day, month, year] = taskData.date.split(".");
          const dayNum = parseInt(day, 10);
          const monthNum = parseInt(month, 10);
          const yearNum = parseInt(year, 10);

          // Валидация компонентов даты
          if (
            !isNaN(dayNum) &&
            !isNaN(monthNum) &&
            !isNaN(yearNum) &&
            dayNum >= 1 &&
            dayNum <= 31 &&
            monthNum >= 1 &&
            monthNum <= 12 &&
            yearNum >= 1900 &&
            yearNum <= 2100
          ) {
            const dateObj = new Date(yearNum, monthNum - 1, dayNum);
            // Проверяем что дата корректная (не переполнилась)
            if (
              dateObj.getFullYear() === yearNum &&
              dateObj.getMonth() === monthNum - 1 &&
              dateObj.getDate() === dayNum
            ) {
              isoDate = dateObj.toISOString();
            }
          }
        }
      }

      // Формируем данные согласно документации API
      const taskForAPI = {
        title: taskData.title,
        topic: taskData.topic,
        status: taskData.status,
        description: taskData.description || "",
      };

      // Добавляем дату только если она корректно обработана
      if (isoDate) {
        taskForAPI.date = isoDate;
      }

      // Используем fetch с Content-Type: text/plain как в createTask
      const token = localStorage.getItem("authToken") || API_TOKEN;

      const response = await fetch(`${API_BASE_URL}/api/kanban/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(taskForAPI),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json();

      taskNotifications.updated(taskForAPI.title);
      return data.tasks; // Возвращает обновленный список
    } catch (error) {
      taskNotifications.saveError();
      throw new Error(error.message || "Ошибка при обновлении задачи");
    }
  },

  /**
   * Удаление задачи
   * @param {string|number} id - ID задачи
   * @returns {Promise} Результат операции
   */
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/api/kanban/${id}`);
      taskNotifications.deleted("Задача");
      return response.data.tasks; // Возвращает обновленный список
    } catch (error) {
      taskNotifications.deleteError();
      throw new Error(
        error.response?.data?.error || "Ошибка при удалении задачи"
      );
    }
  },
};

// Экспорт основного экземпляра API
export default api;
