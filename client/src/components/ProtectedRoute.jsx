// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Adjust the path if necessary

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  // Check if the user is authenticated, otherwise redirect to login
  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
