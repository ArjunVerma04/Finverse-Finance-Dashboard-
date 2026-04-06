import { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [toast, setToast] = useState("");

  // role persistence
  const [role, setRole] = useState(
    localStorage.getItem("role") || "viewer"
  );

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  // transactions persistence
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // ADD
  const addTransaction = (tx) => {
    setTransactions((prev) => [
      ...prev,
      { ...tx, id: Date.now() },
    ]);
    setToast("Transaction added");
  };

  // DELETE
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
    setToast("Transaction deleted");
  };

  // UPDATE
  const updateTransaction = (updated) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === updated.id ? updated : t
      )
    );
    setToast("Transaction updated");
  };

  return (
    <FinanceContext.Provider
      value={{
        role,
        setRole,
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        toast,
        setToast,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);