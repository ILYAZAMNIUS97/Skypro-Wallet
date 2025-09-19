import React, { useState } from "react";
import {
  FormContainer,
  FormTitle,
  FormField,
  FieldLabel,
  Input,
  AmountInputContainer,
  AmountInput,
  CurrencyLabel,
  DateInput,
  CategoriesContainer,
  CategoryButton,
  CategoryIcon,
  SubmitButton,
} from "./ExpenseForm.styled";
import {
  formatMoneyInput,
  validateMoneyInput,
  formatMoney,
} from "../../utils/formatMoney";
import { transactionsApi } from "../../services/api";
import { financeNotifications } from "../../services/toastNotifications";
import { useAuth } from "../../contexts/AuthContext";
import { categories } from "../../utils/categories";
import { formatDateForApi } from "../../utils/dateUtils";

const ExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isAuth } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountChange = (e) => {
    const { value } = e.target;

    // Валидируем введенное значение
    if (validateMoneyInput(value)) {
      // Форматируем значение
      const formattedValue = formatMoneyInput(value);
      setFormData((prev) => ({
        ...prev,
        amount: formattedValue,
      }));
    }
  };

  const handleCategorySelect = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const getCategoryNameById = (categoryId) => {
    // Возвращаем английский ID категории для API
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.id : "others";
  };

  const validateForm = () => {
    const errors = [];

    // Собираем все ошибки валидации
    if (!formData.description.trim()) {
      errors.push("Введите описание расхода");
    }
    if (!formData.category) {
      errors.push("Выберите категорию");
    }
    if (!formData.date) {
      errors.push("Выберите дату");
    }
    if (
      !formData.amount ||
      parseFloat(formData.amount.replace(/\s/g, "")) <= 0
    ) {
      errors.push("Введите корректную сумму");
    }

    // Если есть ошибки, показываем их все сразу
    if (errors.length > 0) {
      financeNotifications.multipleValidationErrors(errors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Проверяем авторизацию
    if (!isAuth) {
      financeNotifications.transactionError("Необходимо войти в систему");
      return;
    }

    setIsLoading(true);

    try {
      // Подготавливаем данные для API
      const transactionData = {
        description: formData.description.trim(),
        category: getCategoryNameById(formData.category),
        date: formatDateForApi(formData.date),
        sum: parseFloat(formData.amount.replace(/\s/g, "")),
      };

      // Отправляем на сервер
      const newTransaction = await transactionsApi.createTransaction(
        transactionData
      );

      // Показываем уведомление об успехе с корректно отформатированной суммой
      financeNotifications.transactionCreated(formatMoney(transactionData.sum));

      // Очищаем форму
      setFormData({
        description: "",
        category: "",
        date: "",
        amount: "",
      });

      // Вызываем callback для обновления списка
      if (onSubmit) {
        onSubmit(newTransaction);
      }
    } catch (error) {
      console.error("Ошибка при добавлении расхода:", error);
      financeNotifications.transactionError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Новый расход</FormTitle>

      <form onSubmit={handleSubmit}>
        <FormField>
          <FieldLabel>Описание</FieldLabel>
          <Input
            type="text"
            name="description"
            placeholder="Введите описание"
            value={formData.description}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </FormField>

        <FormField>
          <FieldLabel>Категория</FieldLabel>
          <CategoriesContainer>
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                type="button"
                $isSelected={formData.category === category.id}
                onClick={() => handleCategorySelect(category.id)}
                disabled={isLoading}
              >
                <CategoryIcon src={category.icon} alt={category.name} />
                {category.name}
              </CategoryButton>
            ))}
          </CategoriesContainer>
        </FormField>

        <FormField>
          <FieldLabel>Дата</FieldLabel>
          <DateInput
            type="date"
            name="date"
            placeholder="Введите дату"
            value={formData.date}
            onChange={handleInputChange}
            $hasValue={!!formData.date}
            disabled={isLoading}
          />
        </FormField>

        <FormField>
          <FieldLabel>Сумма</FieldLabel>
          <AmountInputContainer>
            <AmountInput
              type="text"
              name="amount"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleAmountChange}
              inputMode="decimal"
              disabled={isLoading}
            />
            <CurrencyLabel>₽</CurrencyLabel>
          </AmountInputContainer>
        </FormField>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Добавляем..." : "Добавить новый расход"}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ExpenseForm;
