import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfAuth: React.FC<{ redirectTo?: string }> = ({ redirectTo = '/courses' }) => {
  const token = useAppSelector((s) => s.auth.accessToken);

  return token ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default RedirectIfAuth;
