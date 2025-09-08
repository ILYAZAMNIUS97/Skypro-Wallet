import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
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
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Определяем активную страницу
  const isExpensesActive =
    location.pathname === "/" || location.pathname === "/transactions";
  const isAnalyticsActive = location.pathname === "/analytics";

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
            onClick={() => handleNavigation("/transactions")}
          >
            Мои расходы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            $isActive={isAnalyticsActive}
            onClick={() => handleNavigation("/analytics")}
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
