import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authApi } from "../../services/api";
import {
  authNotifications,
  generalNotifications,
} from "../../services/toastNotifications";
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
} from "./LoginPage.styled";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.login || !formData.password) {
      generalNotifications.validationError("Заполните все поля");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      login(response.user, response.user.token);
      authNotifications.loginSuccess(response.user.name || response.user.login);
      navigate("/");
    } catch (error) {
      authNotifications.loginError();
      console.error("Ошибка входа:", error);
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
              placeholder="ivanova|"
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
