import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes/index.jsx";
import "./styles/index.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AlertProvider } from "./contexts/AlertContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <RouterProvider router={routes} />
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
