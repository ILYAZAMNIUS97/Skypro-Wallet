import { toast } from "react-toastify";

/**
 * Утилиты для показа уведомлений в приложении Skypro Wallet
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

// Уведомления для аутентификации
export const authNotifications = {
  loginSuccess: () => toast.success("Добро пожаловать!", defaultOptions),

  loginError: (message) =>
    toast.error(message || "Неверные данные для входа", defaultOptions),

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
};

// Уведомления для финансовых операций
export const financeNotifications = {
  transactionCreated: (amount) =>
    toast.success(`Транзакция на ${amount} добавлена!`, defaultOptions),

  transactionDeleted: () =>
    toast.success("Транзакция удалена!", defaultOptions),

  transactionError: (message) =>
    toast.error(message || "Ошибка при добавлении транзакции", defaultOptions),

  validationError: (message) =>
    toast.warning(
      message || "Проверьте правильность заполнения полей",
      defaultOptions
    ),

  // Новая функция для показа множественных ошибок валидации
  multipleValidationErrors: (errors) => {
    const errorMessage =
      errors.length === 1
        ? errors[0]
        : `Исправьте следующие ошибки:\n• ${errors.join("\n• ")}`;

    toast.warning(errorMessage, {
      ...defaultOptions,
      autoClose: 5000, // Увеличиваем время показа для множественных ошибок
      style: {
        whiteSpace: "pre-line", // Позволяет переносы строк
      },
    });
  },
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
};
