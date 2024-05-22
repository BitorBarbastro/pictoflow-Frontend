import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!sessionStorage.getItem('token');

  return isAuthenticated ? <Navigate to="/hero" /> : <Component {...rest} />;
};

export default PublicRoute;
