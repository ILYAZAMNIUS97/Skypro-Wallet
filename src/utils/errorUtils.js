/**
 * Утилиты для упрощения обработки ошибок
 * Централизованная логика для работы с ошибками в компонентах
 */

/**
 * Безопасное выполнение асинхронной операции с автоматической обработкой ошибок
 * @param {Function} asyncFn - Асинхронная функция для выполнения
 * @param {Function} setLoading - Функция установки состояния загрузки
 * @param {Function} onError - Функция обработки ошибки
 * @param {string} errorMessage - Сообщение об ошибке по умолчанию
 * @returns {Promise<any>} Результат выполнения функции или undefined при ошибке
 */
export const safeAsyncOperation = async (
  asyncFn,
  setLoading,
  onError,
  errorMessage = "Произошла ошибка"
) => {
  try {
    if (setLoading) setLoading(true);
    const result = await asyncFn();
    return result;
  } catch (error) {
    console.error(errorMessage, error);
    if (onError) {
      onError(error.message || errorMessage);
    }
    return undefined;
  } finally {
    if (setLoading) setLoading(false);
  }
};

/**
 * Упрощенный обработчик ошибок для UI операций
 * @param {Error} error - Объект ошибки
 * @param {Function} showNotification - Функция показа уведомления
 * @param {string} defaultMessage - Сообщение по умолчанию
 */
export const handleUIError = (error, showNotification, defaultMessage) => {
  const message = error?.message || defaultMessage;
  console.error(defaultMessage, error);
  if (showNotification) {
    showNotification(message);
  }
};

/**
 * Создает обработчик ошибок для компонента
 * @param {Function} showNotification - Функция показа уведомлений
 * @returns {Function} Функция обработки ошибок
 */
export const createErrorHandler = (showNotification) => {
  return (error, defaultMessage = "Произошла ошибка") => {
    handleUIError(error, showNotification, defaultMessage);
  };
};
