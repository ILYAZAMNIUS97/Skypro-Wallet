import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../contexts/useTasks";
import Header from "../../components/Header/Header";
import PopUser from "../../components/popups/PopUser/PopUser";
import { Wrapper } from "../../App.styled";
import {
  NewTaskContainer,
  NewTaskHeader,
  NewTaskBackButton,
  NewTaskContent,
  NewTaskTitle,
  NewTaskForm,
  NewTaskGroup,
  NewTaskLabel,
  NewTaskInput,
  NewTaskSelect,
  NewTaskTextarea,
  NewTaskButton,
} from "./NewTaskPage.styled";

function NewTaskPage() {
  const navigate = useNavigate();
  const { createTask, isLoading, error, clearError } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    topic: "Web Design",
    status: "Без статуса",
    description: "",
  });

  const handleBack = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    try {
      clearError();

      // Подготавливаем данные для создания задачи
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        topic: formData.topic,
        status: formData.status,
        date: null, // Дата не задается на этой странице
      };

      // Создаем задачу через контекст
      await createTask(taskData);

      // Перенаправляем на главную страницу
      navigate("/");
    } catch {
      // Ошибка уже обработана в контексте
    }
  };

  return (
    <Wrapper>
      <PopUser />
      <Header />
      <NewTaskContainer>
        <NewTaskHeader>
          <NewTaskBackButton onClick={handleBack}>
            ← Вернуться к доске
          </NewTaskBackButton>
        </NewTaskHeader>
        <NewTaskContent>
          <NewTaskTitle>Создать новую задачу</NewTaskTitle>

          {error && (
            <div
              style={{
                color: "#ff4757",
                backgroundColor: "#ffe0e0",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <NewTaskForm onSubmit={handleSubmit}>
            <NewTaskGroup>
              <NewTaskLabel>Название задачи</NewTaskLabel>
              <NewTaskInput
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Введите название задачи"
                required
                disabled={isLoading}
              />
            </NewTaskGroup>
            <NewTaskGroup>
              <NewTaskLabel>Тема</NewTaskLabel>
              <NewTaskSelect
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="Web Design">Web Design</option>
                <option value="Research">Research</option>
                <option value="Copywriting">Copywriting</option>
              </NewTaskSelect>
            </NewTaskGroup>
            <NewTaskGroup>
              <NewTaskLabel>Статус</NewTaskLabel>
              <NewTaskSelect
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="Без статуса">Без статуса</option>
                <option value="Нужно сделать">Нужно сделать</option>
                <option value="В работе">В работе</option>
                <option value="Тестирование">Тестирование</option>
                <option value="Готово">Готово</option>
              </NewTaskSelect>
            </NewTaskGroup>
            <NewTaskGroup>
              <NewTaskLabel>Описание</NewTaskLabel>
              <NewTaskTextarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Введите описание задачи"
                rows="5"
                disabled={isLoading}
              />
            </NewTaskGroup>
            <NewTaskButton
              type="submit"
              disabled={!formData.title.trim() || isLoading}
              style={{
                opacity: !formData.title.trim() || isLoading ? 0.6 : 1,
                cursor:
                  !formData.title.trim() || isLoading
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {isLoading ? "Создание..." : "Создать задачу"}
            </NewTaskButton>
          </NewTaskForm>
        </NewTaskContent>
      </NewTaskContainer>
    </Wrapper>
  );
}

export default NewTaskPage;
