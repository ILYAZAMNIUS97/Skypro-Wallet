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
  ScrollIndicator,
} from "./ExpenseTable.styled";

const ExpenseTable = ({ expenses }) => {
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
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell width="141px">{expense.description}</TableCell>
            <TableCell width="120px">{expense.category}</TableCell>
            <TableCell width="142px">{expense.date}</TableCell>
            <TableCell width="158px">{expense.amount}</TableCell>
            <TableCell width="50px">
              <DeleteButton>🗑</DeleteButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <ScrollIndicator />
    </TableContainer>
  );
};

export default ExpenseTable;
