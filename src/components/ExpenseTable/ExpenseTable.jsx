import React, { useState, useRef, useEffect, useCallback } from "react";
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
  ScrollThumb,
  DeleteIcon,
} from "./ExpenseTable.styled";

const ExpenseTable = ({ expenses, onDelete }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const tableBodyRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const handleDelete = (expenseId) => {
    if (onDelete) {
      onDelete(expenseId);
    }
  };

  // Обработчик скролла таблицы
  const handleTableScroll = useCallback(() => {
    if (!tableBodyRef.current || isDragging) return;

    const tableBody = tableBodyRef.current;
    const scrollTop = tableBody.scrollTop;
    const scrollHeight = tableBody.scrollHeight;
    const clientHeight = tableBody.clientHeight;

    if (scrollHeight <= clientHeight) {
      setScrollPosition(0);
      return;
    }

    const maxScroll = scrollHeight - clientHeight;
    const scrollPercent = scrollTop / maxScroll;
    setScrollPosition(scrollPercent);
  }, [isDragging]);

  // Обработчик клика на ползунок
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const startY = e.clientY;
    const startScrollPosition = scrollPosition;

    const handleMouseMove = (e) => {
      if (!scrollIndicatorRef.current || !tableBodyRef.current) return;

      const scrollIndicator = scrollIndicatorRef.current;
      const indicatorRect = scrollIndicator.getBoundingClientRect();
      const thumbHeight = 20; // высота ползунка
      const trackHeight = indicatorRect.height - thumbHeight;

      const deltaY = e.clientY - startY;
      const deltaPercent = deltaY / trackHeight;

      let newScrollPosition = startScrollPosition + deltaPercent;
      newScrollPosition = Math.max(0, Math.min(1, newScrollPosition));

      setScrollPosition(newScrollPosition);

      // Синхронизируем с таблицей
      const tableBody = tableBodyRef.current;
      const scrollHeight = tableBody.scrollHeight;
      const clientHeight = tableBody.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        tableBody.scrollTop = newScrollPosition * maxScroll;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Обработчик клика на дорожку ползунка
  const handleTrackClick = (e) => {
    if (!scrollIndicatorRef.current || !tableBodyRef.current) return;

    const scrollIndicator = scrollIndicatorRef.current;
    const rect = scrollIndicator.getBoundingClientRect();
    const thumbHeight = 20;
    const trackHeight = rect.height - thumbHeight;

    const clickY = e.clientY - rect.top - thumbHeight / 2;
    const newScrollPosition = Math.max(0, Math.min(1, clickY / trackHeight));

    setScrollPosition(newScrollPosition);

    // Синхронизируем с таблицей
    const tableBody = tableBodyRef.current;
    const scrollHeight = tableBody.scrollHeight;
    const clientHeight = tableBody.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 0) {
      tableBody.scrollTop = newScrollPosition * maxScroll;
    }
  };

  // Проверяем, нужен ли скролл
  const isScrollNeeded = () => {
    if (!tableBodyRef.current) return false;
    const tableBody = tableBodyRef.current;
    return tableBody.scrollHeight > tableBody.clientHeight;
  };

  useEffect(() => {
    const tableBody = tableBodyRef.current;
    if (tableBody) {
      tableBody.addEventListener("scroll", handleTableScroll);
      return () => tableBody.removeEventListener("scroll", handleTableScroll);
    }
  }, [handleTableScroll]);

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

      <TableBody ref={tableBodyRef}>
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

      {isScrollNeeded() && (
        <ScrollIndicator ref={scrollIndicatorRef} onClick={handleTrackClick}>
          <ScrollThumb
            scrollPosition={scrollPosition}
            onMouseDown={handleThumbMouseDown}
          />
        </ScrollIndicator>
      )}
    </TableContainer>
  );
};

export default ExpenseTable;
