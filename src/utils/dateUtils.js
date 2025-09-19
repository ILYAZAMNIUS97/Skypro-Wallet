/**
 * Утилиты для работы с датами в приложении Skypro Wallet
 * Устраняет дублирование логики форматирования дат между компонентами
 */

/**
 * Форматирование даты для отображения в таблице
 * @param {string} dateString - Дата в ISO формате
 * @returns {string} Дата в формате ДД.ММ.ГГГГ
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Ошибка форматирования даты:", error);
    return dateString;
  }
};

/**
 * Форматирование даты для отправки в API
 * @param {string} dateString - Дата в любом формате
 * @returns {string} Дата в формате YYYY-MM-DD для API
 */
export const formatDateForApi = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    // Возвращаем в формате YYYY-MM-DD
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Ошибка форматирования даты для API:", error);
    return "";
  }
};

/**
 * Установка времени для начала дня (00:00:00.000)
 * @param {Date} date - Дата
 * @returns {Date} Дата с временем начала дня
 */
export const setStartOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Установка времени для конца дня (23:59:59.999)
 * @param {Date} date - Дата
 * @returns {Date} Дата с временем конца дня
 */
export const setEndOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

/**
 * Получение диапазона дат для аналитики
 * @param {Object} periodData - Данные периода из календаря
 * @returns {Object} Объект с startDate и endDate
 */
export const getDateRangeFromPeriod = (periodData) => {
  if (!periodData.dates || periodData.dates.length === 0) {
    return { startDate: null, endDate: null };
  }

  let startDate, endDate;

  if (periodData.type === "day") {
    // Для одного дня
    startDate = setStartOfDay(new Date(periodData.dates[0]));
    endDate = setEndOfDay(new Date(periodData.dates[0]));
  } else if (periodData.type === "week" || periodData.type === "range") {
    // Для недели или диапазона
    if (periodData.dates.length === 2) {
      startDate = setStartOfDay(new Date(Math.min(...periodData.dates)));
      endDate = setEndOfDay(new Date(Math.max(...periodData.dates)));
    } else {
      // Если только одна дата выбрана в диапазоне
      startDate = setStartOfDay(new Date(periodData.dates[0]));
      endDate = setEndOfDay(new Date(periodData.dates[0]));
    }
  } else {
    // Fallback для неизвестных типов
    startDate = setStartOfDay(new Date(periodData.dates[0]));
    endDate = setEndOfDay(new Date(periodData.dates[0]));
  }

  return { startDate, endDate };
};
