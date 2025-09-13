import styled from "styled-components";

export const FormContainer = styled.div`
  padding: 32px;
  height: 618px;
`;

export const FormTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.219em;
  color: #000000;
  margin: 0 0 24px 0;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const FieldLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.219em;
  color: #000000;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 0.5px solid #999999;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #000000;
  background: #ffffff;
  box-sizing: border-box;
  transition: all 0.2s ease;

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
  right: 12px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #999999;
  pointer-events: none;
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
  width: 277px;
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  background: ${(props) => (props.$isSelected ? "#F1EBFD" : "#f4f5f6")};
  color: ${(props) => (props.$isSelected ? "#7334EA" : "#000000")};
  border: none;
  border-radius: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  cursor: pointer;
  transition: all 0.2s ease;

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
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
  transition: filter 0.2s ease;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #7334ea;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.219em;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #5f2bc4;
  }

  &:active {
    background: #4a1f9a;
  }
`;
