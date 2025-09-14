import styled from "styled-components";

// Основной контейнер календаря
export const CalendarContainer = styled.div`
  width: 379px;
  background: #ffffff;
  border-radius: 30px;
  padding: 32px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
`;

// Заголовок календаря
export const CalendarTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.219em;
  color: #000000;
  margin: 0 0 32px 0;
  text-align: center;
`;

export const CalendarText = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 10px;
  line-height: 1;

  span {
    color: ${(props) => props.theme.text};
  }
`;

// Блок календаря
export const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Месяц/год
export const CalendarMonth = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.219em;
  color: #000000;
  margin-bottom: 12px;
`;

// Навигация по месяцам
export const MonthNavButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  padding: 4px;
  font-size: 14px;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

// Контент календаря
export const CalendarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Названия дней недели
export const CalendarDaysNames = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
`;

export const CalendarDayName = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #999999;
  text-align: center;
  width: 39.8px;
`;

// Ячейки календаря
export const CalendarCells = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-start;
`;

export const CalendarCell = styled.div`
  width: 40px;
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
  cursor: pointer;
  opacity: ${(props) => (props.$isOtherMonth ? 0 : 1)};

  &:hover {
    background-color: ${(props) => {
      if (props.$isOtherMonth) return "transparent";
      if (props.$isSelected) return "#F1EBFD";
      return "#f5f5f5";
    }};
  }
`;

// Период выполнения
export const CalendarPeriod = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-size: 10px;
  line-height: 1;
  text-align: center;
  margin-top: 10px;
`;
