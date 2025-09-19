import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  LogoText,
  NavContainer,
  NavItem,
  NavLink,
  ExitButton,
} from "./Header.styled";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Определяем активную страницу
  const isExpensesActive =
    location.pathname === ROUTES.HOME ||
    location.pathname === ROUTES.TRANSACTIONS;
  const isAnalyticsActive = location.pathname === ROUTES.ANALYTICS;

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src="/images/logo.svg" alt="Skypro.Wallet" />
        <LogoText>Skypro.Wallet</LogoText>
      </LogoContainer>

      <NavContainer>
        <NavItem>
          <NavLink
            $isActive={isExpensesActive}
            onClick={() => handleNavigation(ROUTES.TRANSACTIONS)}
          >
            Мои расходы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            $isActive={isAnalyticsActive}
            onClick={() => handleNavigation(ROUTES.ANALYTICS)}
          >
            Анализ расходов
          </NavLink>
        </NavItem>
      </NavContainer>

      <ExitButton onClick={handleLogout}>Выйти</ExitButton>
    </HeaderContainer>
  );
}

export default Header;
