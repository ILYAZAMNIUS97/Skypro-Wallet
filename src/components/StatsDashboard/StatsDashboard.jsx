import {
  StatsContainer,
  ExpenseSummary,
  ExpenseAmount,
  ExpenseLabel,
  ChartContainer,
  CategoryBar,
  CategoryLabel,
  CategoryAmount,
} from "./StatsDashboard.styled";

const StatsDashboard = () => {
  // Данные из макета Figma
  const totalExpenses = "9 581 ₽";
  const expenseDate = "10 июля 2024";

  const categories = [
    { name: "Еда", amount: "3 590 ₽", color: "#D9B6FF", height: 328 },
    { name: "Транспорт", amount: "1 835 ₽", color: "#FFB53D", height: 169 },
    { name: "Жилье", amount: "0 ₽", color: "#6EE4FE", height: 4 },
    { name: "Развлечения", amount: "1 250 ₽", color: "#B0AEFF", height: 109 },
    { name: "Образование", amount: "600 ₽", color: "#BCEC30", height: 65 },
    { name: "Другое", amount: "2 306 ₽", color: "#FFB9B8", height: 212 },
  ];

  return (
    <StatsContainer>
      <ExpenseSummary>
        <ExpenseAmount>{totalExpenses}</ExpenseAmount>
        <ExpenseLabel>
          Расходы за <span>{expenseDate}</span>
        </ExpenseLabel>
      </ExpenseSummary>

      <ChartContainer>
        {categories.map((category) => (
          <div key={category.name}>
            <CategoryAmount>{category.amount}</CategoryAmount>
            <CategoryBar $color={category.color} $height={category.height} />
            <CategoryLabel>{category.name}</CategoryLabel>
          </div>
        ))}
      </ChartContainer>
    </StatsContainer>
  );
};

export default StatsDashboard;
