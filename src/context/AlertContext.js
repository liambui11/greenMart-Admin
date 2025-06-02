import React, { createContext, useContext, useState, useCallback } from "react";
import CustomAlert from "../components/Alert/customAlert";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((type, message, duration = 3000) => {
    setAlert({ type, message });

    setTimeout(() => {
      setAlert(null);
    }, duration);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
};
