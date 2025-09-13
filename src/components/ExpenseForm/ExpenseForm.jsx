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
  CategoriesContainer,
  CategoryButton,
  CategoryIcon,
  SubmitButton,
} from "./ExpenseForm.styled";
import { formatMoneyInput, validateMoneyInput } from "../../utils/formatMoney";

const categories = [
  { id: "food", name: "Еда", icon: "/images/icons/bag-2.svg" },
  { id: "transport", name: "Транспорт", icon: "/images/icons/car.svg" },
  { id: "housing", name: "Жилье", icon: "/images/icons/house.svg" },
  {
    id: "entertainment",
    name: "Развлечения",
    icon: "/images/icons/gameboy.svg",
  },
  { id: "education", name: "Образование", icon: "/images/icons/teacher.svg" },
  { id: "other", name: "Другое", icon: "/images/icons/message-text.svg" },
];

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Добавление расхода:", formData);
    // Здесь будет логика добавления расхода
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
              >
                <CategoryIcon src={category.icon} alt={category.name} />
                {category.name}
              </CategoryButton>
            ))}
          </CategoriesContainer>
        </FormField>

        <FormField>
          <FieldLabel>Дата</FieldLabel>
          <Input
            type="date"
            name="date"
            placeholder="Введите дату"
            value={formData.date}
            onChange={handleInputChange}
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
            />
            <CurrencyLabel>₽</CurrencyLabel>
          </AmountInputContainer>
        </FormField>

        <SubmitButton type="submit">Добавить новый расход</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ExpenseForm;
