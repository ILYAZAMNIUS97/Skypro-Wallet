import styled from "styled-components";

// Секция статистики
export const StatsSection = styled.div`
  margin: 20px 0;
`;

// Кнопка переключения статистики
export const StatsToggleButton = styled.button`
  background: ${(props) => props.theme.colors.cardBackground};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${(props) => props.theme.colors.button};
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    justify-content: center;
  }
`;
