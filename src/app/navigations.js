export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "dashboard"
  },
  {
    name: "Wallet",
    icon: "account_balance_wallet",
    path: "/wallet"
  },
  {
    name: "Saves",
    icon: "payments",
    children: [
      {
        name: "Regular",
        path: "/savings/regular",
        iconText: "B"
      },
      {
        name: "Target",
        path: "/savings/target",
        iconText: "E"
      },
      {
        name: "Share Holding",
        path: "/savings/savetoloan",
        iconText: "E"
      }
    ]
  },
  {
    name: "Application Forms",
    icon: "list_alt",
    children: [
      {
        name: "Target Contributions",
        path: "/applications/target-contribution",
        iconText: "B"
      },
      {
        name: "Monthly Contribution",
        path: "/applications/monthly-contribution",
        iconText: "B"
      },
      {
        name: "Procurement Repayment",
        path: "/applications/procurement",
        iconText: "E"
      },
      {
        name: "Loan Repayment",
        path: "/applications/loan-repayment",
        iconText: "E"
      },
      {
        name: "Shares Contribution",
        path: "/applications/shares-capital",
        iconText: "E"
      },
      {
        name: "Wallet Contribution",
        path: "/applications/wallet-contribution",
        iconText: "E"
      }
    ]
  },
  {
    name: "Loan",
    icon: "money",
    path: "/loan"
  },
  {
    name: "Transactions",
    icon: "receipt",
    path: "/transactions"
  },
  {
    name: "Accounts",
    icon: "settings",
    path: "/settings"
  },
 
];
