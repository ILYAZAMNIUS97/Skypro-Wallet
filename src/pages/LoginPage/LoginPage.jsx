import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useFormValidation } from "../../hooks/useFormValidation";
import {
  LoginContainer,
  LoginBackground,
  Header,
  LogoSection,
  LogoImage,
  LoginForm,
  LoginHeader,
  LoginTitle,
  FormFields,
  InputField,
  Input,
  SubmitButton,
  RegisterSection,
  RegisterText,
  RegisterLink,
  ErrorMessage,
} from "./LoginPage.styled";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Начальные значения формы
  const initialValues = {
    login: "",
    password: "",
  };

  // Валидаторы для полей
  const validators = {
    login: validateEmail,
    password: validatePassword,
  };

  // Используем универсальный хук для валидации
  const {
    formData,
    fieldErrors,
    fieldValid,
    touched,
    showError,
    isFormValid,
    handleInputChange,
    handleInputBlur,
    validateForm,
    setShowError,
  } = useFormValidation(initialValues, validators);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setShowError(false);

    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBackground />

      <Header>
        <LogoSection>
          <LogoImage src="/images/logo.svg" alt="Skypro Wallet" />
        </LogoSection>
      </Header>

      <LoginForm onSubmit={handleSubmit}>
        <LoginHeader>
          <LoginTitle>Вход</LoginTitle>
        </LoginHeader>

        <FormFields>
          <InputField
            $hasError={fieldErrors.login && touched.login}
            $isValid={fieldValid.login && touched.login}
          >
            <Input
              type="text"
              name="login"
              placeholder="Эл. почта"
              value={formData.login}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            {fieldErrors.login && touched.login && <span>*</span>}
          </InputField>

          <InputField
            $hasError={fieldErrors.password && touched.password}
            $isValid={fieldValid.password && touched.password}
          >
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            {fieldErrors.password && touched.password && <span>*</span>}
          </InputField>

          {(showError ||
            (touched.login &&
              touched.password &&
              (!fieldValid.login || !fieldValid.password))) && (
            <ErrorMessage>
              Упс! Введенные вами данные некорректны. Введите данные корректно и
              повторите попытку.
            </ErrorMessage>
          )}
        </FormFields>

        <SubmitButton
          type="submit"
          disabled={isLoading || !isFormValid}
          $isDisabled={!isFormValid}
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </SubmitButton>

        <RegisterSection>
          <RegisterText>Нужно зарегистрироваться?</RegisterText>
          <RegisterLink as={Link} to="/register">
            Регистрируйтесь здесь
          </RegisterLink>
        </RegisterSection>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
