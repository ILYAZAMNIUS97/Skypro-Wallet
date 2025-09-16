import React, { useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar";
import StatsDashboard from "../../components/StatsDashboard/StatsDashboard";
import { transactionsApi } from "../../services/api";
import { getDateRangeFromPeriod } from "../../utils/dateUtils";
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
    // Если период не выбран или нет дат
    if (!periodData.dates || periodData.dates.length === 0) {
      setAnalyticsData(null);
      setSelectedPeriod("");
      return;
    }

    setIsLoading(true);
    setSelectedPeriod(periodData.period);

    try {
      // Используем утилиту для получения диапазона дат
      const { startDate, endDate } = getDateRangeFromPeriod(periodData);

      if (!startDate || !endDate) {
        console.error("Не удалось определить диапазон дат");
        setAnalyticsData(null);
        return;
      }

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
