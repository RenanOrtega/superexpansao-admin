import {
  Users,
  ShoppingCart,
  Building2,
  Settings,
  LogOut,
  Bike,
  Home,
  ChevronsLeft,
  ChevronsRight,
  Building,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    label: "Início",
    icon: Home,
    path: "/",
  },
  {
    label: "Proprietários",
    icon: Users,
    path: "/proprietarios",
  },
  {
    label: "Imóveis",
    icon: Building,
    path: "/imoveis",
  },
  {
    label: "Pedidos",
    icon: ShoppingCart,
    path: "/pedidos",
  },
  {
    label: "Mapeadores",
    icon: Bike,
    path: "/mapeadores",
  },
  {
    label: "Clientes",
    icon: Building2,
    path: "/clientes",
  },
  {
    label: "Configurações",
    icon: Settings,
    path: "/configuracoes",
  },
];

const Sidebar = () => {
  const { user, signOut } = useAuth();

  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`
        bg-white border-r h-screen flex flex-col transition-all duration-300 
      `}
    >
      <div
        className={`p-5 border-b flex ${
          expanded ? "justify-between" : "justify-center"
        } items-center`}
      >
        <span
          className={`transition-all font-semibold ${
            expanded ? "w-32" : "hidden"
          }`}
        >
          SuperExpansão
        </span>
        <button
          className="text-gray-600 hover:text-orange-800"
          onClick={() => setExpanded((curr) => !curr)}
        >
          {expanded ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>
      </div>

      <nav className="flex-grow">
        <ul>
          {menuItems
            .filter((item) =>
              item.label === "Configurações" ? user?.role === "Admin" : true
            )
            .map((item) => (
              <Link to={item.path} key={item.path}>
                <li
                  className={`flex items-center justify-center p-2 m-2 font-medium rounded-md cursor-pointer group
                ${
                  isActive(item.path)
                    ? "bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }`}
                >
                  <item.icon size={20} />
                  <span
                    className={`transition-all ${
                      expanded ? "w-52 ml-3" : "hidden"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              </Link>
            ))}
        </ul>
      </nav>

      <div className={`p-4 border-t ${expanded ? "" : "flex justify-center"}`}>
        {expanded ? (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">
                {user?.email || "usuario@email.com"}
              </p>
            </div>
            <button
              onClick={signOut}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={signOut}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
