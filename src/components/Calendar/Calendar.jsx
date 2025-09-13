import {
  CalendarContainer,
  CalendarTitle,
  CalendarBlock,
  CalendarMonth,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
} from "./Calendar.styled";

function Calendar() {
  // Фиксированная дата из макета - июль и август 2024
  const currentMonthIndex = 0;

  const months = [
    {
      name: "Июль 2024",
      year: 2024,
      month: 6, // июль (0-индексированный)
      selectedDay: 10,
    },
    {
      name: "Август 2024",
      year: 2024,
      month: 7, // август (0-индексированный)
      selectedDay: null,
    },
  ];

  const currentMonth = months[currentMonthIndex];

  // Получаем первый день месяца и количество дней в месяце
  const firstDayOfMonth = new Date(currentMonth.year, currentMonth.month, 1);
  const lastDayOfMonth = new Date(currentMonth.year, currentMonth.month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Корректируем стартовый день (понедельник = 0)
  const startingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  // Получаем дни предыдущего месяца
  const prevMonth = new Date(currentMonth.year, currentMonth.month - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const isSelectedDay = (day) => {
    return currentMonth.selectedDay === day;
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
          $isSelected={isSelectedDay(day)}
          $isOtherMonth={false}
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
      <CalendarBlock>
        {months.map((month, index) => (
          <div key={month.name}>
            <CalendarMonth>
              <span>{month.name}</span>
            </CalendarMonth>
            {index === currentMonthIndex && (
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
            )}
          </div>
        ))}
      </CalendarBlock>
    </CalendarContainer>
  );
}

export default Calendar;
