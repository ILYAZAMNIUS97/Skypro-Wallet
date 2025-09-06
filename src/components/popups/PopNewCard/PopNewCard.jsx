import { useState } from "react";
import Calendar from "../../Calendar/Calendar";
import { useTasks } from "../../../contexts/useTasks";
import { generalNotifications } from "../../../services/toastNotifications";
import {
  PopNewCardContainer,
  PopNewCardInner,
  PopNewCardBlock,
  PopNewCardContent,
  PopNewCardTitle,
  PopNewCardClose,
  PopNewCardWrap,
  PopNewCardForm,
  FormNewBlock,
  FormNewInput,
  FormNewTextarea,
  FormNewCreateButton,
  SubTitle,
  Categories,
  CategoriesText,
  CategoriesThemes,
  CategoryTheme,
  PopNewCardCalendar,
  ErrorContainer,
} from "./PopNewCard.styled";

function PopNewCard({ isVisible, onClose, onTaskCreated }) {
  const { createTask, isLoading, error, clearError } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design", // Категория по умолчанию
    date: "", // Выбранная дата
  });

  const [selectedCategory, setSelectedCategory] = useState("Web Design");

  const categories = [
    { name: "Web Design", className: "_orange" },
    { name: "Research", className: "_green" },
    { name: "Copywriting", className: "_purple" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаем ошибку при изменении формы
    if (error) clearError();
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setFormData((prev) => ({
      ...prev,
      topic: categoryName,
    }));
  };

  const handleDateSelect = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      generalNotifications.validationError("Введите название задачи");
      return;
    }

    try {
      clearError();

      // Подготавливаем данные для отправки на API
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        topic: selectedCategory,
        status: "Без статуса", // Статус по умолчанию для новых задач
        date: formData.date || null,
      };

      // Отправляем запрос на создание задачи через контекст
      const result = await createTask(taskData);

      // Вызываем callback для обновления UI если он передан
      if (onTaskCreated) {
        onTaskCreated(result);
      }

      // Закрываем модальное окно
      handleClose();
    } catch {
      // Ошибка уже обработана в контексте
    }
  };

  const handleClose = () => {
    // Сбрасываем форму при закрытии
    setFormData({
      title: "",
      description: "",
      topic: "Web Design",
      date: "",
    });
    setSelectedCategory("Web Design");
    clearError();
    onClose();
  };

  const handleOverlayClick = (e) => {
    // Закрываем модальное окно только если клик был по фону
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <PopNewCardContainer $visible={isVisible} id="popNewCard">
      <PopNewCardInner onClick={handleOverlayClick}>
        <PopNewCardBlock $visible={isVisible}>
          <PopNewCardContent>
            <PopNewCardTitle>Создание задачи</PopNewCardTitle>
            <PopNewCardClose href="#" onClick={handleClose}>
              &#10006;
            </PopNewCardClose>

            {error && <ErrorContainer>{error}</ErrorContainer>}

            <PopNewCardWrap>
              <PopNewCardForm id="formNewCard" onSubmit={handleSubmit}>
                <FormNewBlock>
                  <SubTitle as="label" htmlFor="formTitle">
                    Название задачи
                  </SubTitle>
                  <FormNewInput
                    type="text"
                    name="title"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={formData.title}
                    onChange={handleInputChange}
                    autoFocus
                    required
                    disabled={isLoading}
                  />
                </FormNewBlock>
                <FormNewBlock>
                  <SubTitle as="label" htmlFor="textArea">
                    Описание задачи
                  </SubTitle>
                  <FormNewTextarea
                    name="description"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </FormNewBlock>
              </PopNewCardForm>
              <PopNewCardCalendar>
                <Calendar
                  selectedDate={formData.date}
                  onDateSelect={handleDateSelect}
                  showPeriod={!!formData.date}
                />
              </PopNewCardCalendar>
            </PopNewCardWrap>
            <Categories>
              <CategoriesText>
                <SubTitle>Категория</SubTitle>
              </CategoriesText>
              <CategoriesThemes>
                {categories.map((category) => (
                  <CategoryTheme
                    key={category.name}
                    className={category.className}
                    $active={selectedCategory === category.name}
                    onClick={() =>
                      !isLoading && handleCategorySelect(category.name)
                    }
                    style={{
                      cursor: isLoading ? "not-allowed" : "pointer",
                      opacity: isLoading
                        ? 0.6
                        : selectedCategory === category.name
                        ? 1
                        : 0.4,
                    }}
                  >
                    <p>{category.name}</p>
                  </CategoryTheme>
                ))}
              </CategoriesThemes>
            </Categories>
            <FormNewCreateButton
              id="btnCreate"
              type="button"
              onClick={handleSubmit}
              disabled={!formData.title.trim() || isLoading}
            >
              {isLoading ? "Создание..." : "Создать задачу"}
            </FormNewCreateButton>
          </PopNewCardContent>
        </PopNewCardBlock>
      </PopNewCardInner>
    </PopNewCardContainer>
  );
}

export default PopNewCard;
