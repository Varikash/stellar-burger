import { useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRouteElement = ({ element }) => {
  const userData = state => state.authorization.user;
  const user = useSelector(userData);
  if (!user) {
    return null
  }
  return user? element: <Navigate to="/login" replace/>
}