import React from "react";

const materialRoutes = [
  {
    path: "/applications/monthly-contribution",
    component: React.lazy(() => import("./Applications/MonthlyContribution"))
  },
  {
    path: "/applications/target-contribution",
    component: React.lazy(() => import("./Applications/TargetContribution"))
  },
  {
    path: "/applications/loan-repayment",
    component: React.lazy(() => import("./Applications/LoanRepayment"))
  },
  {
    path: "/applications/procurement",
    component: React.lazy(() => import("./Applications/Procurement"))
  },
  {
    path: "/applications/shares-capital",
    component: React.lazy(() => import("./Applications/SharesCapital"))
  },
  {
    path: "/applications/wallet-contribution",
    component: React.lazy(() => import("./Applications/WalletContribution"))
  },
  {
    path: "/wallet",
    component: React.lazy(() => import("./tables/Wallet"))
  },
  {
    path: "/transactions",
    component: React.lazy(() => import("./tables/Transaction"))
  },
  {
    path: "/loan",
    component: React.lazy(() => import("./tables/Loan"))
  },
  {
    path: "/settings",
    component: React.lazy(() => import("./settings/Settings"))
  },
  {
    path: "/material/form",
    component: React.lazy(() => import("./forms/AppForm"))
  },
  {
    path: "/material/buttons",
    component: React.lazy(() => import("./buttons/AppButton"))
  },
  {
    path: "/material/icons",
    component: React.lazy(() => import("./icons/AppIcon"))
  },
  {
    path: "/material/progress",
    component: React.lazy(() => import("./AppProgress"))
  },
  {
    path: "/material/menu",
    component: React.lazy(() => import("./menu/AppMenu"))
  },
  {
    path: "/material/checkbox",
    component: React.lazy(() => import("./checkbox/AppCheckbox"))
  },
  {
    path: "/material/switch",
    component: React.lazy(() => import("./switch/AppSwitch"))
  },
  {
    path: "/material/radio",
    component: React.lazy(() => import("./radio/AppRadio"))
  },
  {
    path: "/material/slider",
    component: React.lazy(() => import("./slider/AppSlider"))
  },
  {
    path: "/material/autocomplete",
    component: React.lazy(() => import("./auto-complete/AppAutoComplete"))
  },
  {
    path: "/material/expansion-panel",
    component: React.lazy(() => import("./expansion-panel/AppExpansionPanel"))
  },
  {
    path: "/material/dialog",
    component: React.lazy(() => import("./dialog/AppDialog"))
  },
  {
    path: "/material/snackbar",
    component: React.lazy(() => import("./snackbar/AppSnackbar"))
  }
];

export default materialRoutes;
