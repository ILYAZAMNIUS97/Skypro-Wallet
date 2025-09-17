/**
 * Breakpoints для адаптивной верстки приложения Skypro-Wallet
 */

// Основные breakpoints
export const breakpoints = {
  mobile: "320px", // Мобильные телефоны и планшеты в портретном режиме
  tablet: "769px", // Планшеты в ландшафтном режиме
  laptop: "1024px", // Ноутбуки
  desktop: "1440px", // Десктоп
};

// Media queries для styled-components
export const media = {
  mobile: `@media screen and (max-width: 768px)`, // до 768px включительно
  tablet: `@media screen and (min-width: 769px) and (max-width: 1023px)`,
  laptop: `@media screen and (min-width: 1024px) and (max-width: 1439px)`,
  desktop: `@media screen and (min-width: 1440px)`,

  // Дополнительные варианты
  mobileUp: `@media screen and (min-width: 320px)`,
  tabletUp: `@media screen and (min-width: 769px)`, // от 769px
  laptopUp: `@media screen and (min-width: 1024px)`,
  desktopUp: `@media screen and (min-width: 1440px)`,

  mobileDown: `@media screen and (max-width: 768px)`, // до 768px включительно
  tabletDown: `@media screen and (max-width: 1023px)`,
  laptopDown: `@media screen and (max-width: 1439px)`,
};

// Функция для создания media queries с custom breakpoint
export const createMediaQuery = (minWidth, maxWidth = null) => {
  if (maxWidth) {
    return `@media screen and (min-width: ${minWidth}) and (max-width: ${maxWidth})`;
  }
  return `@media screen and (min-width: ${minWidth})`;
};

// Контейнеры для разных размеров экрана
export const containerSizes = {
  mobile: "100%", // до 768px включительно
  tablet: "720px", // 769px - 1023px
  laptop: "960px", // 1024px - 1439px
  desktop: "1200px", // 1440px+
};

// Отступы для разных размеров экрана
export const spacing = {
  mobile: {
    container: "16px",
    section: "20px",
    element: "12px",
  },
  tablet: {
    container: "32px",
    section: "32px",
    element: "16px",
  },
  laptop: {
    container: "60px",
    section: "40px",
    element: "20px",
  },
  desktop: {
    container: "120px",
    section: "60px",
    element: "24px",
  },
};
