import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const AddTransactionModal = ({ onClose }) => {
  const { addTransaction } = useFinance();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "Expense",
  });

  const submit = () => {
    if (!form.date || !form.amount || !form.category) return;

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl space-y-3 w-80 shadow-xl animate-fade"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-lg">Add Transaction</h2>

        <input
          type="date"
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;