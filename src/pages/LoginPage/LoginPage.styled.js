import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthModal = styled.div`
  width: 368px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.modalBackground};
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.colors.inputBorder};
  box-shadow: 0px 4px 67px -12px ${({ theme }) => theme.colors.shadow};
  padding: 40px 30px;
`;

export const AuthBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;

  h2 {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AuthFormGroup = styled.div`
  margin-bottom: 7px;
`;

export const AuthFormGroup2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthInput = styled.input`
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid
    ${(props) => (props.$hasError ? "#ff6b6b" : props.theme.colors.inputBorder)};
  outline: none;
  padding: 10px 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
    color: ${({ theme }) => theme.colors.placeholder};
  }

  &:focus {
    border-color: ${(props) =>
      props.$hasError ? "#ff6b6b" : props.theme.colors.textSecondary};
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.button};
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.buttonSecondary};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  margin-top: 4px;
  margin-left: 8px;
`;

export const HelpText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  margin-top: 4px;
  margin-left: 8px;
`;

export const AuthFormP = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;

  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.button};
  }
`;
