import React from "react";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

function GuestRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
}

export default GuestRoute;
