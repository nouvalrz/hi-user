import React from "react";
import { useState } from "react";
import { createContext } from "react";

const AlertType = {
  success: "SUCCESS",
  error: "ERROR",
  info: "INFO",
};

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const fire = ({ title, message, type, duration = 3000 }) => {
    const id = Math.random();

    setAlerts((prev) => [...prev, { title, message, type, id: id }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, duration);
  };

  const close = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, fire, close }}>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertType, AlertContext, AlertProvider };
