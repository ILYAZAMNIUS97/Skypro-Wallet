import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import {
  PageContainer,
  MainContent,
  PageTitle,
  ContentWrapper,
  ExpenseTableContainer,
  ExpenseFormContainer,
} from "./TransactionsPage.styled";
import ExpenseTable from "../../components/ExpenseTable/ExpenseTable";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import Loader from "../../components/Loader/Loader";
import { transactionsApi } from "../../services/api";
import { financeNotifications } from "../../services/toastNotifications";
import { formatMoney } from "../../utils/formatMoney";

// Маппинг категорий для отображения
const categoryDisplayNames = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое",
};

/**
 * Получение русского названия категории по ID
 * @param {string} categoryId - ID категории
 * @returns {string} Русское название категории
 */
const getCategoryDisplayName = (categoryId) => {
  return categoryDisplayNames[categoryId] || categoryId || "Другое";
};

/**
 * Форматирование даты для отображения
 * @param {string} dateString - Дата в ISO формате
 * @returns {string} Дата в формате ДД.ММ.ГГГГ
 */
const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Ошибка форматирования даты:", error);
    return dateString;
  }
};

const TransactionsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка транзакций при монтировании компонента
  useEffect(() => {
    loadTransactions();
  }, []);

  /**
   * Загрузка всех транзакций пользователя
   */
  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const transactions = await transactionsApi.getTransactions();

      console.log("Все транзакции:", transactions);
      if (transactions && transactions.length > 0) {
        console.log("Пример транзакции (полная структура):", transactions[0]);
        console.log("Ключи объекта транзакции:", Object.keys(transactions[0]));
        console.log("Структура первой транзакции:", {
          id: transactions[0]._id || transactions[0].id,
          type: transactions[0].type,
          category: transactions[0].category,
          description: transactions[0].description,
          sum: transactions[0].sum,
          amount: transactions[0].amount,
          date: transactions[0].date,
          // Все остальные поля
          ...transactions[0],
        });
      }

      // Поскольку API не поддерживает поле type, считаем все транзакции расходами
      // В будущем можно добавить логику определения типа по другим критериям
      const expenseTransactions = transactions.filter((transaction) => {
        console.log(
          `Транзакция ${transaction._id || transaction.id}: тип = "${
            transaction.type
          }"`
        );
        // Пока считаем все транзакции расходами, так как форма создает только расходы
        return true;
      });

      console.log("Все транзакции как расходы:", expenseTransactions);

      const formattedExpenses = expenseTransactions
        .filter((transaction) => transaction._id || transaction.id) // Убираем записи без валидного ID
        .map((transaction) => ({
          id: transaction._id || transaction.id, // Используем только реальный ID от сервера
          description: transaction.description || "Без описания",
          category: getCategoryDisplayName(transaction.category),
          date: formatDateForDisplay(transaction.date),
          amount: formatMoney(transaction.sum || transaction.amount || 0), // Используем sum из API
          // Сохраняем исходную дату для сортировки
          originalDate: transaction.date,
        }))
        .sort((a, b) => {
          // Преобразуем даты в формат для сравнения
          const dateA = new Date(a.originalDate);
          const dateB = new Date(b.originalDate);
          return dateB - dateA; // Сортируем по убыванию (новые сверху)
        });

      console.log("Отформатированные расходы:", formattedExpenses);
      setExpenses(formattedExpenses);
    } catch (error) {
      console.error("Ошибка при загрузке транзакций:", error);
      financeNotifications.transactionError(
        "Не удалось загрузить список расходов"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Обработчик добавления новой транзакции
   * @param {Object} newTransaction - Новая транзакция от сервера
   */
  const handleTransactionAdded = (newTransaction) => {
    console.log("Добавляем новую транзакцию:", newTransaction);

    // Проверяем, что у транзакции есть правильный ID от сервера
    if (!newTransaction._id && !newTransaction.id) {
      console.error("Транзакция не имеет ID от сервера");
      // Перезагружаем все транзакции, чтобы получить корректные данные
      loadTransactions();
      return;
    }

    // Форматируем новую транзакцию для добавления в список
    const formattedTransaction = {
      id: newTransaction._id || newTransaction.id, // Используем только реальный ID от сервера
      description: newTransaction.description || "Без описания",
      category: getCategoryDisplayName(newTransaction.category),
      date: formatDateForDisplay(newTransaction.date),
      amount: formatMoney(newTransaction.sum || newTransaction.amount || 0), // Используем sum из API
      originalDate: newTransaction.date,
    };

    console.log("Отформатированная транзакция:", formattedTransaction);

    // Добавляем новую транзакцию и пересортируем весь список
    setExpenses((prevExpenses) => {
      const updatedExpenses = [formattedTransaction, ...prevExpenses];
      return updatedExpenses.sort((a, b) => {
        const dateA = new Date(a.originalDate);
        const dateB = new Date(b.originalDate);
        return dateB - dateA; // Сортируем по убыванию (новые сверху)
      });
    });
  };

  /**
   * Обработчик удаления транзакции
   * @param {string} expenseId - ID транзакции для удаления
   */
  const handleTransactionDelete = async (expenseId) => {
    try {
      // Показываем подтверждение удаления
      if (!window.confirm("Вы уверены, что хотите удалить эту транзакцию?")) {
        return;
      }

      // Удаляем на сервере
      await transactionsApi.deleteTransaction(expenseId);

      // Удаляем из локального состояния
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );

      financeNotifications.transactionDeleted();
    } catch (error) {
      console.error("Ошибка при удалении транзакции:", error);
      financeNotifications.transactionError("Не удалось удалить транзакцию");
    }
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageTitle>Мои расходы</PageTitle>
        <ContentWrapper>
          <ExpenseTableContainer>
            {isLoading ? (
              <Loader />
            ) : (
              <ExpenseTable
                expenses={expenses}
                onDelete={handleTransactionDelete}
              />
            )}
          </ExpenseTableContainer>
          <ExpenseFormContainer>
            <ExpenseForm onSubmit={handleTransactionAdded} />
          </ExpenseFormContainer>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
};

export default TransactionsPage;
