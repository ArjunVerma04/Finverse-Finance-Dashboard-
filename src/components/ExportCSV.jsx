import { useFinance } from "../context/FinanceContext";

const ExportCSV = () => {
  const { transactions } = useFinance();

  const exportCSV = () => {
    const headers = ["Date", "Category", "Amount", "Type"];

    const rows = transactions.map((t) => [
      t.date,
      t.category,
      t.amount,
      t.type,
    ]);

    const csvContent =
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-500 text-white px-3 py-2 rounded-xl"
    >
      Export CSV
    </button>
  );
};

export default ExportCSV;