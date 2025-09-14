import React, { useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar";
import StatsDashboard from "../../components/StatsDashboard/StatsDashboard";
import { transactionsApi } from "../../services/api";
import {
  PageContainer,
  MainContent,
  PageTitle,
  ContentWrapper,
  CalendarContainer,
  StatsContainer,
} from "./AnalyticsPage.styled";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Обработка изменения периода в календаре
  const handlePeriodChange = useCallback(async (periodData) => {
    console.log("Выбран период:", periodData);

    // Если период не выбран или нет дат
    if (!periodData.dates || periodData.dates.length === 0) {
      setAnalyticsData(null);
      setSelectedPeriod("");
      return;
    }

    setIsLoading(true);
    setSelectedPeriod(periodData.period);

    try {
      let startDate, endDate;

      if (periodData.type === "day") {
        // Для одного дня
        startDate = new Date(periodData.dates[0]);
        endDate = new Date(periodData.dates[0]);
        // Устанавливаем время для корректного сравнения
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
      } else if (periodData.type === "week" || periodData.type === "range") {
        // Для недели или диапазона
        if (periodData.dates.length === 2) {
          startDate = new Date(Math.min(...periodData.dates));
          endDate = new Date(Math.max(...periodData.dates));
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
        } else {
          // Если только одна дата выбрана в диапазоне
          startDate = new Date(periodData.dates[0]);
          endDate = new Date(periodData.dates[0]);
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
        }
      }

      console.log("Загружаем аналитику за период:", {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      // Загружаем аналитику за выбранный период
      const analytics = await transactionsApi.getAnalytics(startDate, endDate);
      setAnalyticsData(analytics);
    } catch (error) {
      console.error("Ошибка загрузки аналитики:", error);
      setAnalyticsData(null);
      // Здесь можно добавить уведомление об ошибке
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageTitle>Анализ расходов</PageTitle>
        <ContentWrapper>
          <CalendarContainer>
            <Calendar onPeriodChange={handlePeriodChange} />
          </CalendarContainer>
          <StatsContainer>
            <StatsDashboard
              analyticsData={analyticsData}
              period={selectedPeriod}
              isLoading={isLoading}
            />
          </StatsContainer>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
};

export default AnalyticsPage;
