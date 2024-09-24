import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/Login" replace />}
    />
  );
};

export default PrivateRoute;
