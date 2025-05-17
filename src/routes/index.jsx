import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import DetailPage from "../pages/DetailPage";
import RootLayout from "../layouts/RootLayout";
import AddUserPage from "../pages/Users/AddUserPage";
import EditUserPage from "@/pages/Users/EditUserPage";
import NotFoundPage from "@/pages/NotFoundPage";

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
        path: "/employees",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ":id",
            element: <DetailPage />,
          },
          {
            path: ":id/edit",
            element: <EditUserPage />,
          },
          {
            path: "add",
            element: <AddUserPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
