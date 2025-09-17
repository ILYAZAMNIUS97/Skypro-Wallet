import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants/routes";
import {
  PageWrapper,
  ExitContainer,
  ExitModal,
  ExitBlock,
  ExitTitle,
  ExitText,
  ExitButtons,
  ExitButtonYes,
  ExitButtonNo,
} from "./ExitPage.styled";

function ExitPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleExit = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <PageWrapper>
      <ExitContainer>
        <ExitModal>
          <ExitBlock>
            <ExitTitle>
              <h2>Выйти из аккаунта?</h2>
            </ExitTitle>
            <ExitText>
              <p>Вы действительно хотите выйти?</p>
            </ExitText>
            <ExitButtons>
              <ExitButtonYes onClick={handleExit}>Да, выйти</ExitButtonYes>
              <ExitButtonNo onClick={handleCancel}>Нет, остаться</ExitButtonNo>
            </ExitButtons>
          </ExitBlock>
        </ExitModal>
      </ExitContainer>
    </PageWrapper>
  );
}

export default ExitPage;
