import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { generalNotifications } from "../../services/toastNotifications";
import {
  PageWrapper,
  AuthContainer,
  AuthModal,
  AuthBlock,
  AuthTitle,
  AuthForm,
  AuthFormGroup,
  AuthInput,
  AuthButton,
  AuthFormGroup2,
  AuthFormP,
  ErrorMessage,
  HelpText,
} from "./LoginPage.styled";

function LoginPage() {
  const { login: authLogin } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const newLogin = e.target.value;
    setLogin(newLogin);

    // Валидация в реальном времени
    const newErrors = { ...errors };

    if (!newLogin.trim()) {
      newErrors.login = "Поле логин обязательно для заполнения";
    } else {
      delete newErrors.login;
    }

    setErrors(newErrors);

    // Очищаем ошибку аутентификации
    if (authError) {
      setAuthError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Валидация в реальном времени
    const newErrors = { ...errors };

    if (!newPassword.trim()) {
      newErrors.password = "Поле пароль обязательно для заполнения";
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);

    // Очищаем ошибку аутентификации
    if (authError) {
      setAuthError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Принудительная валидация при отправке формы
    const newErrors = {};

    if (!login.trim()) {
      newErrors.login = "Поле логин обязательно для заполнения";
    }

    if (!password.trim()) {
      newErrors.password = "Поле пароль обязательно для заполнения";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      generalNotifications.validationError("Заполните все обязательные поля");
      return;
    }

    setIsLoading(true);
    setAuthError("");

    try {
      // Выполняем авторизацию через контекст
      await authLogin({
        login: login,
        password: password,
      });

      // Успешная авторизация - переходим на главную страницу
      navigate("/");
    } catch (error) {
      // Обработка ошибок авторизации
      console.error("Ошибка авторизации:", error);
      setAuthError(
        error.message ||
          "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа."
      );
      setErrors({
        login: "invalid",
        password: "invalid",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <AuthContainer>
        <AuthModal>
          <AuthBlock>
            <AuthTitle>
              <h2>Вход</h2>
            </AuthTitle>
            <AuthForm onSubmit={handleSubmit}>
              <AuthFormGroup>
                <AuthInput
                  type="text"
                  placeholder="Логин (используйте: admin)"
                  value={login}
                  onChange={handleLoginChange}
                  $hasError={!!errors.login || !!authError}
                  required
                />
                {errors.login && errors.login !== "invalid" && (
                  <ErrorMessage>{errors.login}</ErrorMessage>
                )}
                {!errors.login && !authError && (
                  <HelpText>Для демо используйте логин: admin</HelpText>
                )}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="password"
                  placeholder="Пароль (используйте: admin)"
                  value={password}
                  onChange={handlePasswordChange}
                  $hasError={!!errors.password || !!authError}
                  required
                />
                {errors.password && errors.password !== "invalid" && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
                {!errors.password && !authError && (
                  <HelpText>Для демо используйте пароль: admin</HelpText>
                )}
              </AuthFormGroup>

              {authError && (
                <AuthFormGroup>
                  <ErrorMessage
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    {authError}
                  </ErrorMessage>
                </AuthFormGroup>
              )}

              <AuthFormGroup2>
                <AuthButton type="submit" disabled={isLoading}>
                  {isLoading ? "Вход..." : "Войти"}
                </AuthButton>
                <AuthFormP>
                  Нужно зарегистрироваться?{" "}
                  <Link to="/register">Регистрируйтесь здесь</Link>
                </AuthFormP>
              </AuthFormGroup2>
            </AuthForm>
          </AuthBlock>
        </AuthModal>
      </AuthContainer>
    </PageWrapper>
  );
}

export default LoginPage;
