import React from "react";
import { Home, Upload, Map, Package, BarChart3, X } from "lucide-react";
import { ROUTES } from "../../utils/constants";

export const Sidebar = ({ currentPage, onNavigate, isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", route: ROUTES.DASHBOARD },
    { icon: Upload, label: "Upload", route: ROUTES.UPLOAD },
    { icon: Map, label: "Farm Map", route: ROUTES.MAP },
    { icon: Package, label: "Inventory", route: ROUTES.INVENTORY },
    { icon: BarChart3, label: "Analytics", route: ROUTES.ANALYTICS },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 w-64 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between lg:hidden">
          <h2 className="font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.route;

            return (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
