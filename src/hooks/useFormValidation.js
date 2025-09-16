import { useState, useEffect } from "react";

/**
 * Универсальный хук для валидации форм
 * Устраняет дублирование логики валидации между разными формами
 *
 * @param {Object} initialValues - Начальные значения полей формы
 * @param {Object} validators - Объект с функциями валидации для каждого поля
 * @returns {Object} Состояние формы и методы для работы с ней
 */
export const useFormValidation = (initialValues, validators) => {
  const [formData, setFormData] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldValid, setFieldValid] = useState({});
  const [touched, setTouched] = useState({});
  const [showError, setShowError] = useState(false);

  // Инициализируем состояния ошибок и валидности на основе полей
  useEffect(() => {
    const initialErrors = {};
    const initialValid = {};
    const initialTouched = {};

    Object.keys(initialValues).forEach((field) => {
      initialErrors[field] = false;
      initialValid[field] = false;
      initialTouched[field] = false;
    });

    setFieldErrors(initialErrors);
    setFieldValid(initialValid);
    setTouched(initialTouched);
  }, [initialValues]);

  /**
   * Обработчик изменения значений в полях
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Валидация в реальном времени
    if (validators[name]) {
      const isValid = validators[name](value);
      const hasError = value.length > 0 && !isValid;

      setFieldValid((prev) => ({
        ...prev,
        [name]: isValid,
      }));

      setFieldErrors((prev) => ({
        ...prev,
        [name]: hasError,
      }));
    }

    // Скрыть общую ошибку при вводе (для RegisterPage)
    if (showError) {
      setShowError(false);
    }
  };

  /**
   * Обработчик события blur (потери фокуса)
   */
  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  /**
   * Валидация всей формы
   * @returns {boolean} true если форма валидна
   */
  const validateForm = () => {
    // Отметить все поля как touched
    const newTouched = {};
    const newFieldErrors = {};
    const newFieldValid = {};

    Object.keys(initialValues).forEach((field) => {
      newTouched[field] = true;

      if (validators[field]) {
        const isValid = validators[field](formData[field]);
        newFieldValid[field] = isValid;
        newFieldErrors[field] = !isValid;
      }
    });

    setTouched(newTouched);
    setFieldErrors(newFieldErrors);
    setFieldValid(newFieldValid);

    // Проверяем, что все поля валидны и заполнены
    const isFormValid = Object.keys(initialValues).every((field) => {
      if (validators[field]) {
        return validators[field](formData[field]) && formData[field]?.trim();
      }
      return formData[field]?.trim();
    });

    if (!isFormValid) {
      setShowError(true);
      return false;
    }

    return true;
  };

  /**
   * Сброс формы к начальным значениям
   */
  const resetForm = () => {
    setFormData(initialValues);
    setShowError(false);

    const resetErrors = {};
    const resetValid = {};
    const resetTouched = {};

    Object.keys(initialValues).forEach((field) => {
      resetErrors[field] = false;
      resetValid[field] = false;
      resetTouched[field] = false;
    });

    setFieldErrors(resetErrors);
    setFieldValid(resetValid);
    setTouched(resetTouched);
  };

  // Проверка, активна ли кнопка отправки
  const isFormValid = Object.keys(initialValues).every((field) => {
    if (validators[field]) {
      return fieldValid[field] && formData[field];
    }
    return formData[field];
  });

  // Автоматически скрывать ошибку когда форма становится валидной
  useEffect(() => {
    if (showError && isFormValid) {
      setShowError(false);
    }
  }, [showError, isFormValid]);

  return {
    formData,
    fieldErrors,
    fieldValid,
    touched,
    showError,
    isFormValid,
    handleInputChange,
    handleInputBlur,
    validateForm,
    resetForm,
    setShowError,
  };
};
