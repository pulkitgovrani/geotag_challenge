import React from "react";
import { Check, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useNotification } from "../../hooks/useNotification";

export const Notification = () => {
  const { notifications, remove } = useNotification();

  const icons = {
    success: Check,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notif) => {
        const Icon = icons[notif.type];
        return (
          <div
            key={notif.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
              colors[notif.type]
            } text-white min-w-[300px] animate-slide-in`}
          >
            <Icon size={20} />
            <span className="flex-1 text-sm font-medium">{notif.message}</span>
            <button
              onClick={() => remove(notif.id)}
              className="hover:bg-white/20 rounded p-1"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
