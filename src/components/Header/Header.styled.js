import styled from "styled-components";

// Основной контейнер header
export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.cardBackground};
`;

// Блок содержимого header
export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

// Контейнер логотипа
export const LogoContainer = styled.div`
  img {
    width: 85px;
  }
`;

// Навигация
export const HeaderNav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Кнопка создания новой задачи
export const NewTaskButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;

  a {
    color: #ffffff;
  }

  &:hover {
    background-color: #33399b;
  }

  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
  }
`;

// Кнопка пользователя
export const UserButton = styled.button`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }

  &:hover {
    color: #33399b;

    &::after {
      border-left-color: #33399b;
      border-bottom-color: #33399b;
    }
  }
`;

// Попап пользователя
export const UserPopup = styled.div`
  display: ${(props) => (props.$isVisible ? "block" : "none")};
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.modalBackground};
  box-shadow: 0px 10px 39px 0px ${(props) => props.theme.colors.shadow};
  padding: 34px;
  text-align: center;
  z-index: 2;
`;

// Имя пользователя в попапе
export const UserName = styled.p`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

// Email пользователя в попапе
export const UserEmail = styled.p`
  color: #94a6be;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

// Контейнер темы
export const ThemeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    color: ${(props) => props.theme.colors.textPrimary};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }
`;

// Чекбокс темы
export const ThemeCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #eaeef6;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #94a6be;
    transition: 0.5s;
  }

  &:checked::before {
    left: 12px;
  }
`;

// Кнопка выхода
export const LogoutButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565eef;
  border-radius: 4px;
  border: 1px solid #565eef;

  a {
    color: #565eef;
  }

  &:hover {
    background-color: #33399b;
    color: #ffffff;

    a {
      color: #ffffff;
    }
  }
`;

// Контейнер поиска
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 20px;

  @media screen and (max-width: 768px) {
    margin: 0 10px;
    flex: 1;
  }

  @media screen and (max-width: 495px) {
    display: none;
  }
`;

// Иконка поиска
export const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  z-index: 2;
  color: ${(props) => (props.$focused ? "#565eef" : "#94a6be")};
  transition: color 0.2s ease;
`;

// Поле поиска
export const SearchInput = styled.input`
  width: 250px;
  height: 32px;
  padding: 8px 8px 8px 35px;
  border: 1px solid ${(props) => props.theme.colors.border || "#d4dbe5"};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.inputBackground || "#ffffff"};
  color: ${(props) => props.theme.colors.textPrimary || "#000000"};
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #94a6be;
  }

  &:focus {
    border-color: #565eef;
    box-shadow: 0 0 0 3px rgba(86, 94, 239, 0.1);
  }

  @media screen and (max-width: 768px) {
    width: 200px;
  }
`;

// Контейнер фильтра
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 495px) {
    display: none;
  }
`;

// Селект фильтра
export const FilterSelect = styled.select`
  height: 32px;
  padding: 6px 30px 6px 10px;
  border: 1px solid ${(props) => props.theme.colors.border || "#d4dbe5"};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.inputBackground || "#ffffff"};
  color: ${(props) => props.theme.colors.textPrimary || "#000000"};
  font-size: 14px;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px;

  &:focus {
    border-color: #565eef;
    box-shadow: 0 0 0 3px rgba(86, 94, 239, 0.1);
  }

  option {
    background: ${(props) => props.theme.colors.inputBackground || "#ffffff"};
    color: ${(props) => props.theme.colors.textPrimary || "#000000"};
  }
`;

// Селект сортировки (идентичен FilterSelect)
export const SortSelect = styled.select`
  height: 32px;
  padding: 6px 30px 6px 10px;
  border: 1px solid ${(props) => props.theme.colors.border || "#d4dbe5"};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.inputBackground || "#ffffff"};
  color: ${(props) => props.theme.colors.textPrimary || "#000000"};
  font-size: 14px;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px;

  &:focus {
    border-color: #565eef;
    box-shadow: 0 0 0 3px rgba(86, 94, 239, 0.1);
  }

  option {
    background: ${(props) => props.theme.colors.inputBackground || "#ffffff"};
    color: ${(props) => props.theme.colors.textPrimary || "#000000"};
  }
`;

// Кнопка сброса фильтров
export const ClearButton = styled.button`
  height: 32px;
  padding: 6px 12px;
  background: transparent;
  color: #565eef;
  border: 1px solid #565eef;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #565eef;
    color: #ffffff;
  }

  &:active {
    transform: translateY(1px);
  }
`;

// Кнопка экспорта
export const ExportButton = styled.button`
  height: 32px;
  padding: 6px 12px;
  background: #10b981;
  color: #ffffff;
  border: 1px solid #10b981;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #059669;
    border-color: #059669;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media screen and (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
  }

  @media screen and (max-width: 495px) {
    display: none;
  }
`;
