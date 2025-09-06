import styled from "styled-components";

// Основной контейнер модального окна
export const PopNewCardContainer = styled.div`
  display: block;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media screen and (max-width: 660px) {
    top: 70px;
  }
`;

// Внутренний контейнер с фоном
export const PopNewCardInner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 660px) {
    padding: 0;
    justify-content: flex-start;
  }
`;

// Блок модального окна
export const PopNewCardBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.modalBackground};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid ${(props) => props.theme.colors.border};
  position: relative;
  transform: ${(props) => (props.$visible ? "scale(1)" : "scale(0.9)")};
  transition: transform 0.3s ease;

  @media screen and (max-width: 660px) {
    border-radius: 0;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 16px 32px;
  }
`;

// Контент модального окна
export const PopNewCardContent = styled.div`
  display: block;
  text-align: left;
`;

// Заголовок модального окна
export const PopNewCardTitle = styled.h3`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
`;

// Кнопка закрытия
export const PopNewCardClose = styled.a`
  position: absolute;
  top: 20px;
  right: 30px;
  color: ${(props) => props.theme.colors.textSecondary};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

// Обертка для контента
export const PopNewCardWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 660px) {
    display: block;
  }
`;

// Форма
export const PopNewCardForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    max-width: 100%;
    width: 100%;
    display: block;
  }
`;

// Блок формы
export const FormNewBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

// Инпуты и текстовые поля
export const FormNewInput = styled.input`
  width: 100%;
  outline: none;
  padding: 14px;
  background: ${(props) => props.theme.colors.inputBackground};
  border: 0.7px solid ${(props) => props.theme.colors.inputBorder};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 20px 0;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: ${(props) => props.theme.colors.placeholder};
    letter-spacing: -0.14px;
  }
`;

export const FormNewTextarea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 14px;
  background: ${(props) => props.theme.colors.inputBackground};
  border: 0.7px solid ${(props) => props.theme.colors.inputBorder};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  color: ${(props) => props.theme.colors.textPrimary};
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
  resize: vertical;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: ${(props) => props.theme.colors.placeholder};
    letter-spacing: -0.14px;
  }

  @media screen and (max-width: 495px) {
    max-width: 100%;
    height: 34px;
  }
`;

// Кнопка создания
export const FormNewCreateButton = styled.button`
  width: 132px;
  height: 30px;
  background-color: ${(props) => props.theme.colors.button};
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #ffffff;
  float: right;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
  }
`;

// Подзаголовок
export const SubTitle = styled.p`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

// Контейнер категорий
export const Categories = styled.div`
  margin-bottom: 20px;
`;

export const CategoriesText = styled.p`
  margin-bottom: 14px;
`;

export const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CategoryTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: ${(props) => (props.$active ? 1 : 0.4)};
  cursor: pointer;
  transition: opacity 0.2s ease;

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
  }

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
`;

// Календарь
export const PopNewCardCalendar = styled.div`
  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;

// Контейнер ошибки
export const ErrorContainer = styled.div`
  color: #ff4757;
  background-color: ${(props) =>
    props.theme.colors.modalBackground === "#20202C" ? "#2c1e1e" : "#ffe0e0"};
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #ff4757;
`;
