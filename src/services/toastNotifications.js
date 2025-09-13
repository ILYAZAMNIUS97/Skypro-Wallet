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
  loginSuccess: (username) =>
    toast.success(
      `Добро пожаловать${username ? `, ${username}` : ""}!`,
      defaultOptions
    ),

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

  unauthorized: () => toast.error("Доступ запрещен", defaultOptions),

  updateSuccess: () => toast.success("Профиль обновлен", defaultOptions),

  updateError: () =>
    toast.error("Ошибка при обновлении профиля", defaultOptions),

  passwordChanged: () => toast.success("Пароль изменен", defaultOptions),

  passwordError: () => toast.error("Ошибка при смене пароля", defaultOptions),
};

// Уведомления для финансовых операций
export const financeNotifications = {
  transactionCreated: (amount) =>
    toast.success(`Транзакция на ${amount} ₽ добавлена!`, defaultOptions),

  transactionUpdated: () =>
    toast.success("Транзакция обновлена!", defaultOptions),

  transactionDeleted: () =>
    toast.success("Транзакция удалена!", defaultOptions),

  loadError: () => toast.error("Ошибка при загрузке данных", defaultOptions),

  saveError: () => toast.error("Ошибка при сохранении", defaultOptions),

  deleteError: () => toast.error("Ошибка при удалении", defaultOptions),

  invalidAmount: () =>
    toast.warning("Укажите корректную сумму", defaultOptions),

  invalidDate: () => toast.warning("Укажите корректную дату", defaultOptions),

  categoryRequired: () => toast.warning("Выберите категорию", defaultOptions),
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
