import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {
  PageWrapper,
  NotFoundContainer,
  NotFoundModal,
  NotFoundContent,
  NotFoundTitle,
  NotFoundSubtitle,
  NotFoundText,
  NotFoundButton,
} from "./NotFoundPage.styled";

function NotFoundPage() {
  return (
    <PageWrapper>
      <NotFoundContainer>
        <NotFoundModal>
          <NotFoundContent>
            <NotFoundTitle>404</NotFoundTitle>
            <NotFoundSubtitle>Страница не найдена</NotFoundSubtitle>
            <NotFoundText>
              Упс! Похоже, вы попали на страницу, которой не существует.
            </NotFoundText>
            <NotFoundButton as={Link} to={ROUTES.HOME}>
              Вернуться на главную
            </NotFoundButton>
          </NotFoundContent>
        </NotFoundModal>
      </NotFoundContainer>
    </PageWrapper>
  );
}

export default NotFoundPage;
