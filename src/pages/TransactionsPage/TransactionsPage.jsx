import React, { useState } from "react";
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

const TransactionsPage = () => {
  const [expenses] = useState([
    {
      id: 1,
      description: "Пятерочка",
      category: "Еда",
      date: "03.07.2024",
      amount: "3 500 ₽",
    },
    {
      id: 2,
      description: "Яндекс Такси",
      category: "Транспорт",
      date: "03.07.2024",
      amount: "730 ₽",
    },
    {
      id: 3,
      description: "Аптека Вита",
      category: "Другое",
      date: "03.07.2024",
      amount: "1 200 ₽",
    },
    {
      id: 4,
      description: "Бургер Кинг",
      category: "Еда",
      date: "03.07.2024",
      amount: "950 ₽",
    },
    {
      id: 5,
      description: "Деливери",
      category: "Еда",
      date: "02.07.2024",
      amount: "1 320 ₽",
    },
    {
      id: 6,
      description: "Кофейня №1",
      category: "Еда",
      date: "02.07.2024",
      amount: "400 ₽",
    },
    {
      id: 7,
      description: "Бильярд",
      category: "Развлечения",
      date: "29.06.2024",
      amount: "600 ₽",
    },
    {
      id: 8,
      description: "Перекресток",
      category: "Еда",
      date: "29.06.2024",
      amount: "2 360 ₽",
    },
    {
      id: 9,
      description: "Лукойл",
      category: "Транспорт",
      date: "29.06.2024",
      amount: "1 000 ₽",
    },
    {
      id: 10,
      description: "Летуаль",
      category: "Другое",
      date: "29.06.2024",
      amount: "4 300 ₽",
    },
  ]);

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageTitle>Мои расходы</PageTitle>
        <ContentWrapper>
          <ExpenseTableContainer>
            <ExpenseTable expenses={expenses} />
          </ExpenseTableContainer>
          <ExpenseFormContainer>
            <ExpenseForm />
          </ExpenseFormContainer>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
};

export default TransactionsPage;
