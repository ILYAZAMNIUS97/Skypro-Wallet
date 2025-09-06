import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import StatsDashboard from "../../components/StatsDashboard/StatsDashboard";
import PopNewCard from "../../components/popups/PopNewCard/PopNewCard";
import PopBrowse from "../../components/popups/PopBrowse/PopBrowse";
import PopUser from "../../components/popups/PopUser/PopUser";
import { Wrapper, Container } from "../../App.styled";
import {
  ExitContainer,
  ExitModal,
  ExitBlock,
  ExitTitle,
  ExitText,
  ExitButtons,
  ExitButtonYes,
  ExitButtonNo,
} from "../ExitPage/ExitPage.styled";
import { StatsToggleButton, StatsSection } from "./MainPage.styled";

function MainPage() {
  const { logout } = useAuth();
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Состояния для поиска, фильтрации и сортировки
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  // Состояние для статистики
  const [showStats, setShowStats] = useState(() => {
    const savedState = localStorage.getItem("showStats");
    return savedState ? JSON.parse(savedState) : true;
  });

  const navigate = useNavigate();

  // Сохраняем состояние статистики в localStorage
  useEffect(() => {
    localStorage.setItem("showStats", JSON.stringify(showStats));
  }, [showStats]);

  // Закрытие модального окна по клавише Escape
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        if (showExitModal) {
          setShowExitModal(false);
        }
        if (showNewCardModal) {
          setShowNewCardModal(false);
        }
        if (showBrowseModal) {
          setShowBrowseModal(false);
          setSelectedCard(null);
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [showExitModal, showNewCardModal, showBrowseModal]);

  // Предотвращение прокрутки страницы когда модальное окно открыто
  useEffect(() => {
    if (showExitModal || showNewCardModal || showBrowseModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showExitModal, showNewCardModal, showBrowseModal]);

  const handleShowExitModal = () => {
    setShowExitModal(true);
  };

  const handleHideExitModal = () => {
    setShowExitModal(false);
  };

  const handleShowNewCardModal = () => {
    setShowNewCardModal(true);
  };

  const handleHideNewCardModal = () => {
    setShowNewCardModal(false);
  };

  const handleShowBrowseModal = (card) => {
    setSelectedCard(card);
    setShowBrowseModal(true);
  };

  const handleHideBrowseModal = () => {
    setShowBrowseModal(false);
    setSelectedCard(null);
  };

  const handleTaskCreated = () => {
    setShowNewCardModal(false);
  };

  const handleTaskUpdated = () => {
    setShowBrowseModal(false);
    setSelectedCard(null);
  };

  const handleTaskDeleted = () => {
    setShowBrowseModal(false);
    setSelectedCard(null);
  };

  const handleOverlayClick = (e) => {
    // Закрываем модальное окно только если клик был по фону, а не по самому модальному окну
    if (e.target === e.currentTarget) {
      setShowExitModal(false);
    }
  };

  const handleExit = () => {
    logout();
    navigate("/login");
  };

  // Обработчики поиска, фильтрации и сортировки
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSort = (sort) => {
    setSelectedSort(sort);
  };

  const toggleStats = () => {
    setShowStats(!showStats);
  };

  return (
    <Wrapper>
      <PopUser />
      <PopNewCard
        isVisible={showNewCardModal}
        onClose={handleHideNewCardModal}
        onTaskCreated={handleTaskCreated}
      />
      <PopBrowse
        isVisible={showBrowseModal}
        onClose={handleHideBrowseModal}
        card={selectedCard}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
      <Header
        onShowExitModal={handleShowExitModal}
        onShowNewCardModal={handleShowNewCardModal}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        selectedSort={selectedSort}
      />

      <Container>
        <StatsSection>
          <StatsToggleButton onClick={toggleStats}>
            {showStats ? "🔽 Скрыть статистику" : "▶️ Показать статистику"}
          </StatsToggleButton>
          {showStats && <StatsDashboard />}
        </StatsSection>
      </Container>

      <Main
        onCardClick={handleShowBrowseModal}
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        selectedSort={selectedSort}
      />

      {showExitModal && (
        <ExitContainer onClick={handleOverlayClick}>
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
                <ExitButtonNo onClick={handleHideExitModal}>
                  Нет, остаться
                </ExitButtonNo>
              </ExitButtons>
            </ExitBlock>
          </ExitModal>
        </ExitContainer>
      )}
    </Wrapper>
  );
}

export default MainPage;
