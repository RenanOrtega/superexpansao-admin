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
import { PedidoDetails } from "@/components/Pedido/PedidoDetails";
import EmpresaPage from "@/pages/EmpresaPage";
import { EmpresaDetails } from "@/components/Empresa/EmpresaDetails";
import { ContatoDetails } from "@/components/Contato/ContatoDetails";
import AbordagemDetails from "@/components/Abordagem/AbordagemDetails";

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
          <Route path="/pedidos/:id" element={<PedidoDetails />} />
          <Route path="/clientes" element={<EmpresaPage />} />
          <Route path="/clientes/:id" element={<EmpresaDetails />} />
          <Route path="/contatos/:id" element={<ContatoDetails />} />
          <Route path="/abordagens/:id" element={<AbordagemDetails />} />
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
