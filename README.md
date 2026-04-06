# Finverse – Finance Dashboard 💰

<p align="center">
  <img src="./public/finVerse.svg" alt="Finverse Logo" width="150"/>
</p>

**Track. Analyze. Optimize.**
Finverse is a modern, interactive, responsive finance dashboard built with **React, Tailwind CSS & Recharts**, designed to help users **visualize their financial health at a glance**.

https://finverse-finance-dashboard.onrender.com

---

## 🛠️ Tech Stack

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.3-blue?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-4.4-purple?style=for-the-badge&logo=vite&logoColor=white" /></a>
  <a href="https://recharts.org/"><img src="https://img.shields.io/badge/Recharts-2.6-orange?style=for-the-badge" /></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/FramerMotion-6.6-pink?style=for-the-badge" /></a>
</p>

---

## ✨ Features

| Feature                       | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| **Dashboard Overview** 📊     | Quick glance at balance, income, expenses, and insights.              |
| **Transaction Management** 💳 | Add, edit, delete, view transactions, and export CSV.                 |
| **Charts & Analytics** 📈     | Line charts, category-wise pie charts, revenue vs expense comparison. |
| **Role-Based Access** 🔐      | Admin & Viewer roles with separate permissions.                       |
| **Authentication** 🧾         | Fake login, validation, remember me, auto-login using localStorage.   |
| **Responsive Design** 📱      | Fully responsive on mobile, tablet, and desktop.                      |
| **Dark & Light Mode** 🌗      | Smooth theme toggle with Framer Motion animations.                    |
| **Interactive UI** ✨          | Toast notifications, loading spinners, animated entrances.            |

---

## 💻 Demo Users

| Email                                             | Password | Role   |
| ------------------------------------------------- | -------- | ------ |
| [admin@finverse.com](mailto:admin@finverse.com)   | 1234     | Admin  |
| [viewer@finverse.com](mailto:viewer@finverse.com) | 1234     | Viewer |

---

## 📸 Live Demo & GIFs

### Dashboard Overview

![Dashboard Demo](./gifs/dashboard-demo.gif)
*Real-time updates of income, expenses, and balance.*

### Charts & Analytics

![Charts Demo](./gifs/charts-demo.gif)
*Interactive charts showing trends and categories.*

### Transaction Management

![Transaction Demo](./gifs/transaction-demo.gif)
*Add, edit, delete transactions with smooth animations.*

---

## 📂 Project Structure

```bash
finverse/
├─ public/           # Static assets (images, favicon)
├─ src/
│  ├─ components/    # Reusable components (Charts, Cards, Buttons)
│  ├─ context/       # FinanceContext for global state
│  ├─ pages/         # Dashboard, Transactions, Reports, Settings, Login
│  ├─ App.jsx        # Main App with routing & layout
│  └─ index.css      # Tailwind base + custom animations
├─ package.json
├─ tailwind.config.js
└─ vite.config.js
```

---

## ⚡ Installation & Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/ArjunVerma04/Finverse-Finance-Dashboard-.git
cd Finverse-Finance-Dashboard-
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📌 Usage

1. Login using demo credentials.
2. Add/Edit/Delete transactions.
3. Filter charts by date.
4. Export transactions as CSV.
5. Toggle dark/light mode using the UI switch.

---

## 🌟 Future Roadmap

* 🗄️ Connect to a real backend with database & JWT authentication
* 🔍 Search & advanced filters for transactions
* 🔔 Recurring transactions & notifications
* 📱 Mobile app using React Native
* 🌐 Multi-user collaboration & cloud sync

---

## 📄 License

MIT License © 2026 Arjun Verma
