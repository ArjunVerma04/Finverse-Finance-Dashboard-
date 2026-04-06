import { useEffect } from "react";
import { useFinance } from "../context/FinanceContext";

const Toast = () => {
  const { toast, setToast } = useFinance();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-xl shadow animate-fade">
      {toast}
    </div>
  );
};

export default Toast;