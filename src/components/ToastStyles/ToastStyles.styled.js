import { createGlobalStyle } from "styled-components";

// Глобальные стили для React-Toastify
export const ToastStyles = createGlobalStyle`
  .Toastify__toast-container {
    width: 320px;
    font-family: 'Roboto', sans-serif;
  }

  .Toastify__toast {
    min-height: 48px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 8px;
    font-size: 14px;
    padding: 12px 16px;
    cursor: pointer;
  }

  .Toastify__toast--success {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    border-left: 4px solid #2e7d32;
  }

  .Toastify__toast--error {
    background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
    color: white;
    border-left: 4px solid #c62828;
  }

  .Toastify__toast--warning {
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
    color: white;
    border-left: 4px solid #ef6c00;
  }

  .Toastify__toast--info {
    background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
    color: white;
    border-left: 4px solid #1565c0;
  }

  .Toastify__toast--loading {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    color: white;
    border-left: 4px solid #343a40;
  }

  .custom-toast-body {
    padding: 0;
    margin: 0;
    font-weight: 500;
    line-height: 1.4;
  }

  .Toastify__progress-bar {
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
  }

  .Toastify__progress-bar--success {
    background: rgba(255, 255, 255, 0.7);
  }

  .Toastify__progress-bar--error {
    background: rgba(255, 255, 255, 0.7);
  }

  .Toastify__progress-bar--warning {
    background: rgba(255, 255, 255, 0.7);
  }

  .Toastify__progress-bar--info {
    background: rgba(255, 255, 255, 0.7);
  }

  .Toastify__close-button {
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  .Toastify__close-button:hover {
    opacity: 1;
  }

  .Toastify__toast-icon {
    width: 20px;
    margin-right: 8px;
  }

  /* Анимации */
  .Toastify__slide-enter--top-right {
    animation-name: slideInRight;
  }

  .Toastify__slide-exit--top-right {
    animation-name: slideOutRight;
  }

  @keyframes slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(110%, 0, 0);
      opacity: 0;
    }
  }

  /* Темная тема для уведомлений */
  [data-theme="dark"] .Toastify__toast {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  [data-theme="dark"] .Toastify__toast--success {
    background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  }

  [data-theme="dark"] .Toastify__toast--error {
    background: linear-gradient(135deg, #c62828 0%, #b71c1c 100%);
  }

  [data-theme="dark"] .Toastify__toast--warning {
    background: linear-gradient(135deg, #ef6c00 0%, #e65100 100%);
  }

  [data-theme="dark"] .Toastify__toast--info {
    background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
  }

  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0 16px;
      left: 0;
      margin: 0;
    }

    .Toastify__toast {
      margin-bottom: 8px;
      border-radius: 6px;
      font-size: 13px;
      padding: 10px 14px;
    }
  }

  /* Специальные стили для канбан-доски */
  .toast-task-success .Toastify__toast-icon::before {
    content: "✓";
    font-weight: bold;
    font-size: 16px;
  }

  .toast-task-error .Toastify__toast-icon::before {
    content: "✗";
    font-weight: bold;
    font-size: 16px;
  }

  .toast-kanban-info .Toastify__toast-icon::before {
    content: "📋";
    font-size: 16px;
  }
`;
