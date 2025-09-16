import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validation";
import { useFormValidation } from "../../hooks/useFormValidation";
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
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Начальные значения формы
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  // Валидаторы для полей
  const validators = {
    name: validateName,
    email: validateEmail,
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
