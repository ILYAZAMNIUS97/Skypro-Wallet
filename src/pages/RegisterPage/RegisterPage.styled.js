import styled from "styled-components";
import { Link } from "react-router-dom";
import { media, spacing } from "../../utils/breakpoints";

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
  margin-left: ${spacing.mobile.container};

  ${media.tablet} {
    margin-left: ${spacing.tablet.container};
  }

  ${media.laptop} {
    margin-left: ${spacing.laptop.container};
  }

  ${media.desktop} {
    margin-left: ${spacing.desktop.container};
  }
`;

export const LogoImage = styled.img`
  width: 100px;
  height: 13px;

  ${media.tablet} {
    width: 120px;
    height: 16px;
  }

  ${media.laptop} {
    width: 143.68px;
    height: 19px;
  }
`;

export const RegisterForm = styled.form`
  position: relative;
  width: calc(100% - 32px);
  max-width: 320px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 10px 30px -8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 1;
  box-sizing: border-box;
  margin: 0 16px;

  ${media.tablet} {
    max-width: 350px;
    border-radius: 25px;
    box-shadow: 0px 15px 50px -10px rgba(0, 0, 0, 0.12);
    padding: 24px;
    gap: 20px;
  }

  ${media.laptop} {
    width: 379px;
    max-width: 379px;
    border-radius: 30px;
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
    padding: 32px;
    gap: 24px;
    margin: 0;
  }
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
  font-size: 20px;
  line-height: 1.219em;
  text-align: center;
  color: #000000;
  margin: 0;

  ${media.tablet} {
    font-size: 22px;
  }

  ${media.laptop} {
    font-size: 24px;
  }
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  ${media.tablet} {
    gap: 11px;
  }

  ${media.laptop} {
    gap: 12px;
  }
`;

export const InputField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 0.5px solid;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100%;

  ${media.tablet} {
    gap: 11px;
    padding: 11px;
  }

  ${media.laptop} {
    gap: 12px;
    padding: 12px;
  }

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
    font-size: 10px;
    line-height: 1.219em;
    color: #f25050;

    ${media.tablet} {
      font-size: 11px;
    }

    ${media.laptop} {
      font-size: 12px;
    }
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.219em;
  color: #000000;
  background: transparent;

  ${media.tablet} {
    font-size: 11.5px;
  }

  ${media.laptop} {
    font-size: 12px;
  }

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
  font-size: 11px;
  line-height: 1.5em;
  text-align: center;
  color: #f84d4d;
  background: #ffebeb;
  border: 1px solid #f25050;
  border-radius: 6px;
  padding: 10px;
  margin-top: 4px;
  box-sizing: border-box;

  ${media.tablet} {
    font-size: 11.5px;
    padding: 11px;
  }

  ${media.laptop} {
    font-size: 12px;
    padding: 12px;
  }
`;

export const FieldRequirements = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.4em;
  color: #f25050;
  margin-top: -8px;
  margin-bottom: 4px;
  padding-left: 10px;

  ${media.tablet} {
    font-size: 10.5px;
    padding-left: 11px;
  }

  ${media.laptop} {
    font-size: 11px;
    padding-left: 12px;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 1.219em;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-sizing: border-box;
  width: 100%;

  ${media.tablet} {
    gap: 11px;
    padding: 11px;
    font-size: 11.5px;
  }

  ${media.laptop} {
    gap: 12px;
    padding: 12px;
    font-size: 12px;
  }

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
  width: 100%;

  ${media.laptop} {
    width: 314px;
  }
`;

export const LoginText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.5em;
  text-align: center;
  color: #999999;

  ${media.tablet} {
    gap: 9px;
    font-size: 11.5px;
  }

  ${media.laptop} {
    gap: 10px;
    font-size: 12px;
  }
`;

export const LoginLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.5em;
  text-align: center;
  color: #999999;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  ${media.tablet} {
    font-size: 11.5px;
  }

  ${media.laptop} {
    font-size: 12px;
  }

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
    width: 80px;

    ${media.tablet} {
      width: 86px;
    }

    ${media.laptop} {
      width: 92px;
    }
  }

  &:hover::after {
    background: #7334ea;
  }
`;

export const StyledLoginLink = styled(Link)`
  text-decoration: none;

  &:hover ${LoginLink} {
    color: #7334ea;
  }

  &:hover ${LoginLink}::after {
    background: #7334ea;
  }
`;
