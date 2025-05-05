import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";

export const routes = createBrowserRouter([
  {
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
    path: "/login",
  },
  {
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
    path: "/register",
  },
  {
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
