let notificationListeners = [];
let notifications = [];

export const notificationStore = {
  getNotifications: () => notifications,

  addNotification: (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date(),
    };
    notifications = [...notifications, newNotification];
    notificationListeners.forEach((listener) => listener(notifications));

    setTimeout(() => {
      notificationStore.removeNotification(newNotification.id);
    }, 5000);
  },

  removeNotification: (id) => {
    notifications = notifications.filter((n) => n.id !== id);
    notificationListeners.forEach((listener) => listener(notifications));
  },

  subscribe: (listener) => {
    notificationListeners.push(listener);
    return () => {
      notificationListeners = notificationListeners.filter(
        (l) => l !== listener
      );
    };
  },
};
