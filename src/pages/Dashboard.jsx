import { useFinance } from "../context/FinanceContext";
import SummaryCard from "../components/SummaryCard";
import RoleSwitcher from "../components/RoleSwitcher";
import DarkModeToggle from "../components/DarkModeToggle";
import Toast from "../components/Toast";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";
import ExportCSV from "../components/ExportCSV";
import Insights from "../components/Insights";

const Dashboard = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <Toast />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>

        <div className="flex gap-2">
          <ExportCSV />
          <RoleSwitcher />
          <DarkModeToggle />
        </div>
      </div>

      {/* Top SaaS Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          title="Current MRR"
          value="$12.4k"
          color="linear-gradient(135deg, #5b4b8a, #7c6bd6)"
        />
        <SummaryCard
          title="Current Customers"
          value="16,601"
          color="linear-gradient(135deg, #f4b942, #f59e0b)"
        />
        <SummaryCard
          title="Active Customers"
          value="33%"
          color="linear-gradient(135deg, #1fa4a9, #22c55e)"
        />
        <SummaryCard
          title="Churn Rate"
          value="2%"
          color="linear-gradient(135deg, #2b7a8a, #3b82f6)"
        />
      </div>

      {/* Finance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Balance" value={income - expense} color="blue" />
        <SummaryCard title="Income" value={income} color="green" />
        <SummaryCard title="Expenses" value={expense} color="red" />
      </div>

      <Charts />
      <Insights />
      <TransactionTable />
    </div>
  );
};

export default Dashboard;