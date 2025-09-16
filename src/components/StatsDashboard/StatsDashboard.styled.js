import styled from "styled-components";

export const StatsContainer = styled.div`
  width: 789px;
  background: #ffffff;
  border-radius: 30px;
  padding: 32px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ExpenseSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 268px;
`;

export const ExpenseAmount = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.219em;
  color: #000000;
  margin: 0;
`;

export const ExpenseLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #999999;

  span {
    font-weight: 600;
    color: #999999;
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 32px;
  width: 725px;
  height: 400px;
`;

export const CategoryBar = styled.div`
  width: 94px;
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.$color};
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const CategoryLabel = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #000000;
  text-align: center;
`;

export const CategoryAmount = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.219em;
  color: #000000;
  text-align: center;
  margin-bottom: 12px;
`;

export const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #999999;
  text-align: center;
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #666666;
  text-align: center;
`;
