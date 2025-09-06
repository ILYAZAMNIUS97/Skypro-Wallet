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
} from "./RegisterPage.styled";

function RegisterPage() {
  const { register: authRegister } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  // Функция для валидации логина
  const validateLogin = (login) => {
    return login.trim().length >= 3; // Минимум 3 символа для логина
  };

  // Функция для валидации формы
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Поле имя обязательно для заполнения";
    }

    if (!login.trim()) {
      newErrors.login = "Поле логин обязательно для заполнения";
    } else if (!validateLogin(login)) {
      newErrors.login = "Логин должен содержать минимум 3 символа";
    }

    if (!password.trim()) {
      newErrors.password = "Поле пароль обязательно для заполнения";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Подтвердите пароль";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Функция для получения подсказки по полю
  const getFieldHint = (fieldName) => {
    switch (fieldName) {
      case "name":
        return !name.trim() ? "Введите ваше имя" : "";
      case "login":
        if (!login.trim()) return "Логин должен содержать минимум 3 символа";
        if (login.trim() && !validateLogin(login))
          return "Слишком короткий логин (нужно минимум 3 символа)";
        return "";
      case "password":
        if (!password.trim())
          return "Пароль должен содержать минимум 6 символов";
        if (password.trim() && password.length < 6)
          return `Пароль слишком короткий (${password.length}/6 символов)`;
        return "";
      case "confirmPassword":
        if (!confirmPassword.trim()) return "Пароли должны совпадать";
        if (confirmPassword.trim() && password !== confirmPassword)
          return "Пароли не совпадают";
        return "";
      default:
        return "";
    }
  };

  // Проверяем, валидна ли форма для активации кнопки
  const isFormValid = () => {
    return (
      name.trim() &&
      login.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      validateLogin(login) &&
      password.length >= 6 &&
      password === confirmPassword
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    if (errors.login) {
      setErrors((prev) => ({ ...prev, login: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    // Также проверяем совпадение паролей
    if (errors.confirmPassword && e.target.value === confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      generalNotifications.validationError("Заполните все поля корректно");
      return;
    }

    setIsLoading(true);
    setAuthError("");

    try {
      // Выполняем регистрацию через контекст
      await authRegister({
        name: name,
        login: login,
        password: password,
      });

      // Успешная регистрация - переходим на главную страницу
      navigate("/");
    } catch (error) {
      // Обработка ошибок регистрации
      console.error("Ошибка регистрации:", error);
      setAuthError(
        error.message || "Произошла ошибка при регистрации. Попробуйте еще раз."
      );
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
              <h2>Регистрация</h2>
            </AuthTitle>
            <AuthForm onSubmit={handleSubmit}>
              <AuthFormGroup>
                <AuthInput
                  type="text"
                  placeholder="Имя пользователя"
                  value={name}
                  onChange={handleNameChange}
                  $hasError={!!errors.name}
                  required
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                {!errors.name && getFieldHint("name") && (
                  <HelpText>{getFieldHint("name")}</HelpText>
                )}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="text"
                  placeholder="Логин (минимум 3 символа)"
                  value={login}
                  onChange={handleLoginChange}
                  $hasError={!!errors.login}
                  required
                />
                {errors.login && <ErrorMessage>{errors.login}</ErrorMessage>}
                {!errors.login && getFieldHint("login") && (
                  <HelpText>{getFieldHint("login")}</HelpText>
                )}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="password"
                  placeholder="Пароль (минимум 6 символов)"
                  value={password}
                  onChange={handlePasswordChange}
                  $hasError={!!errors.password}
                  required
                />
                {errors.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
                {!errors.password && getFieldHint("password") && (
                  <HelpText>{getFieldHint("password")}</HelpText>
                )}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  $hasError={!!errors.confirmPassword}
                  required
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
                {!errors.confirmPassword && getFieldHint("confirmPassword") && (
                  <HelpText>{getFieldHint("confirmPassword")}</HelpText>
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
                <AuthButton
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </AuthButton>
                <AuthFormP>
                  Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
                </AuthFormP>
              </AuthFormGroup2>
            </AuthForm>
          </AuthBlock>
        </AuthModal>
      </AuthContainer>
    </PageWrapper>
  );
}

export default RegisterPage;
