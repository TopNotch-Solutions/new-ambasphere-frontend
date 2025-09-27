import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  // console.log("ProtectedRoute - role:", role);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(role)) {
    console.log("Current role:  ",role)
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;