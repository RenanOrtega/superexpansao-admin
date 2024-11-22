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
} from "lucide-react";
import { authService } from "../../services/authService";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

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
    label: "Empresas",
    icon: Building2,
    path: "/empresas",
  },
  {
    label: "Configurações",
    icon: Settings,
    path: "/configuracoes",
  },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const email = localStorage.getItem("userEmail") || "";

  const handleLogout = () => {
    authService.logout();
  };

  const isActive = (path: string) => location.pathname === path;

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
          {menuItems.map((item) => (
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
                {email || "usuario@email.com"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
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
