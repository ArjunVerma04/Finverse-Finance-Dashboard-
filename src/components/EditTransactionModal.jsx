import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const EditTransactionModal = ({ data, onClose }) => {
  const { updateTransaction } = useFinance();
  const [form, setForm] = useState(data);

  const save = () => {
    if (!form.date || !form.amount || !form.category) return;

    updateTransaction({
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
        <h2 className="font-bold text-lg">Edit Transaction</h2>

        <input
          type="date"
          value={form.date}
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="number"
          value={form.amount}
          placeholder="Amount"
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          value={form.category}
          placeholder="Category"
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select
          value={form.type}
          className="border p-2 w-full rounded-xl dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;