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
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fire = ({ title, message, type, duration = 3000 }) => {
    setType(type);
    setTitle(title);
    setMessage(message);
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ show, title, message, type, fire }}>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertType, AlertContext, AlertProvider };
