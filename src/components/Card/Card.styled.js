import styled, { keyframes } from "styled-components";

// Анимация появления карточки
const cardAnimation = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: auto;
    opacity: 1;
  }
`;

// Обертка карточки
export const CardItem = styled.div`
  padding: 5px;
  animation: ${cardAnimation} 500ms linear;
`;

// Основная карточка
export const Card = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
    background-color: ${(props) => props.theme.colors.cardBackground};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
  }
`;

// Группа элементов в верхней части карточки
export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Базовая тема карточки
export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }

  // Варианты цветовых тем
  &._orange {
    background-color: #ffe4c2;
    color: #ff6d00;
  }

  &._green {
    background-color: #b4fdd1;
    color: #06b16e;
  }

  &._purple {
    background-color: #e9d4ff;
    color: #9a48f1;
  }

  &._gray {
    background: #94a6be;
    color: #ffffff;
  }
`;

// Кнопка с тремя точками
export const CardButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

// Контент карточки
export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

// Заголовок карточки
export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;
`;

// Дата карточки
export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${(props) => props.theme.colors.textSecondary};
    letter-spacing: 0.2px;
  }
`;
