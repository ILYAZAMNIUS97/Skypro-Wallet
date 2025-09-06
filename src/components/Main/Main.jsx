import { useEffect, useState, useMemo } from "react";
import Column from "../Column/Column";
import Loader from "../Loader/Loader";
import { useTasks } from "../../contexts/useTasks";
import { taskNotifications } from "../../services/toastNotifications";
import { Container } from "../../App.styled";
import {
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "./Main.styled";

// Компонент пустого состояния
const EmptyState = ({ hasFilters }) => (
  <LoadingContainer>
    <p>
      {hasFilters ? "Задач по заданным фильтрам не найдено" : "Новых задач нет"}
    </p>
  </LoadingContainer>
);

// Функция сортировки задач
const sortTasks = (tasks, sortBy) => {
  if (!sortBy) return tasks;

  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title, "ru");
      case "date": {
        // Сортировка по дате (новые сначала)
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        return dateB - dateA;
      }
      case "topic":
        return a.topic.localeCompare(b.topic, "ru");
      default:
        return 0;
    }
  });
};

const Main = ({ onCardClick, searchQuery, selectedFilter, selectedSort }) => {
  const { isLoading, error, loadTasks, getGroupedTasks, updateTask } =
    useTasks();
  const [draggedCard, setDraggedCard] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Фильтрация и сортировка задач
  const filteredAndSortedColumns = useMemo(() => {
    const allColumns = getGroupedTasks();

    return allColumns.map((column) => {
      let filteredTasks = column.cards;

      // Применяем фильтрацию
      if (searchQuery || selectedFilter) {
        filteredTasks = filteredTasks.filter((card) => {
          const matchesSearch =
            !searchQuery ||
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (card.description &&
              card.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()));

          const matchesFilter =
            !selectedFilter || card.topic === selectedFilter;

          return matchesSearch && matchesFilter;
        });
      }

      // Применяем сортировку
      const sortedTasks = sortTasks(filteredTasks, selectedSort);

      return {
        ...column,
        cards: sortedTasks,
      };
    });
  }, [getGroupedTasks, searchQuery, selectedFilter, selectedSort]);

  // Проверяем, есть ли хотя бы одна задача во всех колонках
  const hasAnyTasks = filteredAndSortedColumns.some(
    (column) => column.cards.length > 0
  );
  const hasFilters = Boolean(searchQuery || selectedFilter || selectedSort);

  const handleDragStart = (e, cardData) => {
    setDraggedCard(cardData);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleCardDrop = async (newStatus) => {
    if (!draggedCard) return;

    // Если статус не изменился, ничего не делаем
    if (draggedCard.status === newStatus) {
      setDraggedCard(null);
      return;
    }

    try {
      // Обновляем статус задачи
      await updateTask(draggedCard._id, {
        ...draggedCard,
        status: newStatus,
      });

      // Показываем уведомление о смене статуса
      taskNotifications.statusChanged(draggedCard.title, newStatus);
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
    } finally {
      setDraggedCard(null);
    }
  };

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <LoadingContainer>
                <p style={{ color: "red" }}>Ошибка: {error}</p>
              </LoadingContainer>
            ) : !hasAnyTasks ? (
              <EmptyState hasFilters={hasFilters} />
            ) : (
              filteredAndSortedColumns.map((column, index) => (
                <Column
                  key={index}
                  title={column.title}
                  cards={column.cards}
                  onCardClick={onCardClick}
                  onCardDrop={handleCardDrop}
                  onDragStart={handleDragStart}
                />
              ))
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
