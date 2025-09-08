import React, { useState } from "react";
import {
  FormContainer,
  FormTitle,
  FormField,
  FieldLabel,
  Input,
  CategoriesContainer,
  CategoryButton,
  CategoryIcon,
  SubmitButton,
} from "./ExpenseForm.styled";

const categories = [
  { id: "food", name: "Еда", icon: "🛒" },
  { id: "transport", name: "Транспорт", icon: "🚗" },
  { id: "housing", name: "Жилье", icon: "🏠" },
  { id: "entertainment", name: "Развлечения", icon: "🎮" },
  { id: "education", name: "Образование", icon: "🎓" },
  { id: "other", name: "Другое", icon: "💬" },
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
                <CategoryIcon>{category.icon}</CategoryIcon>
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
          <Input
            type="text"
            name="amount"
            placeholder="Введите сумму"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </FormField>

        <SubmitButton type="submit">Добавить новый расход</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ExpenseForm;
