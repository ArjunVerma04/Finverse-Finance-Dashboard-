import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("Overview");
  const [role, setRole] = useState("");

  const renderPage = () => {
    switch (active) {
      case "Overview":
        return <Dashboard />;
      case "Transactions":
        return <Transactions />;
      case "Customers":
        return <Customers />;
      case "Reports":
        return <Reports />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return loggedIn ? (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Sidebar
        active={active}
        setActive={setActive}
        role={role}
        onLogout={() => {
          setLoggedIn(false);
          setRole("");
        }}
      />
      <div className="flex-1">{renderPage()}</div>
    </div>
  ) : (
    <Login
      onLogin={(userRole) => {
        setLoggedIn(true);
        setRole(userRole);
      }}
    />
  );
}

export default App;