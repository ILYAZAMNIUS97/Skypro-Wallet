import React from "react";
import { formatMoney } from "../../utils/formatMoney";
import { getCategoryDisplayName } from "../../utils/categories";
import {
  StatsContainer,
  ExpenseSummary,
  ExpenseAmount,
  ExpenseLabel,
  ChartContainer,
  ChartWrapper,
  CategoryBar,
  CategoryLabel,
  CategoryAmount,
  NoDataMessage,
  LoadingMessage,
} from "./StatsDashboard.styled";

const StatsDashboard = ({ analyticsData, period, isLoading }) => {
  // Цвета для категорий
  const categoryColors = [
    "#D9B6FF", // Фиолетовый
    "#FFB53D", // Оранжевый
    "#6EE4FE", // Голубой
    "#B0AEFF", // Светло-фиолетовый
    "#BCEC30", // Зеленый
    "#FFB9B8", // Розовый
    "#A8E6CF", // Мятный
    "#FFD93D", // Желтый
    "#FF8A80", // Красный
    "#81C784", // Зеленый светлый
  ];

  // Показываем сообщение о загрузке
  if (isLoading) {
    return (
      <StatsContainer>
        <LoadingMessage>Загрузка аналитики...</LoadingMessage>
      </StatsContainer>
    );
  }

  // Если нет данных аналитики
  if (!analyticsData) {
    return (
      <StatsContainer>
        <NoDataMessage>
          Выберите период в календаре для просмотра аналитики расходов
        </NoDataMessage>
      </StatsContainer>
    );
  }

  // Если нет расходов за период
  if (
    !analyticsData.categoriesArray ||
    analyticsData.categoriesArray.length === 0
  ) {
    return (
      <StatsContainer>
        <ExpenseSummary>
          <ExpenseAmount>0 ₽</ExpenseAmount>
          <ExpenseLabel>
            Расходы за <span>{period || "выбранный период"}</span>
          </ExpenseLabel>
        </ExpenseSummary>
        <NoDataMessage>За выбранный период расходы не найдены</NoDataMessage>
      </StatsContainer>
    );
  }

  // Вычисляем максимальную высоту для нормализации столбцов
  const maxAmount = Math.max(
    ...analyticsData.categoriesArray.map((cat) => cat.amount)
  );
  const maxHeight = 328; // Максимальная высота столбца в пикселях

  // Подготавливаем данные для отображения
  const categories = analyticsData.categoriesArray.map((category, index) => {
    const normalizedHeight =
      maxAmount > 0 ? (category.amount / maxAmount) * maxHeight : 4;
    return {
      name: getCategoryDisplayName(category.name), // Преобразуем английское название в русское
      amount: formatMoney(category.amount),
      color: categoryColors[index % categoryColors.length],
      height: Math.max(normalizedHeight, 4), // Минимальная высота 4px
    };
  });

  return (
    <StatsContainer>
      <ExpenseSummary>
        <ExpenseAmount>
          {formatMoney(analyticsData.totalExpenses)}
        </ExpenseAmount>
        <ExpenseLabel>
          Расходы за <span>{period || "выбранный период"}</span>
        </ExpenseLabel>
      </ExpenseSummary>

      <ChartContainer>
        <ChartWrapper>
          {categories.map((category) => (
            <div key={category.name}>
              <CategoryAmount>{category.amount}</CategoryAmount>
              <CategoryBar $color={category.color} $height={category.height} />
              <CategoryLabel>{category.name}</CategoryLabel>
            </div>
          ))}
        </ChartWrapper>
      </ChartContainer>
    </StatsContainer>
  );
};

export default StatsDashboard;
