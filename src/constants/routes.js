/**
 * Константы маршрутов для приложения Skypro-Wallet
 * Централизованное управление всеми путями для избежания дублирования
 */

// Публичные маршруты
export const PUBLIC_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
};

// Защищенные маршруты
export const PROTECTED_ROUTES = {
  HOME: "/",
  TRANSACTIONS: "/transactions",
  ANALYTICS: "/analytics",
  EXIT: "/exit",
};

// Служебные маршруты
export const SERVICE_ROUTES = {
  NOT_FOUND: "*",
};

// Объединенный объект всех маршрутов для удобства импорта
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
  ...SERVICE_ROUTES,
};

// Массив всех защищенных маршрутов для проверки
export const PROTECTED_PATHS = Object.values(PROTECTED_ROUTES);

// Массив всех публичных маршрутов для проверки
export const PUBLIC_PATHS = Object.values(PUBLIC_ROUTES);
