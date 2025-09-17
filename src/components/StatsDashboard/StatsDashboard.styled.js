import styled from "styled-components";
import { media, spacing } from "../../utils/breakpoints";

export const StatsContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  padding: ${spacing.mobile.element};
  box-shadow: 0px 10px 30px -8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${media.tablet} {
    border-radius: 25px;
    padding: 24px;
    box-shadow: 0px 15px 50px -10px rgba(0, 0, 0, 0.12);
    gap: 20px;
  }

  ${media.laptop} {
    width: 789px;
    border-radius: 30px;
    padding: 32px;
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
    gap: 24px;
  }
`;

export const ExpenseSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  ${media.tablet} {
    gap: 10px;
    width: 300px;
  }

  ${media.laptop} {
    gap: 12px;
    width: 268px;
  }
`;

export const ExpenseAmount = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.219em;
  color: #000000;
  margin: 0;

  ${media.tablet} {
    font-size: 22px;
  }

  ${media.laptop} {
    font-size: 24px;
  }
`;

export const ExpenseLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.219em;
  color: #999999;

  ${media.tablet} {
    font-size: 11px;
  }

  ${media.laptop} {
    font-size: 12px;
  }

  span {
    font-weight: 600;
    color: #999999;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;

  ${media.laptop} {
    overflow-x: visible;
    padding-bottom: 0;
  }

  /* Стили полосы прокрутки */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 16px;
  min-width: 600px;
  height: 250px;

  ${media.tablet} {
    gap: 24px;
    min-width: 700px;
    height: 300px;
  }

  ${media.laptop} {
    gap: 32px;
    min-width: auto;
    width: 725px;
    height: 400px;
  }
`;

export const CategoryBar = styled.div`
  width: 60px;
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.$color};
  border-radius: 8px;
  margin-bottom: 8px;
  flex-shrink: 0;

  ${media.tablet} {
    width: 75px;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  ${media.laptop} {
    width: 94px;
    border-radius: 12px;
    margin-bottom: 12px;
  }
`;

export const CategoryLabel = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 9px;
  line-height: 1.219em;
  color: #000000;
  text-align: center;
  word-break: break-word;
  hyphens: auto;

  ${media.tablet} {
    font-size: 10px;
  }

  ${media.laptop} {
    font-size: 12px;
  }
`;

export const CategoryAmount = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 1.219em;
  color: #000000;
  text-align: center;
  margin-bottom: 8px;

  ${media.tablet} {
    font-size: 13px;
    margin-bottom: 10px;
  }

  ${media.laptop} {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

export const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  color: #999999;
  text-align: center;

  ${media.tablet} {
    height: 180px;
    font-size: 15px;
  }

  ${media.laptop} {
    height: 200px;
    font-size: 16px;
  }
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  color: #666666;
  text-align: center;

  ${media.tablet} {
    height: 180px;
    font-size: 15px;
  }

  ${media.laptop} {
    height: 200px;
    font-size: 16px;
  }
`;
