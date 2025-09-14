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
import { formatMoneyInput, validateMoneyInput } from "../../utils/formatMoney";
import { transactionsApi, authApi } from "../../services/api";
import { financeNotifications } from "../../services/toastNotifications";
import { useAuth } from "../../contexts/AuthContext";

const categories = [
  { id: "food", name: "Еда", icon: "/images/icons/bag-2.svg" },
  { id: "transport", name: "Транспорт", icon: "/images/icons/car.svg" },
  { id: "housing", name: "Жилье", icon: "/images/icons/house.svg" },
  {
    id: "joy",
    name: "Развлечения",
    icon: "/images/icons/gameboy.svg",
  },
  { id: "education", name: "Образование", icon: "/images/icons/teacher.svg" },
  { id: "others", name: "Другое", icon: "/images/icons/message-text.svg" },
];

const ExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isAuth, user } = useAuth();

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

  const formatDateForApi = (dateString) => {
    const date = new Date(dateString);
    // Попробуем ISO формат даты для API
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const validateForm = () => {
    if (!formData.description.trim()) {
      financeNotifications.validationError("Введите описание расхода");
      return false;
    }
    if (!formData.category) {
      financeNotifications.validationError("Выберите категорию");
      return false;
    }
    if (!formData.date) {
      financeNotifications.validationError("Выберите дату");
      return false;
    }
    if (
      !formData.amount ||
      parseFloat(formData.amount.replace(/\s/g, "")) <= 0
    ) {
      financeNotifications.validationError("Введите корректную сумму");
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
      // Проверяем токен
      const token = localStorage.getItem("authToken");
      console.log("Токен авторизации:", token ? "присутствует" : "отсутствует");
      console.log("Пользователь:", user);
      console.log("Статус авторизации:", authApi.isAuthenticated());

      // Подготавливаем данные для API
      const transactionData = {
        description: formData.description.trim(),
        category: getCategoryNameById(formData.category),
        date: formatDateForApi(formData.date),
        sum: parseFloat(formData.amount.replace(/\s/g, "")), // API ожидает "sum", а не "amount"
        // Убираем type - API его не принимает
      };

      console.log("Данные формы:", formData);
      console.log("Подготовленные данные для API:", transactionData);

      // Отправляем на сервер
      const newTransaction = await transactionsApi.createTransaction(
        transactionData
      );

      // Показываем уведомление об успехе
      financeNotifications.transactionCreated(formData.amount);

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
