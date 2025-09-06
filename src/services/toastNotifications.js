import { toast } from "react-toastify";

/**
 * Утилиты для показа уведомлений в канбан-доске
 */

// Настройки по умолчанию для всех уведомлений
const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Уведомления для задач
export const taskNotifications = {
  created: (taskTitle) =>
    toast.success(`Задача "${taskTitle}" создана успешно!`, defaultOptions),

  updated: (taskTitle) =>
    toast.success(`Задача "${taskTitle}" обновлена!`, defaultOptions),

  deleted: (taskTitle) =>
    toast.success(`Задача "${taskTitle}" удалена!`, defaultOptions),

  statusChanged: (taskTitle, newStatus) =>
    toast.info(
      `Задача "${taskTitle}" перемещена в "${newStatus}"`,
      defaultOptions
    ),

  loadError: () => toast.error("Ошибка при загрузке задач", defaultOptions),

  saveError: () => toast.error("Ошибка при сохранении задачи", defaultOptions),

  deleteError: () => toast.error("Ошибка при удалении задачи", defaultOptions),
};

// Уведомления для аутентификации
export const authNotifications = {
  loginSuccess: (username) =>
    toast.success(`Добро пожаловать, ${username}!`, defaultOptions),

  loginError: () => toast.error("Неверные данные для входа", defaultOptions),

  registerSuccess: () =>
    toast.success("Регистрация прошла успешно!", defaultOptions),

  registerError: (message) =>
    toast.error(message || "Ошибка при регистрации", defaultOptions),

  logoutSuccess: () =>
    toast.info("Вы успешно вышли из системы", defaultOptions),

  sessionExpired: () =>
    toast.warning("Сессия истекла. Войдите в систему заново", {
      ...defaultOptions,
      autoClose: 5000,
    }),

  unauthorized: () => toast.error("Доступ запрещен", defaultOptions),
};

// Общие уведомления
export const generalNotifications = {
  networkError: () =>
    toast.error("Проблемы с сетью. Проверьте подключение к интернету", {
      ...defaultOptions,
      autoClose: 5000,
    }),

  serverError: () =>
    toast.error("Ошибка сервера. Попробуйте позже", defaultOptions),

  validationError: (message) =>
    toast.warning(
      message || "Проверьте правильность заполнения полей",
      defaultOptions
    ),

  loading: (message) =>
    toast.loading(message || "Загрузка...", {
      ...defaultOptions,
      autoClose: false,
    }),

  dismiss: () => toast.dismiss(),
};

// Кастомные уведомления для специфичных случаев канбан-доски
export const kanbanNotifications = {
  columnEmpty: (columnName) =>
    toast.info(`Колонка "${columnName}" пуста`, defaultOptions),

  maxTasksReached: () =>
    toast.warning("Достигнуто максимальное количество задач", defaultOptions),

  duplicateTaskTitle: () =>
    toast.warning("Задача с таким названием уже существует", defaultOptions),

  dateInPast: () => toast.warning("Выбрана дата в прошлом", defaultOptions),

  autoSaved: () =>
    toast.success("Изменения автоматически сохранены", {
      ...defaultOptions,
      autoClose: 1500,
    }),
};
