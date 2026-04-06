import { useFinance } from "../context/FinanceContext";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import EditTransactionModal from "./EditTransactionModal";
import { motion, AnimatePresence } from "framer-motion";

const TransactionTable = () => {
  const { transactions, deleteTransaction, role } = useFinance();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const filtered = transactions.filter(
    (t) =>
      t.category.toLowerCase().includes(search.toLowerCase()) &&
      (type === "all" || t.type === type)
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow"
    >
      {/* Filters */}
      <div className="flex justify-between mb-3">
        <div className="flex gap-2">
          <input
            placeholder="Search category..."
            className="border p-2 rounded-xl dark:bg-gray-700"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded-xl dark:bg-gray-700"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {role === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdd(true)}
            className="bg-blue-500 text-white px-3 py-2 rounded-xl"
          >
            + Add
          </motion.button>
        )}
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {filtered.map((t) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.01 }}
                className="border-t hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td>{t.date}</td>
                <td>{t.category}</td>

                <td
                  className={
                    t.type === "Income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  ₹{t.amount}
                </td>

                <td>{t.type}</td>

                {role === "admin" && (
                  <td className="space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-blue-500"
                      onClick={() => setEditTx(t)}
                    >
                      Edit
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-red-500"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </motion.button>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Modals */}
      <AnimatePresence>
        {showAdd && (
          <AddTransactionModal onClose={() => setShowAdd(false)} />
        )}

        {editTx && (
          <EditTransactionModal
            data={editTx}
            onClose={() => setEditTx(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TransactionTable;