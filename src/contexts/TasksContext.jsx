import { useState, useCallback } from "react";
import { tasksApi } from "../services/api";
import { TasksContext } from "./contexts";

/**
 * Провайдер контекста задач
 */
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Загрузка всех задач
   */
  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const tasksData = await tasksApi.getTasks();
      setTasks(tasksData);
    } catch (err) {
      setError(err.message || "Ошибка при загрузке задач");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Создание новой задачи
   * @param {Object} taskData - Данные новой задачи
   * @returns {Promise} Результат создания
   */
  const createTask = useCallback(async (taskData) => {
    try {
      setIsLoading(true);
      setError("");
      const updatedTasks = await tasksApi.createTask(taskData);
      setTasks(updatedTasks);
      return updatedTasks;
    } catch (err) {
      setError(err.message || "Ошибка при создании задачи");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Обновление задачи
   * @param {string|number} id - ID задачи
   * @param {Object} taskData - Новые данные задачи
   * @returns {Promise} Результат обновления
   */
  const updateTask = useCallback(async (id, taskData) => {
    try {
      setIsLoading(true);
      setError("");
      const updatedTasks = await tasksApi.updateTask(id, taskData);
      setTasks(updatedTasks);
      return updatedTasks;
    } catch (err) {
      setError(err.message || "Ошибка при обновлении задачи");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Удаление задачи
   * @param {string|number} id - ID задачи
   * @returns {Promise} Результат удаления
   */
  const deleteTask = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError("");
      const updatedTasks = await tasksApi.deleteTask(id);
      setTasks(updatedTasks);
      return updatedTasks;
    } catch (err) {
      setError(err.message || "Ошибка при удалении задачи");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Получение задачи по ID
   * @param {string|number} id - ID задачи
   * @returns {Promise} Данные задачи
   */
  const getTask = useCallback(async (id) => {
    try {
      setError("");
      const task = await tasksApi.getTask(id);
      return task;
    } catch (err) {
      setError(err.message || "Ошибка при получении задачи");
      throw err;
    }
  }, []);

  /**
   * Группировка задач по статусам
   * @returns {Array} Массив колонок с задачами
   */
  const getGroupedTasks = useCallback(() => {
    const statuses = [
      "Без статуса",
      "Нужно сделать",
      "В работе",
      "Тестирование",
      "Готово",
    ];

    return statuses.map((status) => ({
      title: status,
      cards: tasks.filter((task) => task.status === status),
    }));
  }, [tasks]);

  /**
   * Очистка ошибок
   */
  const clearError = useCallback(() => {
    setError("");
  }, []);

  // Значения контекста
  const value = {
    tasks,
    isLoading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask,
    getGroupedTasks,
    clearError,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
