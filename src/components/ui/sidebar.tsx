import {
  Users,
  Building2,
  LogOut,
  Bike,
  Home,
  ChevronsLeft,
  ChevronsRight,
  Building,
  UserRoundPen,
  Sun,
  Moon,
  Package,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

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
    icon: Package,
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
    label: "Colaboradores",
    icon: UserRoundPen,
    path: "/colaboradores",
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`
        bg-white dark:bg-zinc-900 
        h-screen flex flex-col transition-all duration-300 
        text-zinc-800 dark:text-zinc-200
      `}
    >
      <div
        className={`p-5 border-b border-gray-200 dark:border-zinc-800 flex ${
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
          className="text-gray-600 dark:text-gray-300 hover:text-orange-800 dark:hover:text-orange-200"
          onClick={() => setExpanded((curr) => !curr)}
        >
          {expanded ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>
      </div>

      <nav className="flex-grow">
        <ul>
          {menuItems
            .filter((item) =>
              item.label === "Colaboradores" ? user?.role === "Admin" : true
            )
            .map((item) => (
              <Link to={item.path} key={item.path}>
                <li
                  className={`flex items-center justify-center p-2 m-2 font-medium rounded-md cursor-pointer group
                  ${
                    isActive(item.path)
                      ? "bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-800 dark:from-orange-800 dark:to-orange-700 dark:text-orange-100"
                      : "hover:bg-indigo-50 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
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

      <div
        className={`p-4 border-t border-gray-200 dark:border-zinc-800 ${
          expanded ? "" : "flex justify-center"
        }`}
      >
        {expanded ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-sm font-medium mr-2">
                {user?.email || "usuario@email.com"}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={logout}
              className="text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={logout}
              className="text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors mb-2"
            >
              <LogOut size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
