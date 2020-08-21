import React from "react";

const pageRoutes = [
  {
    path: "/regular",
    component: React.lazy(() => import("./savings/Regular"))
  },
  {
    path: "/target",
    component: React.lazy(() => import("./savings/Target"))
  },
  {
    path: "/savetoloan",
    component: React.lazy(() => import("./savings/SaveToLoan"))
  },
  {
    path: "/halal",
    component: React.lazy(() => import("./investments/Halal"))
  },
  {
    path: "/market",
    component: React.lazy(() => import("./investments/Market"))
  },
  {
    path: "/finance",
    component: React.lazy(() => import("./investments/Finance"))
  },
  {
    path: "/investments",
    component: React.lazy(() => import("./investments/Investments"))
  },
  {
    path: "/investment/market",
    component: React.lazy(() => import("./investments/MarketTab"))
  },
  {
    path: "/investment/halal",
    component: React.lazy(() => import("./investments/HalalTab"))
  },
  {
    path: "/investment/finance",
    component: React.lazy(() => import("./investments/FinanceTab"))
  },
  {
    path: "/loan",
    component: React.lazy(() => import("./Loan/Loan"))
  },
  {
    path: "/loan-group",
    component: React.lazy(() => import("./Loans/GroupTab"))
  },
  {
    path: "/loans",
    component: React.lazy(() => import("./Loans/LoanTab"))
  },
  {
    path: "/savings",
    component: React.lazy(() => import("./savings/Savings"))
  },
  {
    path: "/savings-tab/regular",
    component: React.lazy(() => import("./savings/SavingsTab"))
  },
  {
    path: "/savings-tab/target",
    component: React.lazy(() => import("./savings/SavingsTargetTab"))
  },
  {
    path: "/savings-tab/savetoloan",
    component: React.lazy(() => import("./savings/SavingsLoanTab"))
  },
  {
    path: "/settings",
    component: React.lazy(() => import("./settings/Settings"))
  },
  {
    path: "/transactions",
    component: React.lazy(() => import("./transactions/Transaction"))
  },
  {
    path: "/wallet",
    component: React.lazy(() => import("./transactions/Wallet"))
  },
  {
    path: "/applications/target-contribution",
    component: React.lazy(() => import("./Applications/TargetContribution"))
  },
  {
    path: "/applications/monthly-contribution",
    component: React.lazy(() => import("./Applications/MonthlyContribution"))
  },
  {
    path: "/applications/procurement",
    component: React.lazy(() => import("./Applications/Procurement"))
  },
  {
    path: "/applications/loan-repayment",
    component: React.lazy(() => import("./Applications/LoanRepayment"))
  },
  {
    path: "/applications/shares-capital",
    component: React.lazy(() => import("./Applications/SharesCapital"))
  },
  {
    path: "/applications/wallet-contribution",
    component: React.lazy(() => import("./Applications/WalletContribution"))
  },
];

export default pageRoutes;
