import styled from "styled-components";

// Основной контейнер календаря
export const CalendarContainer = styled.div`
  width: 379px;
  height: 520px;
  background: #ffffff;
  border-radius: 30px;
  padding: 32px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
`;

// Заголовок календаря (точно по Figma)
export const CalendarTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.219em;
  color: #000000;
  margin: 0 0 32px 0;
  text-align: left;
`;

// Фиксированная шапка с днями недели
export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

// Название дня недели (точно по Figma)
export const CalendarDayName = styled.div`
  width: 39.8px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #999999;
  text-align: center;
`;

// Прокручиваемая область календаря
export const CalendarScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  /* Стили полосы прокрутки */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

// Блок одного месяца
export const CalendarMonthBlock = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// Заголовок месяца
export const CalendarMonth = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.219em;
  color: #000000;
  margin-bottom: 16px;
  text-align: left;
`;

// Сетка дней календаря
export const CalendarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-start;
`;

// Ячейка дня календаря (обновленные стили)
export const CalendarCell = styled.div`
  width: 39.8px;
  height: 40px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: ${(props) => {
    if (props.$isSelected) return "#7334EA";
    if (props.$isOtherMonth) return "transparent";
    return "#000000";
  }};
  background-color: ${(props) => {
    if (props.$isSelected) return "#F1EBFD";
    return "transparent";
  }};
  cursor: ${(props) => (props.$isOtherMonth ? "default" : "pointer")};
  opacity: ${(props) => (props.$isOtherMonth ? 0 : 1)};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => {
      if (props.$isOtherMonth) return "transparent";
      if (props.$isSelected) return "#F1EBFD";
      return "#f5f5f5";
    }};
  }
`;

// Убираем неиспользуемые стили
// export const PeriodSelector, PeriodButton, CalendarBlock,
// CalendarContent, CalendarDaysNames, CalendarCells - удалены

// Период выполнения (оставляем для совместимости)
export const CalendarPeriod = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.219em;
  color: #666666;
  text-align: center;
`;
