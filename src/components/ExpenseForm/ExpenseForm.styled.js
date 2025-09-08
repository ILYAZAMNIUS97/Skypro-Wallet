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

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #7334ea;
  }
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
  background: ${(props) => (props.$isSelected ? "#7334ea" : "#f4f5f6")};
  color: ${(props) => (props.$isSelected ? "#ffffff" : "#000000")};
  border: none;
  border-radius: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$isSelected ? "#7334ea" : "#e0e0e0")};
  }
`;

export const CategoryIcon = styled.span`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
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
