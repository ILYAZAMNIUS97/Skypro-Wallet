import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProviders from "./contexts/AppProviders";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { GlobalStyle } from "./App.styled";
import { ToastStyles } from "./components/ToastStyles/ToastStyles.styled";

/**
 * Главный компонент приложения с роутингом
 */
const AppContent = () => {
  return (
    <>
      <GlobalStyle />
      <ToastStyles />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </>
  );
};

/**
 * Корневой компонент приложения с провайдерами контекстов
 */
function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
