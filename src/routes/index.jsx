import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import RootLayout from "../layouts/RootLayout";

export const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
