import { Routes as ReactRoutes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import SidebarLayout from "../components/layouts/SidebarLayout";
import HomePage from "../pages/HomePage";
import MapeadorPage from "@/pages/MapeadorPage";
import ProprietarioPage from "@/pages/ProprietarioPage";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapeadores" element={<MapeadorPage />} />
          <Route path="/proprietarios" element={<ProprietarioPage />} />
        </Route>
      </Route>
    </ReactRoutes>
  );
};

export default Routes;
