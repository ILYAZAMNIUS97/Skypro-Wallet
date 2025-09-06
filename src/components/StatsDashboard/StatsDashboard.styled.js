import styled from "styled-components";

// Основной контейнер статистики
export const StatsContainer = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.colors.cardBackground};
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px ${(props) => props.theme.colors.shadow};
`;

// Сетка для карточек статистики
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media screen and (max-width: 495px) {
    grid-template-columns: 1fr;
  }
`;

// Карточка статистики
export const StatCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${(props) => props.theme.colors.shadow};
  }
`;

// Заголовок статистики
export const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Значение статистики
export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${(props) => {
    switch (props.$color) {
      case "success":
        return "#10B981";
      case "danger":
        return "#EF4444";
      case "warning":
        return "#F59E0B";
      case "info":
        return "#3B82F6";
      default:
        return props.theme.colors.textPrimary;
    }
  }};
`;

// Подпись статистики
export const StatLabel = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

// Прогресс-бар
export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${(props) => props.theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
  margin: 8px 0;
`;

// Заполнение прогресс-бара
export const ProgressFill = styled.div`
  width: ${(props) => props.$width}%;
  height: 100%;
  background: linear-gradient(90deg, #10b981, #065f46);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

// Список просроченных задач
export const OverdueList = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

// Элемент просроченной задачи
export const OverdueItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    font-weight: 500;
    color: ${(props) => props.theme.colors.textPrimary};
    flex: 1;
    margin-right: 16px;
  }

  span:last-child {
    font-size: 12px;
    color: #ef4444;
    font-weight: 600;
  }
`;

// Заголовок секции
export const OverdueTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
`;

// Статистика по категориям
export const CategoryStats = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 16px;
`;

// Элемент категории
export const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

// Бейдж категории
export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;

  ${(props) => {
    switch (props.$theme) {
      case "orange":
        return `
          background-color: #ffe4c2;
          color: #ff6d00;
        `;
      case "green":
        return `
          background-color: #b4fdd1;
          color: #06b16e;
        `;
      case "purple":
        return `
          background-color: #e9d4ff;
          color: #9a48f1;
        `;
      default:
        return `
          background-color: ${props.theme.colors.border};
          color: ${props.theme.colors.textSecondary};
        `;
    }
  }}
`;
