const Sidebar = ({ active, setActive, onLogout, role }) => {
  const menu = ["Overview", "Transactions", "Customers", "Reports", "Settings"];

  return (
    <div className="w-64 bg-[#1f2147] text-white min-h-screen p-6 flex flex-col justify-between">
      
      {/* Top */}
      <div>
        <h2 className="text-2xl font-bold mb-10">Finverse</h2>

        <nav className="space-y-2">
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-3 py-2 rounded-lg transition
                ${
                  active === item
                    ? "bg-white/20"
                    : "opacity-80 hover:opacity-100 hover:bg-white/10"
                }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 pt-4">
        <div className="mb-3">
          <p className="font-semibold">Arjun Verma</p>
          <p className="text-sm opacity-70 capitalize">{role}</p>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;