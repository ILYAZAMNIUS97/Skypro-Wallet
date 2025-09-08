import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 120px;
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoImage = styled.img`
  width: 143.68px;
  height: 19px;
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

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 1px;
    background: #7334ea;
    opacity: ${(props) => (props.$isActive ? "1" : "0")};
    transition: opacity 0.2s ease;
  }

  &:hover {
    color: #7334ea;
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

  &:hover {
    color: #7334ea;
  }
`;
