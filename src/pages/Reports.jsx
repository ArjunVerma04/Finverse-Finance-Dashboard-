import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [range, setRange] = useState("30");

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  /* Date Filter */
  const filtered = transactions.filter((t) => {
    if (range === "7")
      return new Date(t.date) >= new Date(Date.now() - 7 * 86400000);
    if (range === "30")
      return new Date(t.date) >= new Date(Date.now() - 30 * 86400000);
    return true;
  });

  /* Stats */
  const revenue = filtered
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = filtered
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  const profit = revenue - expense;

  /* Chart Data */
  const trendData = filtered.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  const categoryData = Object.values(
    filtered.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || {
        name: t.category,
        value: 0,
      };
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  const COLORS = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>

        <select
          className="border p-2 rounded-xl"
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-xl font-bold text-green-600">₹{revenue}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-gray-500">Expense</p>
          <h2 className="text-xl font-bold text-red-500">₹{expense}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-gray-500">Profit</p>
          <h2 className="text-xl font-bold">₹{profit}</h2>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">Revenue Trend</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">Category Breakdown</h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip />
            <Pie data={categoryData} dataKey="value" outerRadius={90}>
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;