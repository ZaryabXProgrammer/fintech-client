# 🚀 FinConnect – Subscription-Gated Fintech API Dashboard (Frontend)

A clean, modern, and fully functional frontend for **FinConnect**, built as part of the **WebKode Challenge Pack**. This dashboard enables developers to register, subscribe to plans, and interact with a suite of secure fintech APIs — all gated behind a Stripe-based subscription flow.

---

## 🔧 Tech Stack

- **Frontend**: Vite + React
- **Animations**: Framer Motion
- **Routing**: React Router
- **Styling**: TailwindCSS
- **Icons**: Lucide-react
- **State Management**: Redux Toolkit
- **Auth & Subscription**: JWT + Stripe Checkout (Test Mode)
- **API Integration**: Axios for communication with backend APIs

---

## ✅ Features

### 🔐 Authentication & Subscription Flow

- User registration (`/register`)
- Login with JWT (`/login`)
- Redirect to `/pricing` post-login
- Subscribe to a plan via **Stripe Checkout** (Test mode)
- Authenticated users only can access `/dashboard/*` routes
- Unsubscribed users are blocked/redirected (HTTP 403)

### 📊 Dashboard Modules (Post-Subscription)

- **Overview** – Personalized user dashboard landing
- **Balance** – Displays mock financial balance
- **Transfer** – Initiate mock fund transfers between accounts
- **Transactions** – Paginated transaction history
- **Invoice** – Generate transaction summary between selected dates
- **Admin Panel**
  - View all users & subscription statuses
  - View request logs

### ⚙️ Developer & Admin Tools

- JWT + Role-based access (RBAC)
- Rate limiting (10 req/min/user)
- Server + client-side form validations
- Reusable components & modular structure

---

## 💳 Stripe Integration

- Implemented using **Stripe Checkout** (test mode)
- Webhooks handled server-side to activate/cancel subscriptions
- Realistic flow and UX mirroring production payment systems

---

## 🧪 Test Accounts

✅ Credentials are pre-seeded via backend seeders or migrations:

- `user1@example.com` / `password123`
- `user2@example.com` / `password123`

These accounts can be used to:

- Log in and test the subscription flow
- Transfer mock funds between them
- View real-time updates in transactions and balance

---

## 🗂 Project Structure

```bash
📁 src
├── 📁 components
├── 📁 pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Pricing.jsx
│   ├── Dashboard/
│   │   ├── Overview.jsx
│   │   ├── Balance.jsx
│   │   ├── Transfer.jsx
│   │   ├── Transactions.jsx
│   │   └── Invoice.jsx
├── 📁 Redux
├── 📁 Helpers
├── App.jsx
└── main.jsx
```

# Clone the repo
git clone https://github.com/your-username/finconnect-frontend.git
cd finconnect-frontend

# Install dependencies
npm install

# Start the dev server
npm run dev


