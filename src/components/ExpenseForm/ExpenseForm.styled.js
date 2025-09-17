import styled from "styled-components";
import { media, spacing } from "../../utils/breakpoints";

export const FormContainer = styled.div`
  padding: ${spacing.mobile.element};
  height: auto;
  min-height: 400px;

  ${media.tablet} {
    padding: 24px;
    min-height: 500px;
  }

  ${media.laptop} {
    padding: 32px;
    height: 618px;
    min-height: 618px;
  }
`;

export const FormTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.219em;
  color: #000000;
  margin: 0 0 16px 0;

  ${media.tablet} {
    font-size: 20px;
    margin: 0 0 20px 0;
  }

  ${media.laptop} {
    font-size: 24px;
    margin: 0 0 24px 0;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;

  ${media.tablet} {
    gap: 14px;
    margin-bottom: 22px;
  }

  ${media.laptop} {
    gap: 16px;
    margin-bottom: 24px;
  }
`;

export const FieldLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.219em;
  color: #000000;

  ${media.tablet} {
    font-size: 15px;
  }

  ${media.laptop} {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 0.5px solid #999999;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.219em;
  color: #000000;
  background: #ffffff;
  box-sizing: border-box;
  transition: all 0.2s ease;

  ${media.tablet} {
    padding: 11px;
    font-size: 11.5px;
  }

  ${media.laptop} {
    padding: 12px;
    font-size: 12px;
  }

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #7334ea;
    background: #f1ebfd;
  }
`;

export const AmountInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const AmountInput = styled(Input)`
  padding-right: 40px;
`;

export const CurrencyLabel = styled.span`
  position: absolute;
  right: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.219em;
  color: #999999;
  pointer-events: none;

  ${media.tablet} {
    right: 11px;
    font-size: 11.5px;
  }

  ${media.laptop} {
    right: 12px;
    font-size: 12px;
  }
`;

export const DateInput = styled(Input)`
  /* Принудительные стили для поля даты */
  &[type="date"] {
    color-scheme: light;

    /* Состояние фокуса */
    &:focus {
      background: #f1ebfd !important;
      border-color: #7334ea !important;
    }
  }

  /* Состояние с заполненным значением - управляется через пропс */
  ${(props) =>
    props.$hasValue &&
    `
    background: #f1ebfd !important;
    border-color: #7334ea !important;
  `}
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  max-width: 100%;

  ${media.tablet} {
    max-width: 350px;
  }

  ${media.laptop} {
    max-width: 277px;
    width: 277px;
  }
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: ${(props) => (props.$isSelected ? "#F1EBFD" : "#f4f5f6")};
  color: ${(props) => (props.$isSelected ? "#7334EA" : "#000000")};
  border: none;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.219em;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${media.tablet} {
    gap: 9px;
    padding: 7px 18px;
    border-radius: 25px;
    font-size: 11px;
  }

  ${media.laptop} {
    gap: 10px;
    padding: 8px 20px;
    border-radius: 30px;
    font-size: 12px;
  }

  &:hover {
    background: ${(props) => (props.$isSelected ? "#F1EBFD" : "#e0e0e0")};
  }

  img {
    filter: ${(props) =>
      props.$isSelected
        ? "brightness(0) saturate(100%) invert(31%) sepia(85%) saturate(3438%) hue-rotate(253deg) brightness(97%) contrast(94%)"
        : "none"};
  }
`;

export const CategoryIcon = styled.img`
  width: 12px;
  height: 12px;
  object-fit: contain;
  flex-shrink: 0;
  transition: filter 0.2s ease;

  ${media.tablet} {
    width: 13px;
    height: 13px;
  }

  ${media.laptop} {
    width: 14px;
    height: 14px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #7334ea;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 1.219em;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${media.tablet} {
    padding: 11px;
    font-size: 11.5px;
  }

  ${media.laptop} {
    padding: 12px;
    font-size: 12px;
  }

  &:hover {
    background: #5f2bc4;
  }

  &:active {
    background: #4a1f9a;
  }
`;
