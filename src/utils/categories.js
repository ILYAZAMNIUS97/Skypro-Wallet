/**
 * Утилиты для работы с категориями транзакций
 */

// Полный список категорий с иконками и описанием
export const categories = [
  { id: "food", name: "Еда", icon: "/images/icons/bag-2.svg" },
  { id: "transport", name: "Транспорт", icon: "/images/icons/car.svg" },
  { id: "housing", name: "Жилье", icon: "/images/icons/house.svg" },
  {
    id: "joy",
    name: "Развлечения",
    icon: "/images/icons/gameboy.svg",
  },
  { id: "education", name: "Образование", icon: "/images/icons/teacher.svg" },
  { id: "others", name: "Другое", icon: "/images/icons/message-text.svg" },
];

/**
 * Получение русского названия категории по ID
 * @param {string} categoryId - ID категории
 * @returns {string} Русское название категории
 */
export const getCategoryDisplayName = (categoryId) => {
  const categoryDisplayNames = {
    food: "Еда",
    transport: "Транспорт",
    housing: "Жилье",
    joy: "Развлечения",
    education: "Образование",
    others: "Другое",
  };

  return categoryDisplayNames[categoryId] || categoryId || "Другое";
};
