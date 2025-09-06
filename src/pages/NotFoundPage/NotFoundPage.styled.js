import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #eaeef6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotFoundModal = styled.div`
  width: 368px;
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const NotFoundTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: #565eef;
  margin-bottom: 20px;
  line-height: 1;
  letter-spacing: -1.28px;
`;

export const NotFoundSubtitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
  line-height: 30px;
  letter-spacing: -0.6px;
`;

export const NotFoundText = styled.p`
  font-size: 14px;
  color: #000;
  margin-bottom: 30px;
  line-height: 150%;
  letter-spacing: -0.14px;
  max-width: 280px;
`;

export const NotFoundButton = styled.button`
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
  font-family: "Roboto", Arial, Helvetica, sans-serif;

  &:hover {
    background-color: #33399b;
  }

  &:active {
    background-color: #33399b;
  }
`;
