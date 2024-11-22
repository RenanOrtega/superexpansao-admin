import React from "react";
import Sidebar from "../ui/sidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
