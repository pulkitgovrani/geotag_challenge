import React from "react";
import { MapPin, Menu } from "lucide-react";

export const Navbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Farm GeoTag</h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Smart Crop Management
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-700">Welcome, Farmer</p>
            <p className="text-xs text-gray-500">Last login: Today</p>
          </div>
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
            F
          </div>
        </div>
      </div>
    </header>
  );
};
