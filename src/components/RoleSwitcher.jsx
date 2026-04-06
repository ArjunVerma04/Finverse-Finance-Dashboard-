import { useFinance } from "../context/FinanceContext";

const RoleSwitcher = () => {
  const { role, setRole } = useFinance();

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="border p-2 rounded-xl"
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
};

export default RoleSwitcher;