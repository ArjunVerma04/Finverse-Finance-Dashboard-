import { useFinance } from "../context/FinanceContext";

const Insights = () => {
  const { transactions } = useFinance();

  const total = transactions.reduce((a, b) => a + b.amount, 0);
  const avg = Math.round(total / transactions.length || 0);

  const highest = transactions.reduce(
    (max, t) => (t.amount > (max?.amount || 0) ? t : max),
    null
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-2">Insights</h3>

      <div className="grid md:grid-cols-3 gap-3 text-sm">
        <div>Average Transaction: ₹{avg}</div>
        <div>Highest: ₹{highest?.amount}</div>
        <div>Total Records: {transactions.length}</div>
      </div>
    </div>
  );
};

export default Insights;