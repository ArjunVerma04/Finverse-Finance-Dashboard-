import { useState, useEffect } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ name: "", email: "", status: "Active" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const submit = () => {
    if (!form.name || !form.email) return;

    if (editing) {
      setCustomers(
        customers.map((c) => (c.id === editing ? { ...form, id: editing } : c))
      );
      setEditing(null);
    } else {
      setCustomers([...customers, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", email: "", status: "Active" });
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  const editCustomer = (c) => {
    setForm(c);
    setEditing(c.id);
  };

  /* ------------------ CSV Export ------------------ */
  const exportCSV = () => {
    const headers = ["Name", "Email", "Status"];
    const rows = customers.map((c) => [c.name, c.email, c.status]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "customers.csv";
    link.click();
  };

  /* ------------------ Stats ------------------ */
  const total = customers.length;
  const active = customers.filter((c) => c.status === "Active").length;
  const inactive = customers.filter((c) => c.status === "Inactive").length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Customers</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Customers</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Active</p>
          <h2 className="text-2xl font-bold text-green-600">{active}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Inactive</p>
          <h2 className="text-2xl font-bold text-red-500">{inactive}</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <div className="grid md:grid-cols-4 gap-3">
          <input
            placeholder="Name"
            className="border p-2 rounded-xl"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="border p-2 rounded-xl"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="border p-2 rounded-xl"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            onClick={submit}
            className="bg-indigo-500 text-white rounded-xl"
          >
            {editing ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={exportCSV}
          className="bg-green-500 text-white px-4 py-2 rounded-xl"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>

                <td
                  className={`p-3 font-semibold ${
                    c.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {c.status}
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => editCustomer(c)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCustomer(c.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>

                  <a
                    href={`mailto:${c.email}`}
                    className="bg-purple-500 text-white px-2 py-1 rounded-lg"
                  >
                    Email
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;