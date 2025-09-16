import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validation";
import {
  RegisterContainer,
  RegisterBackground,
  Header,
  LogoSection,
  LogoImage,
  RegisterForm,
  RegisterHeader,
  RegisterTitle,
  FormFields,
  InputField,
  Input,
  SubmitButton,
  LoginSection,
  LoginText,
  LoginLink,
  ErrorMessage,
  FieldRequirements,
} from "./RegisterPage.styled";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [fieldValid, setFieldValid] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [showError, setShowError] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const { register } = useAuth();
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
      case "name":
        isValid = validateName(value);
        hasError = value.length > 0 && !isValid;
        break;
      case "email":
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

    // Скрыть общую ошибку при вводе
    if (showError) {
      setShowError(false);
    }
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
      name: true,
      email: true,
      password: true,
    });

    // Проверка всех полей
    const nameValid = validateName(formData.name);
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);

    const newFieldErrors = {
      name: !nameValid,
      email: !emailValid,
      password: !passwordValid,
    };

    const newFieldValid = {
      name: nameValid,
      email: emailValid,
      password: passwordValid,
    };

    setFieldErrors(newFieldErrors);
    setFieldValid(newFieldValid);

    // Если есть ошибки, показать сообщение
    if (!nameValid || !emailValid || !passwordValid) {
      setShowError(true);
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setShowError(true);
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Проверка, активна ли кнопка
  const isFormValid =
    fieldValid.name &&
    fieldValid.email &&
    fieldValid.password &&
    formData.name &&
    formData.email &&
    formData.password;

  return (
    <RegisterContainer>
      <RegisterBackground />

      <Header>
        <LogoSection>
          <LogoImage src="/images/logo.svg" alt="Skypro Wallet" />
        </LogoSection>
      </Header>

      <RegisterForm onSubmit={handleSubmit}>
        <RegisterHeader>
          <RegisterTitle>Регистрация</RegisterTitle>
        </RegisterHeader>

        <FormFields>
          <InputField
            $hasError={fieldErrors.name && touched.name}
            $isValid={fieldValid.name && touched.name}
          >
            <Input
              type="text"
              name="name"
              placeholder="Ева Иванова"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            {fieldErrors.name && touched.name && <span>*</span>}
          </InputField>
          {touched.name && !fieldValid.name && (
            <FieldRequirements>
              Введите имя и фамилию (минимум 2 символа каждое)
            </FieldRequirements>
          )}

          <InputField
            $hasError={fieldErrors.email && touched.email}
            $isValid={fieldValid.email && touched.email}
          >
            <Input
              type="email"
              name="email"
              placeholder="ivanovaeva@mail.ru"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            {fieldErrors.email && touched.email && <span>*</span>}
          </InputField>
          {touched.email && !fieldValid.email && (
            <FieldRequirements>
              Введите корректный email адрес
            </FieldRequirements>
          )}

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
          {touched.password && !fieldValid.password && (
            <FieldRequirements>
              Пароль должен содержать минимум 6 символов
            </FieldRequirements>
          )}

          {showError && (
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
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </SubmitButton>

        <LoginSection>
          <LoginText>Уже есть аккаунт?</LoginText>
          <LoginLink as={Link} to="/login">
            Войдите здесь
          </LoginLink>
        </LoginSection>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default RegisterPage;
