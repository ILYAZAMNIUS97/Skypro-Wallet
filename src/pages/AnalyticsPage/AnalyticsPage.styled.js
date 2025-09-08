import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f5f6;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 100px 120px 120px;
`;

export const PageTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.5em;
  color: #000000;
  margin: 0 0 80px 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
`;

export const CalendarContainer = styled.div`
  flex: 0 0 379px;
`;

export const StatsContainer = styled.div`
  flex: 1;
`;
