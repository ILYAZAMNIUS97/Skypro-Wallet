import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;

  /* Адаптивные отступы для разных экранов */
  @media screen and (min-width: 768px) {
    padding: 0 40px;
  }

  @media screen and (min-width: 1024px) {
    padding: 0 60px;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 80px;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 120px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoImage = styled.img`
  width: 143.68px;
  height: 19px;

  /* Адаптивное масштабирование логотипа */
  @media screen and (max-width: 768px) {
    width: 120px;
    height: 16px;
  }

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 13px;
  }
`;

export const LogoText = styled.span`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  display: none; /* Скрываем текст, показываем только логотип */
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 48px;

  /* Адаптивные отступы в навигации */
  @media screen and (max-width: 1024px) {
    gap: 32px;
  }

  @media screen and (max-width: 768px) {
    gap: 24px;
  }

  @media screen and (max-width: 480px) {
    gap: 16px;
  }
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavLink = styled.a`
  font-family: "Montserrat", sans-serif;
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  font-size: 14px;
  line-height: 1.7em;
  color: ${(props) => (props.$isActive ? "#7334EA" : "#000000")};
  text-decoration: none;
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;

  /* Адаптивный размер шрифта */
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #7334ea;
    opacity: ${(props) => (props.$isActive ? "1" : "0")};
    transition: opacity 0.2s ease;
  }

  &:hover {
    color: #7334ea;
    font-weight: 600;
  }
`;

export const ExitButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.7em;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  /* Адаптивный размер шрифта */
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }

  &:hover {
    color: #7334ea;
  }
`;
