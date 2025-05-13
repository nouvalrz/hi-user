import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes/index.jsx";
import "./styles/index.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AlertProvider } from "./contexts/AlertContext.jsx";
import { UsersProvider } from "./contexts/UsersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <UsersProvider>
          <RouterProvider router={routes} />
        </UsersProvider>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
