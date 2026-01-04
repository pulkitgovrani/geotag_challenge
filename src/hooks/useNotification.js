import { useState, useEffect } from "react";
import { notificationStore } from "../store/notificationStore";
import { NOTIFICATION_TYPES } from "../utils/constants";

export const useNotification = () => {
  const [notifications, setNotifications] = useState(
    notificationStore.getNotifications()
  );

  useEffect(() => {
    return notificationStore.subscribe(setNotifications);
  }, []);

  return {
    notifications,
    showSuccess: (message) =>
      notificationStore.addNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message,
      }),
    showError: (message) =>
      notificationStore.addNotification({
        type: NOTIFICATION_TYPES.ERROR,
        message,
      }),
    showWarning: (message) =>
      notificationStore.addNotification({
        type: NOTIFICATION_TYPES.WARNING,
        message,
      }),
    showInfo: (message) =>
      notificationStore.addNotification({
        type: NOTIFICATION_TYPES.INFO,
        message,
      }),
    remove: notificationStore.removeNotification,
  };
};
