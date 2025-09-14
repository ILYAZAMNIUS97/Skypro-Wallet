import React from "react";
import {
  TableContainer,
  TableTitle,
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

      <TableHeader>
        <TableHeaderCell width="141px">Описание</TableHeaderCell>
        <TableHeaderCell width="120px">Категория</TableHeaderCell>
        <TableHeaderCell width="142px">Дата</TableHeaderCell>
        <TableHeaderCell width="158px">Сумма</TableHeaderCell>
        <TableHeaderCell width="50px"></TableHeaderCell>
      </TableHeader>

      <TableBody>
        {expenses.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan="5"
              style={{ textAlign: "center", padding: "20px" }}
            >
              Нет данных о расходах
            </TableCell>
          </TableRow>
        ) : (
          expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell width="141px">{expense.description}</TableCell>
              <TableCell width="120px">{expense.category}</TableCell>
              <TableCell width="142px">{expense.date}</TableCell>
              <TableCell width="158px">{expense.amount}</TableCell>
              <TableCell width="50px">
                <DeleteButton onClick={() => handleDelete(expense.id)}>
                  <DeleteIcon src="/images/icons/basket.svg" alt="Удалить" />
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableContainer>
  );
};

export default ExpenseTable;
