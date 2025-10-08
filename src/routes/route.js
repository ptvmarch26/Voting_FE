import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import VotePage from "../pages/VotePage";
import NotFoundPage from "../pages/NotFoundPage";

import AdminLayout from "../admin/layout/AdminLayout";
import LoginPage from "../admin/pages/LoginPage";
import DashboardPage from "../admin/pages/DashboardPage";
import ElectionPage from "../admin/pages/ElectionPage";
import ElectionDetailsPage from "../admin/pages/ElectionDetailsPage";
import TrusteePage from "../admin/pages/TrusteePage";

const publicRoutes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/vote",
    component: VotePage,
  },
  {
    path: "*",
    component: NotFoundPage,
    Layout: null,
  },
];

const adminRoutes = [
  {
    path: "/admin",
    component: LoginPage,
    // Layout: AdminLayout,
  },
  {
    path: "/admin/dashboard",
    component: DashboardPage,
    Layout: AdminLayout,
  },
  {
    path: "/admin/election",
    component: ElectionPage,
    Layout: AdminLayout,
  },
  {
    path: "/admin/election-details/:id",
    component: ElectionDetailsPage,
    Layout: AdminLayout,
  },
  {
    path: "/admin/trustee",
    component: TrusteePage,
    Layout: AdminLayout,
  },
];

export { publicRoutes, adminRoutes };
