import styled from "styled-components";
import { media, spacing } from "../../utils/breakpoints";

// Основной контейнер календаря
export const CalendarContainer = styled.div`
  width: 100%;
  height: 420px;
  background: #ffffff;
  border-radius: 20px;
  padding: ${spacing.mobile.element};
  box-shadow: 0px 10px 30px -8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    height: 480px;
    border-radius: 25px;
    padding: 24px;
    box-shadow: 0px 15px 50px -10px rgba(0, 0, 0, 0.12);
  }

  ${media.laptop} {
    width: 379px;
    height: 520px;
    border-radius: 30px;
    padding: 32px;
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  }
`;

// Заголовок календаря (точно по Figma)
export const CalendarTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.219em;
  color: #000000;
  margin: 0 0 20px 0;
  text-align: left;

  ${media.tablet} {
    font-size: 20px;
    margin: 0 0 24px 0;
  }

  ${media.laptop} {
    font-size: 24px;
    margin: 0 0 32px 0;
  }
`;

// Фиксированная шапка с днями недели
export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  flex-shrink: 0;

  ${media.tablet} {
    gap: 5px;
    margin-bottom: 14px;
  }

  ${media.laptop} {
    gap: 6px;
    margin-bottom: 16px;
  }
`;

// Название дня недели (точно по Figma)
export const CalendarDayName = styled.div`
  width: 32px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.219em;
  color: #999999;
  text-align: center;

  ${media.tablet} {
    width: 36px;
    padding: 5px 8px;
    font-size: 11px;
  }

  ${media.laptop} {
    width: 39.8px;
    padding: 6px 10px;
    font-size: 12px;
  }
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
  margin-bottom: 24px;

  ${media.tablet} {
    margin-bottom: 28px;
  }

  ${media.laptop} {
    margin-bottom: 32px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// Заголовок месяца
export const CalendarMonth = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.219em;
  color: #000000;
  margin-bottom: 12px;
  text-align: left;

  ${media.tablet} {
    font-size: 15px;
    margin-bottom: 14px;
  }

  ${media.laptop} {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

// Сетка дней календаря
export const CalendarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;

  ${media.tablet} {
    gap: 5px;
  }

  ${media.laptop} {
    gap: 6px;
  }
`;

// Кнопки переключения режима выбора
export const PeriodModeButtons = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;

  ${media.tablet} {
    gap: 7px;
    margin-bottom: 14px;
  }

  ${media.laptop} {
    gap: 8px;
    margin-bottom: 16px;
  }
`;

export const PeriodModeButton = styled.button`
  flex: 1;
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: ${(props) => (props.$isActive ? "#7334EA" : "#FFFFFF")};
  color: ${(props) => (props.$isActive ? "#FFFFFF" : "#666666")};
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 1.219em;
  cursor: pointer;
  transition: all 0.2s ease;

  ${media.tablet} {
    padding: 7px 14px;
    border-radius: 10px;
    font-size: 11px;
  }

  ${media.laptop} {
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 12px;
  }

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#6128D1" : "#F5F5F5")};
  }
`;

// Отображение выбранного периода
export const SelectedPeriodDisplay = styled.div`
  padding: 8px 12px;
  background: #f1ebfd;
  border-radius: 8px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 11px;
  line-height: 1.219em;
  color: #7334ea;
  text-align: center;
  margin-bottom: 12px;

  ${media.tablet} {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 12px;
    margin-bottom: 14px;
  }

  ${media.laptop} {
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

// Ячейка дня календаря (обновленные стили)
export const CalendarCell = styled.div`
  width: 32px;
  height: 34px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.219em;
  color: ${(props) => {
    if (props.$isSelected) return "#7334EA";
    if (props.$isInRange) return "#7334EA";
    if (props.$isOtherMonth) return "transparent";
    return "#000000";
  }};
  background-color: ${(props) => {
    if (props.$isSelected) return "#F1EBFD";
    if (props.$isInRange) return "#F8F4FF";
    return "transparent";
  }};
  cursor: ${(props) => (props.$isOtherMonth ? "default" : "pointer")};
  opacity: ${(props) => (props.$isOtherMonth ? 0 : 1)};
  transition: all 0.2s ease;
  position: relative;

  ${media.tablet} {
    width: 36px;
    height: 37px;
    font-size: 11px;
  }

  ${media.laptop} {
    width: 39.8px;
    height: 40px;
    border-radius: 60px;
    font-size: 12px;
  }

  &:hover {
    background-color: ${(props) => {
      if (props.$isOtherMonth) return "transparent";
      if (props.$isSelected) return "#F1EBFD";
      if (props.$isInRange) return "#F8F4FF";
      return "#f5f5f5";
    }};
  }

  // Для крайних дней диапазона добавляем особые стили
  ${(props) => {
    if (props.$isInRange && !props.$isSelected) {
      return `
        border-radius: 0;
        &:first-of-type,
        &:nth-child(7n+1) {
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;
        }
        &:last-of-type,
        &:nth-child(7n) {
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
        }
        
        ${media.laptop} {
          &:first-of-type,
          &:nth-child(7n+1) {
            border-top-left-radius: 60px;
            border-bottom-left-radius: 60px;
          }
          &:last-of-type,
          &:nth-child(7n) {
            border-top-right-radius: 60px;
            border-bottom-right-radius: 60px;
          }
        }
      `;
    }
  }}
`;

// Период выполнения (оставляем для совместимости)
export const CalendarPeriod = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 11px;
  line-height: 1.219em;
  color: #666666;
  text-align: center;

  ${media.tablet} {
    margin-top: 20px;
    padding: 14px;
    border-radius: 10px;
    font-size: 12px;
  }

  ${media.laptop} {
    margin-top: 24px;
    padding: 16px;
    border-radius: 12px;
    font-size: 14px;
  }
`;
