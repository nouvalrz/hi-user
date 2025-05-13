import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import DetailPage from "../pages/DetailPage";
import RootLayout from "../layouts/RootLayout";

export const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/users/:id",
            element: <DetailPage />,
          },
        ],
      },
    ],
  },
]);
