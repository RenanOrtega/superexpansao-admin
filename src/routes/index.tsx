import { Routes as ReactRoutes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import SidebarLayout from "../components/layouts/SidebarLayout";
import HomePage from "../pages/HomePage";
import MapeadorPage from "@/pages/MapeadorPage";
import ProprietarioPage from "@/pages/ProprietarioPage";
import ImovelPage from "@/pages/ImovelPage";
import PedidoPage from "@/pages/PedidoPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProprietarioDetails } from "@/components/Proprietario/ProprietarioDetails";
import { ImovelDetails } from "@/components/Imovel/ImovelDetails";
import { MapeadorDetails } from "@/components/Mapeador/MapeadorDetails";
import ColaboradorPage from "@/pages/ColaboradorPage";
import { UserDetails } from "@/components/User/UserDetails";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapeadores" element={<MapeadorPage />} />
          <Route path="/mapeadores/:id" element={<MapeadorDetails />} />
          <Route path="/proprietarios" element={<ProprietarioPage />} />
          <Route path="/proprietarios/:id" element={<ProprietarioDetails />} />
          <Route path="/imoveis" element={<ImovelPage />} />
          <Route path="/imoveis/:id" element={<ImovelDetails />} />
          <Route path="/pedidos" element={<PedidoPage />} />
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/colaboradores" element={<ColaboradorPage />} />
            <Route path="/colaboradores/:id" element={<UserDetails />} />
          </Route>
        </Route>
      </Route>
    </ReactRoutes>
  );
};

export default Routes;
