import ToastNotification from "@/components/modals/ToastNotification";
import React, { createContext, useState, useContext, useCallback } from "react";

// Create Context
const ToastContext = createContext();

// Provider Component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  // Function to show toast
  const showToast = useCallback((type, message) => {
    setToast({ type, message });

    // Auto-hide toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <ToastNotification
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};

// Custom Hook for easy access
export const useToast = () => useContext(ToastContext);
