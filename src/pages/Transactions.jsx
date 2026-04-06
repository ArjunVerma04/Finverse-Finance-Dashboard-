import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Transactions = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    date: "",
    type: "Income",
    category: "Salary",
    payment: "Cash",
    amount: "",
    description: "",
  });

  const [editing, setEditing] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const submit = () => {
    if (!form.date || !form.amount) return;

    if (editing) {
      setTransactions(
        transactions.map((t) =>
          t.id === editing
            ? { ...form, id: editing, amount: +form.amount }
            : t
        )
      );
      setEditing(null);
    } else {
      setTransactions([
        ...transactions,
        { ...form, id: Date.now(), amount: +form.amount },
      ]);
    }

    setForm({
      date: "",
      type: "Income",
      category: "Salary",
      payment: "Cash",
      amount: "",
      description: "",
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (t) => {
    setForm(t);
    setEditing(t.id);
  };

  /* Date Filter */
  const filtered = transactions.filter((t) => {
    if (!fromDate && !toDate) return true;
    const d = new Date(t.date);
    if (fromDate && d < new Date(fromDate)) return false;
    if (toDate && d > new Date(toDate)) return false;
    return true;
  });

  /* Mini Chart Data */
  const chartData = filtered.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  /* Stats */
  const income = filtered
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = filtered
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Income</p>
          <h2 className="text-xl font-bold text-green-600">₹{income}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Expense</p>
          <h2 className="text-xl font-bold text-red-500">₹{expense}</h2>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex gap-3">
        <input
          type="date"
          className="border p-2 rounded-xl"
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded-xl"
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {/* Mini Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={chartData}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <div className="grid md:grid-cols-6 gap-3">
          <input
            type="date"
            className="border p-2 rounded-xl"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            className="border p-2 rounded-xl"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>Income</option>
            <option>Expense</option>
          </select>

          <select
            className="border p-2 rounded-xl"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Salary</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
          </select>

          <select
            className="border p-2 rounded-xl"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded-xl"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <button
            onClick={submit}
            className="bg-indigo-500 text-white rounded-xl"
          >
            {editing ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Category</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.type}</td>
                <td className="p-3">{t.category}</td>
                <td className="p-3">{t.payment}</td>
                <td className="p-3">₹{t.amount}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => editTransaction(t)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;