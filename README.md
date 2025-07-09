# Financify

A simple, responsive web application for tracking personal finances — built with **Next.js**, **React**, **shadcn/ui**, **Recharts**, and **MongoDB**.

This submission includes features up to **Stage 2** (Basic Transaction Tracking + Categories).

---

## ✨ Features

### ✅ Basic Transaction Tracking

- Add, edit, and delete transactions (amount, date, description)
- Transaction list with human-friendly formatting
- Bar chart showing monthly expenses
- Basic form validation with helpful error messages

### ✅ Categories

- Predefined transaction categories (e.g., Food, Travel, Shopping, etc.)
- Category-wise pie chart of expenses
- Dashboard with summary cards:
  - Total monthly expenses
  - Breakdown by category
  - Most recent transactions

> **Note**: Authentication/login is intentionally **not implemented** as per the assignment guidelines.

---

## 🖼️ UI Previews

![Screenshot - 1](https://blogger.googleusercontent.com/img/a/AVvXsEjRBmGWNDmYlZMfHMJLTWMn3qYSQGqcGIZQnVK4IpHKfrt2YtH7eU9a9HuLyg1tMT41HTnKAmGsEV2RVhDsmVRNpmdSXgFaxBJtbWtfVZbz7tjwyNV5TKy4hJX4Fpho10SbeOtTWjnshoW-TZaWLMmv9cy9ByT1jabIiICQyebLnlaDm0mmoB8ejDoMGJ4)
![Screenshot - 1](https://blogger.googleusercontent.com/img/a/AVvXsEj6qChBiddC-dvQnHGmKDGRTdD_HQcMwApI8TY579_TyVER_E8mvzWvf85cB0JkUWbj3iIcLGaVJhl90WYIvPhvhGC8tGm6dc3D5ZVFZWwjZyEPyvg99leC9IM7xku8Mr2O5wcXIwpWMvY_KoQrMzmtPA6CW0VwP4r3p3-kU41qH6-Sp1FAxHNMyLWUiZk)

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://ui.shadcn.com/charts)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🚀 Live Demo

🔗 [Live Deployment URL](https://k3financify.vercel.app)

---

## 📦 Getting Started (Local Setup)

1. **Clone the repository:**

```shell
git clone https://github.com/KodeWithKK/Financify.git
cd Financify
```

2. **Install dependencies:**

```shell
npm install
```

3. **Create \`.env.local\` and add:**

```env
MONGODB_URI=your_mongodb_connection_string
```

4. **Run the development server:**

```shell
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📈 Folder Structure

```
.
├── components/ # UI components (forms, charts, cards)
├── lib/ # Utility functions (transaction utils)
├── app/ # Next.js pages (index, api routes)
├── public/ # Static assets
├── database/ # MongoDB configuration and schemas
└── schemas/ # zod schemas
```

---

## 📌 Future Improvements (Stage 3)

- Set monthly budgets per category
- Budget vs Actual comparison chart
- Smart spending insights and trends
