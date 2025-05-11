import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FullPageSpinner from './FullPageSpinner';

const RequireAuth: React.FC = () => {
  const { accessToken, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageSpinner />;

  return accessToken ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default RequireAuth;
