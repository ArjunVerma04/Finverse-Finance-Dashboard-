import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const USERS = [
  { email: "admin@finverse.com", password: "1234", role: "admin" },
  { email: "viewer@finverse.com", password: "1234", role: "viewer" },
];

const Login = ({ onLogin }) => {
  const [role, setRole] = useState("viewer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("finverse-auth");
    if (saved) {
      const { role } = JSON.parse(saved);
      onLogin(role);
    }
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      return showToast("Please fill all fields");
    }

    setLoading(true);

    setTimeout(() => {
      const user = USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setLoading(false);
        return showToast("Invalid credentials");
      }

      if (remember) {
        localStorage.setItem(
          "finverse-auth",
          JSON.stringify({ role: user.role })
        );
      }

      showToast("Login successful 🎉");

      setTimeout(() => {
        onLogin(user.role);
      }, 800);

    }, 1000);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

      {/* Toast */}
      {toast && (
        <div className="
          fixed top-5 right-5
          bg-black text-white
          px-4 py-2 rounded-xl
          shadow-lg
          animate-slide
        ">
          {toast}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="
        w-96 bg-white dark:bg-gray-800
        p-8 rounded-2xl shadow-xl
        space-y-4
      "
      >
        <h2 className="text-xl font-bold text-center">
          Finverse Login
        </h2>

        <input
          placeholder="Email"
          className="w-full p-2 border rounded-xl dark:bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded-xl dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2"
          >
            👁️
          </button>
        </div>

        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>

        <button
          onClick={handleLogin}
          className="
          w-full py-2 rounded-xl
          bg-blue-600 text-white
          flex justify-center items-center
        "
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Demo users */}
        <div className="text-xs text-gray-500 pt-2">
          Demo:
          <br />
          admin@finverse.com / 1234
          <br />
          viewer@finverse.com / 1234
        </div>
      </motion.div>
    </div>
  );
};

export default Login;