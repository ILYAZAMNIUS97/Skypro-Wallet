import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../Loader/Loader";

function ProtectedRoute({ children }) {
  const { isAuth, isLoading } = useAuth();

  // Показываем загрузку пока проверяется авторизация
  if (isLoading) {
    return <Loader text="Проверка авторизации..." />;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
