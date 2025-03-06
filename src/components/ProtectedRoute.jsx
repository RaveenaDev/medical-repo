// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = localStorage.getItem("role"); // Get role from localStorage
    // console.log("ROLE: ",userRole)

    if (!userRole || !allowedRoles.includes(userRole)) {
        localStorage.clear();
        return <Navigate to="/" replace />; // Redirect to login if unauthorized
    }

    return children;
};

export default ProtectedRoute;
