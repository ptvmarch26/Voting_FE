import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import VotePage from "../pages/VotePage";
import NotFoundPage from "../pages/NotFoundPage";

import AdminLayout from "../admin/layout/AdminLayout";
import LoginPage from "../admin/pages/LoginPage";
import DashboardPage from "../admin/pages/DashboardPage";
import ElectionsPage from "../admin/pages/ElectionsPage";
import ElectionDetailsPage from "../admin/pages/ElectionDetailsPage";

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
    path: "/admin/elections",
    component: ElectionsPage,
    Layout: AdminLayout,
  },
   {
    path: "/admin/election-details/:id",
    component: ElectionDetailsPage,
    Layout: AdminLayout,
  },
];

export { publicRoutes, adminRoutes };
