/**
 * Утилиты для работы с денежными суммами
 */

/**
 * Форматирует числовое значение в денежную сумму с копейками
 * @param {string|number} value - Значение для форматирования
 * @returns {string} Отформатированная сумма
 */
export const formatMoneyInput = (value) => {
  if (!value) return "";

  // Удаляем все кроме цифр, точек и запятых
  let cleanValue = value.toString().replace(/[^\d.,]/g, "");

  // Заменяем запятую на точку для унификации
  cleanValue = cleanValue.replace(",", ".");

  // Проверяем, есть ли точка в строке
  const dotIndex = cleanValue.indexOf(".");

  if (dotIndex !== -1) {
    // Если есть точка, берем только первую и ограничиваем копейки двумя знаками
    const integerPart = cleanValue.substring(0, dotIndex);
    const fractionalPart = cleanValue.substring(dotIndex + 1, dotIndex + 3);
    cleanValue = integerPart + (fractionalPart ? "." + fractionalPart : "");
  }

  return cleanValue;
};

/**
 * Форматирует сумму для отображения с разделителями тысяч и символом рубля
 * @param {string|number} value - Значение для форматирования
 * @returns {string} Отформатированная сумма с символом рубля
 */
export const formatMoneyDisplay = (value) => {
  if (!value) return "";

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return "";

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

/**
 * Валидирует введенное значение суммы
 * @param {string} value - Значение для валидации
 * @returns {boolean} true если значение корректно
 */
export const validateMoneyInput = (value) => {
  if (!value) return true;

  // Проверяем, что строка содержит только цифры, точку или запятую
  const moneyRegex = /^[\d.,]*$/;
  if (!moneyRegex.test(value)) return false;

  // Проверяем, что есть не более одной точки/запятой
  const separatorCount = (value.match(/[.,]/g) || []).length;
  if (separatorCount > 1) return false;

  // Проверяем, что после разделителя не более 2 цифр
  const parts = value.split(/[.,]/);
  if (parts.length > 1 && parts[1].length > 2) return false;

  return true;
};

/**
 * Преобразует отформатированную сумму в числовое значение
 * @param {string} formattedValue - Отформатированная сумма
 * @returns {number} Числовое значение
 */
export const parseMoneyValue = (formattedValue) => {
  if (!formattedValue) return 0;

  // Удаляем все кроме цифр, точек и запятых
  const cleanValue = formattedValue.replace(/[^\d.,]/g, "");

  // Заменяем запятую на точку
  const normalizedValue = cleanValue.replace(",", ".");

  return parseFloat(normalizedValue) || 0;
};
