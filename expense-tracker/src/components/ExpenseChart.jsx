import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ income, expense }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, Math.abs(expense)],
        backgroundColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    mainAspectRatio: false,
  };

  return (
    <div className="chart">
      <h3>Income vs Expense</h3>
      <Pie key={income + expense} data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
