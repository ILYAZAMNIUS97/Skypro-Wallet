import styled, { createGlobalStyle } from "styled-components";
import { media, spacing } from "./utils/breakpoints";

// Глобальные стили (перенесены из App.css)
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.background};
    font-size: 14px;
    
    ${media.tablet} {
      font-size: 15px;
    }
    
    ${media.laptop} {
      font-size: 16px;
    }
  }

  /* Улучшенные стили для мобильных устройств */
  ${media.mobile} {
    body {
      overflow-x: hidden;
    }
  }
`;

// Основной wrapper приложения
export const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.background};
`;

// Контейнер для центрирования контента
export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${spacing.mobile.container};

  ${media.tablet} {
    padding: 0 ${spacing.tablet.container};
  }

  ${media.laptop} {
    padding: 0 ${spacing.laptop.container};
  }

  ${media.desktop} {
    padding: 0 ${spacing.desktop.container};
  }
`;
