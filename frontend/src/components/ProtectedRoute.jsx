// src/components/RoleProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthorized } from '../utils/auth';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  return isAuthorized(allowedRoles) ? children : <Navigate to={`/${allowedRoles[0]}/login`} />;
};

export default RoleProtectedRoute;
