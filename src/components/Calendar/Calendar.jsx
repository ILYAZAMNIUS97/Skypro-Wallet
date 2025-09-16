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
  PeriodModeButton,
  PeriodModeButtons,
  SelectedPeriodDisplay,
} from "./Calendar.styled";

function Calendar({ onPeriodChange }) {
  // Состояние для выбранного периода
  const [selectedDates, setSelectedDates] = useState([]);
  // Режим выбора: 'single' - один день, 'range' - диапазон
  const [selectionMode, setSelectionMode] = useState("single");
  // Состояние для выбора диапазона
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

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
    if (selectionMode === "single") {
      if (selectedDates.length === 0) return false;

      return selectedDates.some((date) => {
        return (
          date.getDate() === day &&
          date.getMonth() === monthData.month &&
          date.getFullYear() === monthData.year
        );
      });
    } else {
      // Для режима диапазона
      const currentDate = new Date(monthData.year, monthData.month, day);

      if (rangeStart && rangeEnd) {
        return currentDate >= rangeStart && currentDate <= rangeEnd;
      } else if (rangeStart) {
        return currentDate.getTime() === rangeStart.getTime();
      }

      return false;
    }
  };

  // Функция для определения является ли день в диапазоне
  const isInRange = (day, monthData) => {
    if (selectionMode !== "range" || !rangeStart || !rangeEnd) return false;

    const currentDate = new Date(monthData.year, monthData.month, day);
    return currentDate > rangeStart && currentDate < rangeEnd;
  };

  // Функция переключения режима выбора
  const handleModeChange = (mode) => {
    setSelectionMode(mode);
    setSelectedDates([]);
    setRangeStart(null);
    setRangeEnd(null);

    // Уведомляем родительский компонент об очистке
    if (onPeriodChange) {
      onPeriodChange({
        type: mode,
        dates: [],
        period: "",
      });
    }
  };

  // Обработка клика по дню
  const handleDayClick = useCallback(
    (day, monthData) => {
      const clickedDate = new Date(monthData.year, monthData.month, day);

      if (selectionMode === "single") {
        // Режим одного дня
        const newSelectedDates = [clickedDate];
        setSelectedDates(newSelectedDates);

        if (onPeriodChange) {
          const periodData = {
            type: "day",
            dates: newSelectedDates,
            period: formatPeriodText(newSelectedDates, "single"),
          };

          onPeriodChange(periodData);
        }
      } else {
        // Режим диапазона
        if (!rangeStart || (rangeStart && rangeEnd)) {
          // Начинаем новый диапазон
          setRangeStart(clickedDate);
          setRangeEnd(null);
          setSelectedDates([clickedDate]);

          if (onPeriodChange) {
            const periodData = {
              type: "range",
              dates: [clickedDate],
              period: formatPeriodText([clickedDate], "range"),
            };

            onPeriodChange(periodData);
          }
        } else {
          // Завершаем диапазон
          const startDate = rangeStart;
          const endDate = clickedDate;

          // Убеждаемся, что даты в правильном порядке
          const sortedDates = [startDate, endDate].sort((a, b) => a - b);

          setRangeStart(sortedDates[0]);
          setRangeEnd(sortedDates[1]);
          setSelectedDates(sortedDates);

          if (onPeriodChange) {
            const periodData = {
              type: "range",
              dates: sortedDates,
              period: formatPeriodText(sortedDates, "range"),
            };

            onPeriodChange(periodData);
          }
        }
      }
    },
    [onPeriodChange, selectionMode, rangeStart, rangeEnd]
  );

  // Форматирование текста периода
  const formatPeriodText = (dates, mode) => {
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

    if (mode === "single" || dates.length === 1) {
      return formatDate(dates[0]);
    } else {
      return `${formatDate(dates[0])} - ${formatDate(dates[1])}`;
    }
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
          $isInRange={isInRange(day, monthData)}
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

      {/* Кнопки переключения режима */}
      <PeriodModeButtons>
        <PeriodModeButton
          $isActive={selectionMode === "single"}
          onClick={() => handleModeChange("single")}
        >
          День
        </PeriodModeButton>
        <PeriodModeButton
          $isActive={selectionMode === "range"}
          onClick={() => handleModeChange("range")}
        >
          Период
        </PeriodModeButton>
      </PeriodModeButtons>

      {/* Отображение выбранного периода */}
      {selectedDates.length > 0 && (
        <SelectedPeriodDisplay>
          {formatPeriodText(selectedDates, selectionMode)}
        </SelectedPeriodDisplay>
      )}

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
