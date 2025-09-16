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

  // Инициализируем состояния на основе полей
  useEffect(() => {
    const initializeStates = () => {
      const fields = Object.keys(initialValues);
      const initialState = fields.reduce((acc, field) => {
        acc[field] = false;
        return acc;
      }, {});

      setFieldErrors(initialState);
      setFieldValid(initialState);
      setTouched(initialState);
    };

    initializeStates();
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
    const fields = Object.keys(initialValues);

    // Отмечаем все поля как touched и валидируем
    const validationResults = fields.reduce(
      (acc, field) => {
        acc.touched[field] = true;

        if (validators[field]) {
          const isValid = validators[field](formData[field]);
          acc.valid[field] = isValid;
          acc.errors[field] = !isValid;
        }

        return acc;
      },
      { touched: {}, valid: {}, errors: {} }
    );

    setTouched(validationResults.touched);
    setFieldErrors(validationResults.errors);
    setFieldValid(validationResults.valid);

    // Проверяем валидность всей формы
    const isFormValid = fields.every((field) => {
      const hasValue = formData[field]?.trim();
      const isValidField = validators[field]
        ? validators[field](formData[field])
        : true;
      return hasValue && isValidField;
    });

    if (!isFormValid) {
      setShowError(true);
    }

    return isFormValid;
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
