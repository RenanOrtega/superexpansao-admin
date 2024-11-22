import { Routes as ReactRoutes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import SidebarLayout from "../components/layouts/SidebarLayout";
import HomePage from "../pages/HomePage";
import MapeadorPage from "@/pages/MapeadorPage";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <SidebarLayout>
              <HomePage />
            </SidebarLayout>
          }
        />
        <Route
          path="/mapeadores"
          element={
            <SidebarLayout>
              <MapeadorPage />
            </SidebarLayout>
          }
        />
      </Route>
    </ReactRoutes>
  );
};

export default Routes;
