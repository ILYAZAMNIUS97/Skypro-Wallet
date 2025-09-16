/**
 * Утилиты валидации для форм
 */

/**
 * Валидация email адреса
 * @param {string} email - Email для валидации
 * @returns {boolean} true если email валидный
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Валидация пароля
 * @param {string} password - Пароль для валидации
 * @returns {boolean} true если пароль валидный (минимум 6 символов)
 */
export const validatePassword = (password) => {
  return password.length >= 6;
};

/**
 * Валидация имени
 * @param {string} name - Имя для валидации
 * @returns {boolean} true если имя валидное (минимум 2 символа и 2 слова)
 */
export const validateName = (name) => {
  return name.trim().length >= 2 && name.trim().split(" ").length >= 2;
};
