import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useFinance } from "../context/FinanceContext";
import { motion } from "framer-motion";
import { useState } from "react";

const Charts = () => {
  const { transactions } = useFinance();
  const [range, setRange] = useState("all");

  if (!transactions.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No analytics data available
      </div>
    );
  }

  const filteredTransactions = transactions.filter((t) => {
    if (range === "7") {
      return new Date(t.date) >= new Date(Date.now() - 7 * 86400000);
    }
    if (range === "30") {
      return new Date(t.date) >= new Date(Date.now() - 30 * 86400000);
    }
    return true;
  });

  const lineData = filteredTransactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  const categoryData = Object.values(
    filteredTransactions.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  const comparisonData = [
    {
      name: "Income",
      value: filteredTransactions
        .filter((t) => t.type === "Income")
        .reduce((a, b) => a + b.amount, 0),
    },
    {
      name: "Expense",
      value: filteredTransactions
        .filter((t) => t.type === "Expense")
        .reduce((a, b) => a + b.amount, 0),
    },
  ];

  const COLORS = ["#5b4b8a", "#1fa4a9", "#f4b942", "#2b7a8a", "#22c55e"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Analytics Overview
        </h2>

        <select
          className="border dark:border-slate-600 
          bg-white dark:bg-slate-800 
          text-gray-700 dark:text-gray-200 
          rounded-xl px-3 py-2 w-full sm:w-auto"
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            Trend
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-3" />

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#5b4b8a"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            Category
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-3" />

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip />
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Revenue vs Expense */}
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">
          Revenue vs Expense
        </h3>
        <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-3" />

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Tooltip />
            <Pie
              data={comparisonData}
              dataKey="value"
              innerRadius={50}
              outerRadius={90}
            >
              <Cell fill="#22c55e" />
              <Cell fill="#ef4444" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Charts;
