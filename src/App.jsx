import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Fragment } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import { publicRoutes, adminRoutes } from "./routes/route";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { useOrganization } from "./contexts/OrganizationContext";

function App() {
  const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role, handleLogout } = useOrganization();

    if (!token || !role) {
      handleLogout();
      return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      handleLogout();
      return <Navigate to="/" replace />;
    }

    return children;
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.Layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  Layout ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Page />
                  )
                }
              />
            );
          })}

          {adminRoutes.map((route, index) => {
            const Layout = route.Layout || Fragment;
            const Page = route.component;
            if (route.path === "/admin") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute allowedRoles={["CA", "TRUSTEE"]}>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
