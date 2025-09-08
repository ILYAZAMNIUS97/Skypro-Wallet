import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src="/images/logo.svg" alt="Skypro.Wallet" />
        <LogoText>Skypro.Wallet</LogoText>
      </LogoContainer>

      <NavContainer>
        <NavItem>
          <NavLink $isActive={true}>Мои расходы</NavLink>
        </NavItem>
        <NavItem>
          <NavLink $isActive={false}>Анализ расходов</NavLink>
        </NavItem>
      </NavContainer>

      <ExitButton onClick={handleLogout}>Выйти</ExitButton>
    </HeaderContainer>
  );
}

export default Header;
