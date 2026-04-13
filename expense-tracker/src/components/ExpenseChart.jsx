import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ income, expense }) => {
  const categoryColors = {
    food: "#ff6384",
    transport: "#36a2eb",
    salary: "#4caf50",
    utilities: "#9966ff",
    general: "#00c49f",
    shopping: "#ff9f40",
    transport: "#f3ef07",
  };

  const categoryTotals = {};

  transactions.forEach((tx) => {
    if (!categoryTotals[tx.category]) {
      categoryTotals[tx.category] = 0;
    }
    categoryTotals[tx.category] += Maths.abs(tx.amount);
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map(
          (cat) => categoryColors[cat] || "#888",
        ),
      },
    ],
  };

  const typeTotals = {
    income: 0,
    expense: 0,
  };

  transactions.forEach((tx) => {
    if (tx.amount > 0) typeTotals.income += tx.amount;
    else typeTotals.expense += Math.abs(tx.amount);
  });

  const typeData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [typeTotals.income, typeTotals.expense],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    mainAspectRatio: false,
  };

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Income vs Expense</h3>
        <Pie data={typeData} />
      </div>

      <div className="chart">
        <h3>Spensing by Category</h3>
        <Pie data={data} />
      </div>

      <div className="chart">
        <h3>Category Breakdown</h3>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default ExpenseChart;
