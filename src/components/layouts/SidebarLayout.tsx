import Sidebar from "../ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const SidebarLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-grow overflow-hidden">
        <div className="h-full p-6 bg-gray-100 dark:bg-zinc-950 overflow-y-auto">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </div>
  );
};

export default SidebarLayout;
