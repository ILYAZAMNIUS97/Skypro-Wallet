import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
  const [loginError, setLoginError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очистить ошибку при вводе
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.login || !formData.password) {
      setLoginError("Заполните все поля");
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setLoginError(
        "Неверный email или пароль. Проверьте данные и попробуйте снова."
      );
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
          <InputField>
            <Input
              type="text"
              name="login"
              placeholder="ivanovaeva@mail.ru"
              value={formData.login}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </InputField>

          <InputField>
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </InputField>

          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        </FormFields>

        <SubmitButton type="submit" disabled={isLoading}>
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
