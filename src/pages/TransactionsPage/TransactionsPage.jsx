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
import { getCategoryDisplayName } from "../../utils/categories";
import { formatDateForDisplay } from "../../utils/dateUtils";

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

      // Форматируем транзакции для отображения
      const formattedExpenses = transactions
        .filter((transaction) => transaction._id || transaction.id) // Только транзакции с валидным ID
        .map((transaction) => ({
          id: transaction._id || transaction.id,
          description: transaction.description || "Без описания",
          category: getCategoryDisplayName(transaction.category),
          date: formatDateForDisplay(transaction.date),
          amount: formatMoney(transaction.sum || transaction.amount || 0),
          originalDate: transaction.date,
        }))
        .sort((a, b) => new Date(b.originalDate) - new Date(a.originalDate)); // Новые сверху

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
    // Проверяем валидность транзакции
    if (!newTransaction._id && !newTransaction.id) {
      console.error("Транзакция не имеет ID от сервера");
      loadTransactions(); // Перезагружаем список
      return;
    }

    // Форматируем и добавляем новую транзакцию
    const formattedTransaction = {
      id: newTransaction._id || newTransaction.id,
      description: newTransaction.description || "Без описания",
      category: getCategoryDisplayName(newTransaction.category),
      date: formatDateForDisplay(newTransaction.date),
      amount: formatMoney(newTransaction.sum || newTransaction.amount || 0),
      originalDate: newTransaction.date,
    };

    // Добавляем в начало списка (новые сверху)
    setExpenses((prevExpenses) =>
      [formattedTransaction, ...prevExpenses].sort(
        (a, b) => new Date(b.originalDate) - new Date(a.originalDate)
      )
    );
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
