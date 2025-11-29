import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const value = {
    sidebarOpen,
    toggleSidebar,
    selectedTicket,
    setSelectedTicket,
    notifications,
    addNotification,
    removeNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};