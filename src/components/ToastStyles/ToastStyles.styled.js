import { createGlobalStyle } from "styled-components";

export const ToastStyles = createGlobalStyle`
  /* Основные стили для Toast контейнера */
  .Toastify__toast-container {
    width: 320px;
    
    @media screen and (max-width: 768px) {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;
    }
  }

  /* Стили для самого Toast */
  .Toastify__toast {
    font-family: "Roboto", sans-serif;
    min-height: 64px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 8px;
    
    @media screen and (max-width: 768px) {
      margin-bottom: 0;
      border-radius: 0;
    }
  }

  /* Стили для успешных уведомлений */
  .Toastify__toast--success {
    background: linear-gradient(135deg, #06d6a0 0%, #05c296 100%);
    color: #ffffff;
    border: none;
  }

  /* Стили для ошибок */
  .Toastify__toast--error {
    background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
    color: #ffffff;
    border: none;
  }

  /* Стили для предупреждений */
  .Toastify__toast--warning {
    background: linear-gradient(135deg, #ffd23f 0%, #ffcc02 100%);
    color: #2f2f2f;
    border: none;
  }

  /* Стили для информационных сообщений */
  .Toastify__toast--info {
    background: linear-gradient(135deg, #565eef 0%, #4248d1 100%);
    color: #ffffff;
    border: none;
  }

  /* Стили для тела сообщения */
  .Toastify__toast-body {
    padding: 12px 16px;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 500;
  }

  /* Стили для кнопки закрытия */
  .Toastify__close-button {
    color: inherit;
    opacity: 0.8;
    
    &:hover {
      opacity: 1;
    }
  }

  /* Стили для прогресс-бара */
  .Toastify__progress-bar {
    height: 3px;
    
    &--success {
      background: rgba(255, 255, 255, 0.8);
    }
    
    &--error {
      background: rgba(255, 255, 255, 0.8);
    }
    
    &--warning {
      background: rgba(47, 47, 47, 0.6);
    }
    
    &--info {
      background: rgba(255, 255, 255, 0.8);
    }
  }

  /* Адаптивные стили */
  @media screen and (max-width: 768px) {
    .Toastify__toast-container--top-right {
      top: 0;
      right: 0;
    }
    
    .Toastify__toast {
      margin: 0;
      border-radius: 0;
    }
  }

  /* Анимации появления */
  @keyframes toastSlideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .Toastify__slide-enter {
    animation: toastSlideIn 0.3s ease-out;
  }
`;
