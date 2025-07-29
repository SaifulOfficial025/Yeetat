import React from "react";
import { Navigate } from "react-router-dom";

// Check for the actual admin authentication keys used in AuthContext
const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken") && !!localStorage.getItem("adminInfo");
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
