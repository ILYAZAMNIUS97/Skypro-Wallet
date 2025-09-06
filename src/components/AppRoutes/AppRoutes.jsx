import { Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import MainPage from "../../pages/MainPage/MainPage";
import CardPage from "../../pages/CardPage/CardPage";
import NewTaskPage from "../../pages/NewTaskPage/NewTaskPage";
import ExitPage from "../../pages/ExitPage/ExitPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Защищенные маршруты */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute>
            <CardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-task"
        element={
          <ProtectedRoute>
            <NewTaskPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exit"
        element={
          <ProtectedRoute>
            <ExitPage />
          </ProtectedRoute>
        }
      />

      {/* 404 страница */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
