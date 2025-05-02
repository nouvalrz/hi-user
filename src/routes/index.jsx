import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
