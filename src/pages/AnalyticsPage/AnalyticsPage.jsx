import React from "react";
import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar";
import StatsDashboard from "../../components/StatsDashboard/StatsDashboard";
import {
  PageContainer,
  MainContent,
  PageTitle,
  ContentWrapper,
  CalendarContainer,
  StatsContainer,
} from "./AnalyticsPage.styled";

const AnalyticsPage = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageTitle>Анализ расходов</PageTitle>
        <ContentWrapper>
          <CalendarContainer>
            <Calendar />
          </CalendarContainer>
          <StatsContainer>
            <StatsDashboard />
          </StatsContainer>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
};

export default AnalyticsPage;
