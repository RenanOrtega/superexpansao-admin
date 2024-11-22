import { Routes as ReactRoutes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import SidebarLayout from "../components/layouts/SidebarLayout";
import HomePage from "../pages/HomePage";
import ConfigurationPage from "../pages/ConfigurationPage";
import MotoboyPage from "@/pages/MotoboyPage";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <HomePage />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/motoboys"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <MotoboyPage />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/configuracoes"
        element={
          <PrivateRoute>
            <SidebarLayout>
              <ConfigurationPage />
            </SidebarLayout>
          </PrivateRoute>
        }
      />
    </ReactRoutes>
  );
};

export default Routes;
