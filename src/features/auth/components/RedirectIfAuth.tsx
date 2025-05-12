// src/components/RedirectIfAuth.tsx
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfAuth: React.FC<{ redirectTo?: string }> = ({ redirectTo = '/courses' }) => {
  const token = useAppSelector((s) => s.auth.accessToken);

  // Si ya está logueado, redirige; si no, muestra el form de login/register
  return token ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default RedirectIfAuth;
