import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Notification } from "../common/Notification";

export const Layout = ({ children, currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Notification />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          onNavigate={onNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
