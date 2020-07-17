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
];

export default pageRoutes;
