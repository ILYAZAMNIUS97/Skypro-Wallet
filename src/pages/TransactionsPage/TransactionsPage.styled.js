import styled from "styled-components";
import { media, spacing } from "../../utils/breakpoints";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f4f5f6;
`;

export const MainContent = styled.main`
  padding: ${spacing.mobile.section} ${spacing.mobile.container} 0;

  ${media.tablet} {
    padding: ${spacing.tablet.section} ${spacing.tablet.container} 0;
  }

  ${media.laptop} {
    padding: ${spacing.laptop.section} ${spacing.laptop.container} 0;
  }

  ${media.desktop} {
    padding: ${spacing.desktop.section} ${spacing.desktop.container} 0;
  }
`;

export const PageTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.5em;
  color: #000000;
  margin: 0 0 20px 0;

  ${media.tablet} {
    font-size: 28px;
    margin: 0 0 24px 0;
  }

  ${media.laptop} {
    font-size: 32px;
    margin: 0 0 32px 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;

  ${media.tablet} {
    gap: 24px;
  }

  ${media.laptop} {
    flex-direction: row;
    gap: 34px;
    align-items: flex-start;
  }
`;

export const ExpenseTableContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 10px 30px -8px rgba(0, 0, 0, 0.1);

  ${media.tablet} {
    border-radius: 25px;
    box-shadow: 0px 15px 50px -10px rgba(0, 0, 0, 0.12);
  }

  ${media.laptop} {
    width: 789px;
    border-radius: 30px;
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  }
`;

export const ExpenseFormContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 10px 30px -8px rgba(0, 0, 0, 0.1);

  ${media.tablet} {
    border-radius: 25px;
    box-shadow: 0px 15px 50px -10px rgba(0, 0, 0, 0.12);
  }

  ${media.laptop} {
    width: 379px;
    border-radius: 30px;
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  }
`;
