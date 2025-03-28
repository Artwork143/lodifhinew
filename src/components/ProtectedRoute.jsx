// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
