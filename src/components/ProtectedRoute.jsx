import React from "react";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
