import { useState, useEffect } from "react";
import {
  CalendarContainer,
  CalendarTitle,
  CalendarText,
  CalendarBlock,
  CalendarMonth,
  MonthNavButton,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
  CalendarPeriod,
} from "./Calendar.styled";

function Calendar({
  selectedDate = "",
  onDateSelect,
  showPeriod = false,
  readOnly = false,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Получаем текущую дату
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Названия месяцев
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Получаем первый день месяца и количество дней в месяце
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Корректируем стартовый день (понедельник = 0)
  const startingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  // Получаем дни предыдущего месяца
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const handlePrevMonth = () => {
    if (!readOnly) {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (!readOnly) {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    }
  };

  const handleDayClick = (day) => {
    if (!readOnly) {
      setSelectedDay(day);
      const formattedDate = `${day.toString().padStart(2, "0")}.${(
        currentMonth + 1
      )
        .toString()
        .padStart(2, "0")}.${currentYear}`;
      if (onDateSelect) {
        onDateSelect(formattedDate);
      }
    }
  };

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelectedDay = (day) => {
    return selectedDay === day;
  };

  // Генерируем дни календаря
  const generateCalendarDays = () => {
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
          $isToday={isToday(day)}
          $isSelected={isSelectedDay(day)}
          $isOtherMonth={false}
          onClick={() => !readOnly && handleDayClick(day)}
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

  useEffect(() => {
    // Если selectedDate изменился извне, обновляем selectedDay и месяц календаря
    if (selectedDate) {
      const [day, month, year] = selectedDate.split(".");
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10) - 1;
      const yearNum = parseInt(year, 10);

      setSelectedDay(dayNum);
      setCurrentDate(new Date(yearNum, monthNum, 1));
    } else {
      setSelectedDay(null);
    }
  }, [selectedDate]);

  return (
    <CalendarContainer>
      <CalendarTitle>
        <CalendarText>Даты</CalendarText>
      </CalendarTitle>
      <CalendarBlock>
        <CalendarMonth>
          <span>
            {monthNames[currentMonth]} {currentYear}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <MonthNavButton
              type="button"
              onClick={handlePrevMonth}
              disabled={readOnly}
              style={{
                opacity: readOnly ? 0.5 : 1,
              }}
            >
              &#8249;
            </MonthNavButton>
            <MonthNavButton
              type="button"
              onClick={handleNextMonth}
              disabled={readOnly}
              style={{
                opacity: readOnly ? 0.5 : 1,
              }}
            >
              &#8250;
            </MonthNavButton>
          </div>
        </CalendarMonth>
        <CalendarContent>
          <CalendarDaysNames>
            <CalendarDayName>пн</CalendarDayName>
            <CalendarDayName>вт</CalendarDayName>
            <CalendarDayName>ср</CalendarDayName>
            <CalendarDayName>чт</CalendarDayName>
            <CalendarDayName>пт</CalendarDayName>
            <CalendarDayName>сб</CalendarDayName>
            <CalendarDayName>вс</CalendarDayName>
          </CalendarDaysNames>
          <CalendarCells>{generateCalendarDays()}</CalendarCells>
        </CalendarContent>

        <input type="hidden" id="datepick_value" value={selectedDate} />
        <CalendarPeriod>
          {showPeriod && selectedDate
            ? `Срок исполнения: `
            : "Выберите срок исполнения"}
          <span>{showPeriod && selectedDate ? selectedDate : ""}</span>
          {!showPeriod && "."}
        </CalendarPeriod>
      </CalendarBlock>
    </CalendarContainer>
  );
}

export default Calendar;
