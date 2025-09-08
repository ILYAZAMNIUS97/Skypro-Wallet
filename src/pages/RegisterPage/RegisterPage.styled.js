import styled from "styled-components";

export const RegisterContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const RegisterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f4f5f6;
  z-index: 0;
`;

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  z-index: 2;
  display: flex;
  align-items: center;
`;

export const LogoSection = styled.div`
  margin-left: 120px;
`;

export const LogoImage = styled.img`
  width: 143.68px;
  height: 19px;
`;

export const RegisterForm = styled.form`
  position: relative;
  width: 379px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 1;
  box-sizing: border-box;
`;

export const RegisterHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const RegisterTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.219em;
  text-align: center;
  color: #000000;
  margin: 0;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const InputField = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 0.5px solid;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100%;

  /* Состояние по умолчанию */
  border-color: #999999;
  background: transparent;

  /* Состояние успеха - светло-фиолетовый фон с темно-фиолетовой обводкой */
  ${(props) =>
    props.$isValid &&
    !props.$hasError &&
    `
    background: #F1EBFD;
    border-color: #7334EA;
  `}

  /* Состояние ошибки - светло-красный фон с темно-красной обводкой */
  ${(props) =>
    props.$hasError &&
    `
    background: #FFEBEB;
    border-color: #F25050;
  `}
  
  /* Звездочка для ошибок */
  span {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 1.219em;
    color: #f25050;
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #000000;
  background: transparent;

  &::placeholder {
    color: #999999;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: center;
  color: #f84d4d;
  background: #ffebeb;
  border: 1px solid #f25050;
  border-radius: 6px;
  padding: 12px;
  margin-top: 4px;
  box-sizing: border-box;
`;

export const FieldRequirements = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.4em;
  color: #f25050;
  margin-top: -8px;
  margin-bottom: 4px;
  padding-left: 12px;
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.219em;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-sizing: border-box;
  width: 100%;

  /* Активное состояние - фиолетовый фон с белым текстом */
  background: #7334ea;
  color: #ffffff;

  &:hover:not(:disabled) {
    background: #5f2bc4;
  }

  /* Неактивное состояние - серый фон с белым текстом */
  ${(props) =>
    props.$isDisabled &&
    `
    background: #999999;
    color: #ffffff;
    cursor: not-allowed;
    
    &:hover {
      background: #999999;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 314px;
`;

export const LoginText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: center;
  color: #999999;
`;

export const LoginLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: center;
  color: #999999;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #7334ea;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    background: #999999;
    width: 92px;
  }

  &:hover::after {
    background: #7334ea;
  }
`;
