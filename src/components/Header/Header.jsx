import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/useTheme";
import { useTasks } from "../../contexts/useTasks";
import { generalNotifications } from "../../services/toastNotifications";
import { Container } from "../../App.styled";
import {
  HeaderContainer,
  HeaderBlock,
  LogoContainer,
  HeaderNav,
  NewTaskButton,
  UserButton,
  UserPopup,
  UserName,
  UserEmail,
  ThemeContainer,
  ThemeCheckbox,
  LogoutButton,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FilterContainer,
  FilterSelect,
  ClearButton,
  SortSelect,
  ExportButton,
} from "./Header.styled";

function Header({
  onShowExitModal,
  onShowNewCardModal,
  onSearch,
  onFilter,
  onSort,
  searchQuery,
  selectedFilter,
  selectedSort,
}) {
  const { user } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { tasks } = useTasks();
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  const handleLogoutClick = () => {
    setShowUserPopup(false); // Закрываем попап пользователя
    onShowExitModal(); // Показываем модальное окно выхода
  };

  const handleNewTaskClick = () => {
    onShowNewCardModal(); // Показываем модальное окно создания задачи
  };

  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleFilterChange = (e) => {
    if (onFilter) {
      onFilter(e.target.value);
    }
  };

  const handleSortChange = (e) => {
    if (onSort) {
      onSort(e.target.value);
    }
  };

  const handleClearFilters = () => {
    if (onSearch) onSearch("");
    if (onFilter) onFilter("");
    if (onSort) onSort("");
  };

  const handleExport = () => {
    try {
      // Подготавливаем данные для экспорта
      const exportData = {
        exportDate: new Date().toISOString(),
        totalTasks: tasks.length,
        tasks: tasks.map((task) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          topic: task.topic,
          status: task.status,
          date: task.date,
          createdAt: task.createdAt || new Date().toISOString(),
        })),
        statistics: {
          completed: tasks.filter((task) => task.status === "Готово").length,
          inProgress: tasks.filter((task) => task.status === "В работе").length,
          testing: tasks.filter((task) => task.status === "Тестирование")
            .length,
          todo: tasks.filter((task) => task.status === "Нужно сделать").length,
          noStatus: tasks.filter((task) => task.status === "Без статуса")
            .length,
          categories: {
            "Web Design": tasks.filter((task) => task.topic === "Web Design")
              .length,
            Research: tasks.filter((task) => task.topic === "Research").length,
            Copywriting: tasks.filter((task) => task.topic === "Copywriting")
              .length,
          },
        },
      };

      // Создаем Blob с данными
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      // Создаем ссылку для скачивания
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `kanban_tasks_${
        new Date().toISOString().split("T")[0]
      }.json`;

      // Инициируем скачивание
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Освобождаем ресурсы
      URL.revokeObjectURL(url);

      // Показываем уведомление об успехе
      generalNotifications.loading("Экспорт задач...");
      setTimeout(() => {
        generalNotifications.dismiss();
        console.log(`Экспортировано ${tasks.length} задач в JSON файл`);
      }, 1000);
    } catch (error) {
      console.error("Ошибка при экспорте задач:", error);
      generalNotifications.validationError("Ошибка при экспорте задач");
    }
  };

  // Получаем данные пользователя или fallback значения
  const userName = user?.name || "Пользователь";
  const userEmail = user?.login || user?.email || "user@example.com";

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          <LogoContainer>
            <a href="" target="_self">
              <img
                src={isDarkTheme ? "images/logo_dark.png" : "images/logo.png"}
                alt="logo"
              />
            </a>
          </LogoContainer>

          {/* Поиск и фильтрация */}
          <SearchContainer>
            <SearchIcon $focused={isSearchFocused}>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Поиск задач..."
              value={searchQuery || ""}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </SearchContainer>

          <FilterContainer>
            <FilterSelect
              value={selectedFilter || ""}
              onChange={handleFilterChange}
            >
              <option value="">Все категории</option>
              <option value="Web Design">Web Design</option>
              <option value="Research">Research</option>
              <option value="Copywriting">Copywriting</option>
            </FilterSelect>

            <SortSelect value={selectedSort || ""} onChange={handleSortChange}>
              <option value="">Без сортировки</option>
              <option value="title">По названию</option>
              <option value="date">По дате</option>
              <option value="topic">По категории</option>
            </SortSelect>

            <ExportButton onClick={handleExport} title="Экспорт задач в JSON">
              📥 Экспорт
            </ExportButton>

            {(searchQuery || selectedFilter || selectedSort) && (
              <ClearButton onClick={handleClearFilters}>Сбросить</ClearButton>
            )}
          </FilterContainer>

          <HeaderNav>
            <NewTaskButton id="btnMainNew" onClick={handleNewTaskClick}>
              Создать новую задачу
            </NewTaskButton>
            <UserButton onClick={toggleUserPopup}>{userName}</UserButton>
            <UserPopup $isVisible={showUserPopup}>
              <UserName>{userName}</UserName>
              <UserEmail>{userEmail}</UserEmail>
              <ThemeContainer>
                <p>Темная тема</p>
                <ThemeCheckbox
                  name="checkbox"
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                />
              </ThemeContainer>
              <LogoutButton type="button" onClick={handleLogoutClick}>
                Выйти
              </LogoutButton>
            </UserPopup>
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderContainer>
  );
}

export default Header;
