import { useState, useEffect } from "react";
import DarkModeToggle from "../components/DarkModeToggle";

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Arjun Verma",
          email: "arjun@example.com",
          currency: "INR",
          notifications: true,
          avatar: "",
        };
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    setPassword("");
    setConfirmPassword("");
  };

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSettings({ ...settings, avatar: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>

        <div className="flex items-center gap-4">
          <img
            src={
              settings.avatar ||
              "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"
            }
            className="w-16 h-16 rounded-full"
          />

          <input type="file" onChange={uploadAvatar} />
        </div>

        <input
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          value={settings.name}
          onChange={(e) =>
            setSettings({ ...settings, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          value={settings.email}
          onChange={(e) =>
            setSettings({ ...settings, email: e.target.value })
          }
          placeholder="Email"
        />
      </div>

      {/* Preferences */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Preferences</h2>

        <div className="flex justify-between items-center">
          <span>Currency</span>
          <select
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            value={settings.currency}
            onChange={(e) =>
              setSettings({ ...settings, currency: e.target.value })
            }
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) =>
              setSettings({
                ...settings,
                notifications: e.target.checked,
              })
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <DarkModeToggle />
        </div>
      </div>

      {/* Password */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-3">
        <h2 className="text-xl font-semibold">Change Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Save */}
      <div className="flex justify-between items-center">
        {saved && (
          <p className="text-green-600 font-medium">
            Settings saved successfully ✓
          </p>
        )}

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;