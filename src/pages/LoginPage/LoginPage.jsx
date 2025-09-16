import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validation";
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
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    login: false,
    password: false,
  });
  const [fieldValid, setFieldValid] = useState({
    login: false,
    password: false,
  });
  const [showError, setShowError] = useState(false);
  const [touched, setTouched] = useState({
    login: false,
    password: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Валидация в реальном времени
    let isValid = false;
    let hasError = false;

    switch (name) {
      case "login":
        isValid = validateEmail(value);
        hasError = value.length > 0 && !isValid;
        break;
      case "password":
        isValid = validatePassword(value);
        hasError = value.length > 0 && !isValid;
        break;
    }

    setFieldValid((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: hasError,
    }));

    // Не скрываем ошибку при вводе - только при успешной валидации всех полей
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Отметить все поля как touched
    setTouched({
      login: true,
      password: true,
    });

    // Проверка всех полей
    const loginValid = validateEmail(formData.login);
    const passwordValid = validatePassword(formData.password);

    const newFieldErrors = {
      login: !loginValid,
      password: !passwordValid,
    };

    const newFieldValid = {
      login: loginValid,
      password: passwordValid,
    };

    setFieldErrors(newFieldErrors);
    setFieldValid(newFieldValid);

    // Если есть ошибки или пустые поля, показать сообщение
    if (
      !loginValid ||
      !passwordValid ||
      !formData.login.trim() ||
      !formData.password.trim()
    ) {
      setShowError(true);
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

  // Проверка, активна ли кнопка
  const isFormValid =
    fieldValid.login &&
    fieldValid.password &&
    formData.login &&
    formData.password;

  // Скрыть ошибку когда форма становится валидной
  useEffect(() => {
    if (showError && isFormValid) {
      setShowError(false);
    }
  }, [showError, isFormValid]);

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
