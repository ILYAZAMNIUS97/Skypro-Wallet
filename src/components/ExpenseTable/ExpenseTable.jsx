import React from "react";
import {
  TableContainer,
  TableTitle,
  TableWrapper,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  DeleteButton,
  DeleteIcon,
} from "./ExpenseTable.styled";

const ExpenseTable = ({ expenses, onDelete }) => {
  const handleDelete = (expenseId) => {
    if (onDelete) {
      onDelete(expenseId);
    }
  };

  return (
    <TableContainer>
      <TableTitle>Таблица расходов</TableTitle>

      <TableWrapper>
        <TableHeader>
          <TableHeaderCell width="120px">Описание</TableHeaderCell>
          <TableHeaderCell width="110px">Категория</TableHeaderCell>
          <TableHeaderCell width="120px">Дата</TableHeaderCell>
          <TableHeaderCell width="100px">Сумма</TableHeaderCell>
          <TableHeaderCell width="50px"></TableHeaderCell>
        </TableHeader>

        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan="5"
                style={{ textAlign: "center", padding: "20px", width: "100%" }}
              >
                Нет данных о расходах
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell width="120px">{expense.description}</TableCell>
                <TableCell width="110px">{expense.category}</TableCell>
                <TableCell width="120px">{expense.date}</TableCell>
                <TableCell width="100px">{expense.amount}</TableCell>
                <TableCell width="50px">
                  <DeleteButton onClick={() => handleDelete(expense.id)}>
                    <DeleteIcon src="/images/icons/basket.svg" alt="Удалить" />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableWrapper>
    </TableContainer>
  );
};

export default ExpenseTable;
