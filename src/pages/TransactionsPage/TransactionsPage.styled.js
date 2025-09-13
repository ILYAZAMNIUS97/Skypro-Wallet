import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f4f5f6;
`;

export const MainContent = styled.main`
  padding: 36px 120px 0;
`;

export const PageTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.5em;
  color: #000000;
  margin: 0 0 32px 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 34px;
  align-items: flex-start;
`;

export const ExpenseTableContainer = styled.div`
  width: 789px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const ExpenseFormContainer = styled.div`
  width: 379px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
`;
