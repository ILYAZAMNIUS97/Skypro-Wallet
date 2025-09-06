import styled from "styled-components";

// Основной контейнер main
export const MainContainer = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

// Блок содержимого main
export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }
`;

// Контент main
export const MainContent = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

// Компонент для состояния загрузки
export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;

  p {
    font-size: 18px;
    color: #565eef;
    font-weight: 500;
    text-align: center;
  }
`;
