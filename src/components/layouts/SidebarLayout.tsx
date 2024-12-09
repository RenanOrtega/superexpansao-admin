import Sidebar from "../ui/sidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-grow overflow-hidden">
        <div className="h-full p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
