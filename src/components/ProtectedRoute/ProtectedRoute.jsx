import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants/routes";

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();

  // Если пользователь не авторизован, перенаправляем на страницу входа
  return isAuth ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

export default ProtectedRoute;
