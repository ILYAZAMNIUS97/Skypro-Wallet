import { useState, useEffect } from "react";
import { useTasks } from "../../../contexts/useTasks";
import Calendar from "../../Calendar/Calendar";
import {
  PopBrowseContainer,
  PopBrowseInner,
  PopBrowseBlock,
  PopBrowseContent,
  PopBrowseTopBlock,
  PopBrowseTitle,
  PopBrowseWrap,
  PopBrowseForm,
  FormBrowseBlock,
  FormBrowseTextarea,
  StatusContainer,
  StatusTitle,
  StatusThemes,
  StatusTheme,
  SubTitle,
  CategoriesContainer,
  CategoriesTitle,
  CategoryTheme,
  ButtonContainer,
  ButtonGroup,
  Button,
  ErrorContainer,
  PopBrowseCalendar,
} from "./PopBrowse.styled";

function PopBrowse({ isVisible, onClose, card, onTaskUpdated, onTaskDeleted }) {
  const { updateTask, deleteTask, isLoading, error, clearError } = useTasks();
  const [isEditMode, setIsEditMode] = useState(false);

  // Состояния для редактирования
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTopic, setEditTopic] = useState("");

  // Статусы для выбора
  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  // Инициализация данных при открытии попапа
  useEffect(() => {
    if (isVisible && card) {
      setEditTitle(card.title || "");
      setEditDescription(card.description || "");
      setEditStatus(card.status || "");
      setEditTopic(card.topic || "");

      // Безопасная инициализация даты
      let safeDate = "";
      if (
        card.date &&
        typeof card.date === "string" &&
        card.date.trim() !== ""
      ) {
        try {
          // Простая проверка без вызова formatDate
          if (card.date.includes("-")) {
            const testDate = new Date(card.date);
            if (!isNaN(testDate.getTime())) {
              safeDate = testDate.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            }
          } else if (card.date.includes(".")) {
            safeDate = card.date; // Уже в нужном формате
          }
        } catch {
          safeDate = "";
        }
      }
      setEditDate(safeDate);

      setIsEditMode(false);
      clearError();
    }
  }, [isVisible, card, clearError]);

  // Закрытие по Escape обработано в MainPage
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setIsEditMode(false);
    clearError();
    onClose();
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
    clearError();

    // Если выходим из режима редактирования, сбрасываем изменения
    if (isEditMode) {
      setEditTitle(card.title || "");
      setEditDescription(card.description || "");
      setEditStatus(card.status || "");
      setEditDate(card.date || "");
      setEditTopic(card.topic || "");
    }
  };

  const handleSave = async () => {
    if (!card?._id) {
      return;
    }

    // Защита от повторных вызовов
    if (isLoading) {
      return;
    }

    try {
      clearError();

      const updatedData = {
        title: editTitle || card.title,
        description: editDescription || "",
        status: editStatus || card.status,
        topic: editTopic || card.topic,
        date: editDate || "",
      };

      const updatedTasks = await updateTask(card._id, updatedData);

      if (onTaskUpdated) {
        onTaskUpdated(updatedTasks);
      }
    } catch {
      // Ошибка уже обработана в контексте
    }
  };

  const handleDelete = async () => {
    if (!card?._id) {
      return;
    }

    if (!window.confirm("Вы действительно хотите удалить эту задачу?")) {
      return;
    }

    try {
      clearError();

      const updatedTasks = await deleteTask(card._id);

      if (onTaskDeleted) {
        onTaskDeleted(updatedTasks);
      }
    } catch {
      // Ошибка уже обработана в контексте
    }
  };

  const handleStatusChange = (status) => {
    setEditStatus(status);
  };

  const formatDate = (dateString) => {
    if (
      !dateString ||
      typeof dateString !== "string" ||
      dateString.trim() === ""
    )
      return "";

    try {
      // Если дата в формате ISO, конвертируем в DD.MM.YYYY
      if (dateString.includes("-")) {
        const date = new Date(dateString);
        // Проверяем что дата корректная
        if (isNaN(date.getTime())) {
          return "";
        }
        return date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }

      // Если дата уже в формате DD.MM.YYYY, возвращаем как есть
      if (dateString.includes(".")) {
        const [day, month, year] = dateString.split(".");
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        // Валидация компонентов даты
        if (
          !isNaN(dayNum) &&
          !isNaN(monthNum) &&
          !isNaN(yearNum) &&
          dayNum >= 1 &&
          dayNum <= 31 &&
          monthNum >= 1 &&
          monthNum <= 12 &&
          yearNum >= 1900 &&
          yearNum <= 2100
        ) {
          return `${dayNum.toString().padStart(2, "0")}.${monthNum
            .toString()
            .padStart(2, "0")}.${yearNum}`;
        }
      }

      return "";
    } catch {
      return "";
    }
  };

  const getTopicTheme = (topic) => {
    switch (topic) {
      case "Web Design":
        return "_orange";
      case "Research":
        return "_green";
      case "Copywriting":
        return "_purple";
      default:
        return "_gray";
    }
  };

  const handleDateSelect = (date) => {
    setEditDate(date);
  };

  if (!isVisible || !card) {
    return null;
  }

  return (
    <PopBrowseContainer $visible={isVisible}>
      <PopBrowseInner onClick={handleOverlayClick}>
        <PopBrowseBlock $visible={isVisible}>
          <PopBrowseContent>
            <PopBrowseTopBlock>
              <PopBrowseTitle>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  editTitle
                )}
              </PopBrowseTitle>
              <CategoryTheme className={`${getTopicTheme(editTopic)}`}>
                <p>{editTopic}</p>
              </CategoryTheme>
            </PopBrowseTopBlock>

            <StatusContainer>
              <StatusTitle>Статус</StatusTitle>
              <StatusThemes>
                {statuses.map((status) => (
                  <StatusTheme
                    key={status}
                    $selected={editStatus === status}
                    $disabled={!isEditMode}
                    data-disabled={!isEditMode}
                    onClick={
                      isEditMode ? () => handleStatusChange(status) : undefined
                    }
                  >
                    <p>{status}</p>
                  </StatusTheme>
                ))}
              </StatusThemes>
            </StatusContainer>

            <PopBrowseWrap>
              <PopBrowseForm>
                <FormBrowseBlock>
                  <SubTitle htmlFor="textArea01">Описание задачи</SubTitle>
                  <FormBrowseTextarea
                    name="text"
                    id="textArea01"
                    readOnly={!isEditMode}
                    $readOnly={!isEditMode}
                    placeholder="Введите описание задачи..."
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </FormBrowseBlock>
              </PopBrowseForm>
              <PopBrowseCalendar>
                <Calendar
                  selectedDate={formatDate(editDate)}
                  showPeriod={true}
                  readOnly={!isEditMode}
                  onDateSelect={isEditMode ? handleDateSelect : undefined}
                />
              </PopBrowseCalendar>
            </PopBrowseWrap>

            <CategoriesContainer className="theme-down">
              <CategoriesTitle>Категория</CategoriesTitle>
              <CategoryTheme className={`${getTopicTheme(editTopic)}`}>
                <p>{editTopic}</p>
              </CategoryTheme>
            </CategoriesContainer>

            {error && <ErrorContainer>{error}</ErrorContainer>}

            {/* Кнопки в режиме просмотра */}
            <ButtonContainer $visible={!isEditMode}>
              <ButtonGroup>
                <Button
                  className="btn-secondary"
                  onClick={handleEditModeToggle}
                  disabled={isLoading}
                >
                  Редактировать задачу
                </Button>
                <Button
                  className="btn-secondary"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Удаление..." : "Удалить задачу"}
                </Button>
              </ButtonGroup>
              <Button
                className="btn-primary"
                onClick={handleClose}
                disabled={isLoading}
              >
                Закрыть
              </Button>
            </ButtonContainer>

            {/* Кнопки в режиме редактирования */}
            <ButtonContainer $visible={isEditMode}>
              <ButtonGroup>
                <Button
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Сохранение..." : "Сохранить"}
                </Button>
                <Button
                  className="btn-secondary"
                  onClick={handleEditModeToggle}
                  disabled={isLoading}
                >
                  Отменить
                </Button>
                <Button
                  className="btn-secondary"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Удаление..." : "Удалить задачу"}
                </Button>
              </ButtonGroup>
              <Button
                className="btn-primary"
                onClick={handleClose}
                disabled={isLoading}
              >
                Закрыть
              </Button>
            </ButtonContainer>
          </PopBrowseContent>
        </PopBrowseBlock>
      </PopBrowseInner>
    </PopBrowseContainer>
  );
}

export default PopBrowse;
