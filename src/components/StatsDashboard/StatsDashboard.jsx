import { useMemo } from "react";
import { useTasks } from "../../contexts/useTasks";
import {
  StatsContainer,
  StatsGrid,
  StatCard,
  StatTitle,
  StatValue,
  StatLabel,
  ProgressBar,
  ProgressFill,
  OverdueList,
  OverdueItem,
  OverdueTitle,
  CategoryStats,
  CategoryItem,
  CategoryBadge,
} from "./StatsDashboard.styled";

const StatsDashboard = () => {
  const { tasks } = useTasks();

  // Вычисляем статистику
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "Готово").length;
    const inProgress = tasks.filter(
      (task) => task.status === "В работе"
    ).length;
    const testing = tasks.filter(
      (task) => task.status === "Тестирование"
    ).length;
    const todo = tasks.filter((task) => task.status === "Нужно сделать").length;
    const noStatus = tasks.filter(
      (task) => task.status === "Без статуса"
    ).length;

    // Просроченные задачи (дата в прошлом и статус не "Готово")
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = tasks.filter((task) => {
      if (!task.date || task.status === "Готово") return false;
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate < today;
    });

    // Статистика по категориям
    const categories = {
      "Web Design": tasks.filter((task) => task.topic === "Web Design").length,
      Research: tasks.filter((task) => task.topic === "Research").length,
      Copywriting: tasks.filter((task) => task.topic === "Copywriting").length,
    };

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      testing,
      todo,
      noStatus,
      overdue: overdue.slice(0, 5), // Показываем только первые 5 просроченных
      overdueCount: overdue.length,
      categories,
      completionRate,
    };
  }, [tasks]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getCategoryTheme = (category) => {
    switch (category) {
      case "Web Design":
        return "orange";
      case "Research":
        return "green";
      case "Copywriting":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <StatsContainer>
      <StatsGrid>
        {/* Общая статистика */}
        <StatCard>
          <StatTitle>Всего задач</StatTitle>
          <StatValue>{stats.total}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Выполнено</StatTitle>
          <StatValue $color="success">{stats.completed}</StatValue>
          <ProgressBar>
            <ProgressFill $width={stats.completionRate} />
          </ProgressBar>
          <StatLabel>{stats.completionRate}% выполнено</StatLabel>
        </StatCard>

        <StatCard>
          <StatTitle>В работе</StatTitle>
          <StatValue $color="info">{stats.inProgress}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>На тестировании</StatTitle>
          <StatValue $color="warning">{stats.testing}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>К выполнению</StatTitle>
          <StatValue>{stats.todo}</StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Просрочено</StatTitle>
          <StatValue $color="danger">{stats.overdueCount}</StatValue>
        </StatCard>
      </StatsGrid>

      {/* Просроченные задачи */}
      {stats.overdue.length > 0 && (
        <OverdueList>
          <OverdueTitle>Просроченные задачи</OverdueTitle>
          {stats.overdue.map((task) => (
            <OverdueItem key={task._id}>
              <span>{task.title}</span>
              <span>{formatDate(task.date)}</span>
            </OverdueItem>
          ))}
          {stats.overdueCount > 5 && (
            <StatLabel>и ещё {stats.overdueCount - 5} задач...</StatLabel>
          )}
        </OverdueList>
      )}

      {/* Статистика по категориям */}
      <CategoryStats>
        <OverdueTitle>По категориям</OverdueTitle>
        {Object.entries(stats.categories).map(([category, count]) => (
          <CategoryItem key={category}>
            <CategoryBadge $theme={getCategoryTheme(category)}>
              {category}
            </CategoryBadge>
            <StatValue>{count}</StatValue>
          </CategoryItem>
        ))}
      </CategoryStats>
    </StatsContainer>
  );
};

export default StatsDashboard;
