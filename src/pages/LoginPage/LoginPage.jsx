import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants/routes";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useFormValidation } from "../../hooks/useFormValidation";
import { authNotifications } from "../../services/toastNotifications";
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

  // Начальные значения формы - мемоизируем чтобы избежать лишних ререндеров
  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  // Валидаторы для полей - мемоизируем для стабильности
  const validators = useMemo(
    () => ({
      email: validateEmail,
      password: validatePassword,
    }),
    []
  );

  // Сообщения об ошибках валидации
  const validationMessages = useMemo(
    () => ({
      email: "Введите корректный email адрес",
      password: "Пароль должен содержать минимум 6 символов",
    }),
    []
  );

  // Используем универсальный хук для валидации
  const {
    formData,
    fieldErrors,
    fieldValid,
    touched,
    showError,
    isFormValid,
    allErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
    setShowError,
  } = useFormValidation(initialValues, validators, validationMessages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Показываем все ошибки валидации если форма невалидна
      if (allErrors.length > 0) {
        if (allErrors.length === 1) {
          authNotifications.loginError(allErrors[0]);
        } else {
          authNotifications.loginError(
            `Исправьте следующие ошибки:\n• ${allErrors.join("\n• ")}`
          );
        }
      }
      return;
    }

    setIsLoading(true);
    setShowError(false);

    try {
      // Преобразуем email в login для API
      const loginData = {
        login: formData.email,
        password: formData.password,
      };
      await login(loginData);
      navigate(ROUTES.HOME);
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
            $hasError={fieldErrors.email && touched.email}
            $isValid={fieldValid.email && touched.email}
          >
            <Input
              type="email"
              name="email"
              placeholder="Эл. почта"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            {fieldErrors.email && touched.email && <span>*</span>}
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
            (touched.email &&
              touched.password &&
              (!fieldValid.email || !fieldValid.password))) && (
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
          <Link to={ROUTES.REGISTER}>
            <RegisterLink>Регистрируйтесь здесь</RegisterLink>
          </Link>
        </RegisterSection>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
