import { useContext } from "react";
import { TasksContext } from "./contexts";

/**
 * Хук для использования контекста задач
 * @returns {Object} Контекст задач
 */
export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks должен использоваться внутри TasksProvider");
  }

  return context;
};
