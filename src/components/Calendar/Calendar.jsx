import React, { useState, useCallback } from "react";
import {
  CalendarContainer,
  CalendarTitle,
  CalendarHeader,
  CalendarDayName,
  CalendarScrollArea,
  CalendarMonthBlock,
  CalendarMonth,
  CalendarGrid,
  CalendarCell,
} from "./Calendar.styled";

function Calendar({ onPeriodChange }) {
  // Состояние для выбранного периода (убираем селекторы, оставляем только день)
  const [selectedDates, setSelectedDates] = useState([]);

  // Расширенный список месяцев для всего 2025 года
  const months = [
    {
      name: "Январь 2025",
      year: 2025,
      month: 0, // январь (0-индексированный)
    },
    {
      name: "Февраль 2025",
      year: 2025,
      month: 1, // февраль (0-индексированный)
    },
    {
      name: "Март 2025",
      year: 2025,
      month: 2, // март (0-индексированный)
    },
    {
      name: "Апрель 2025",
      year: 2025,
      month: 3, // апрель (0-индексированный)
    },
    {
      name: "Май 2025",
      year: 2025,
      month: 4, // май (0-индексированный)
    },
    {
      name: "Июнь 2025",
      year: 2025,
      month: 5, // июнь (0-индексированный)
    },
    {
      name: "Июль 2025",
      year: 2025,
      month: 6, // июль (0-индексированный)
    },
    {
      name: "Август 2025",
      year: 2025,
      month: 7, // август (0-индексированный)
    },
    {
      name: "Сентябрь 2025",
      year: 2025,
      month: 8, // сентябрь (0-индексированный)
    },
    {
      name: "Октябрь 2025",
      year: 2025,
      month: 9, // октябрь (0-индексированный)
    },
    {
      name: "Ноябрь 2025",
      year: 2025,
      month: 10, // ноябрь (0-индексированный)
    },
    {
      name: "Декабрь 2025",
      year: 2025,
      month: 11, // декабрь (0-индексированный)
    },
  ];

  // Функция для определения выбранного дня
  const isSelectedDay = (day, monthData) => {
    if (selectedDates.length === 0) return false;

    return selectedDates.some((date) => {
      return (
        date.getDate() === day &&
        date.getMonth() === monthData.month &&
        date.getFullYear() === monthData.year
      );
    });
  };

  // Обработка клика по дню
  const handleDayClick = useCallback(
    (day, monthData) => {
      const clickedDate = new Date(monthData.year, monthData.month, day);
      const newSelectedDates = [clickedDate];

      setSelectedDates(newSelectedDates);

      // Уведомляем родительский компонент об изменении
      if (onPeriodChange) {
        const periodData = {
          type: "day",
          dates: newSelectedDates,
          period: formatPeriodText(newSelectedDates),
        };

        onPeriodChange(periodData);
      }
    },
    [onPeriodChange]
  );

  // Форматирование текста периода
  const formatPeriodText = (dates) => {
    if (dates.length === 0) return "";

    const formatDate = (date) => {
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    };

    return formatDate(dates[0]);
  };

  // Генерируем дни календаря для конкретного месяца
  const generateCalendarDays = (monthData) => {
    const firstDayOfMonth = new Date(monthData.year, monthData.month, 1);
    const lastDayOfMonth = new Date(monthData.year, monthData.month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Корректируем стартовый день (понедельник = 0)
    const startingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    // Получаем дни предыдущего месяца
    const prevMonth = new Date(monthData.year, monthData.month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const days = [];

    // Дни предыдущего месяца
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(
        <CalendarCell key={`prev-${daysInPrevMonth - i}`} $isOtherMonth={true}>
          {daysInPrevMonth - i}
        </CalendarCell>
      );
    }

    // Дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <CalendarCell
          key={day}
          $isSelected={isSelectedDay(day, monthData)}
          $isOtherMonth={false}
          onClick={() => handleDayClick(day, monthData)}
        >
          {day}
        </CalendarCell>
      );
    }

    // Дни следующего месяца для заполнения сетки
    const totalCells = Math.ceil((startingDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startingDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <CalendarCell key={`next-${day}`} $isOtherMonth={true}>
          {day}
        </CalendarCell>
      );
    }

    return days;
  };

  return (
    <CalendarContainer>
      <CalendarTitle>Период</CalendarTitle>

      {/* Фиксированная шапка с днями недели */}
      <CalendarHeader>
        <CalendarDayName>пн</CalendarDayName>
        <CalendarDayName>вт</CalendarDayName>
        <CalendarDayName>ср</CalendarDayName>
        <CalendarDayName>чт</CalendarDayName>
        <CalendarDayName>пт</CalendarDayName>
        <CalendarDayName>сб</CalendarDayName>
        <CalendarDayName>вс</CalendarDayName>
      </CalendarHeader>

      {/* Прокручиваемая область с календарными месяцами */}
      <CalendarScrollArea>
        {months.map((month) => (
          <CalendarMonthBlock key={month.name}>
            <CalendarMonth>{month.name}</CalendarMonth>
            <CalendarGrid>{generateCalendarDays(month)}</CalendarGrid>
          </CalendarMonthBlock>
        ))}
      </CalendarScrollArea>
    </CalendarContainer>
  );
}

export default Calendar;
