import styled from "styled-components";

// Основной контейнер календаря
export const CalendarContainer = styled.div`
  width: 182px;
  margin-bottom: 20px;
`;

// Заголовок календаря
export const CalendarTitle = styled.div`
  margin-bottom: 14px;
  padding: 0 7px;
`;

export const CalendarText = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 10px;
  line-height: 1;

  span {
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

// Блок календаря
export const CalendarBlock = styled.div`
  display: block;
`;

// Месяц/год
export const CalendarMonth = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px;
`;

// Навигация по месяцам
export const MonthNavButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  font-size: 14px;

  &:hover {
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

// Контент календаря
export const CalendarContent = styled.div`
  margin-bottom: 12px;
`;

// Названия дней недели
export const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
`;

export const CalendarDayName = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
`;

// Ячейки календаря
export const CalendarCells = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
`;

export const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  color: ${(props) => {
    if (props.$isToday) return "#ffffff";
    if (props.$isOtherMonth) return props.theme.colors.textSecondary;
    return props.theme.colors.textPrimary;
  }};
  background-color: ${(props) => {
    if (props.$isSelected) return props.theme.colors.button;
    if (props.$isToday) return props.theme.colors.buttonSecondary;
    return "transparent";
  }};
  cursor: ${(props) => (props.$isOtherMonth ? "default" : "pointer")};
  opacity: ${(props) => (props.$isOtherMonth ? 0.3 : 1)};

  &:hover {
    background-color: ${(props) => {
      if (props.$isOtherMonth) return "transparent";
      if (props.$isSelected) return props.theme.colors.buttonHover;
      return props.theme.colors.border;
    }};
  }
`;

// Период выполнения
export const CalendarPeriod = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 10px;
  line-height: 1;
  text-align: center;
  margin-top: 10px;
`;
