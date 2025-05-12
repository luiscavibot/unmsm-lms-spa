// src/components/RequireAuth.tsx
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth: React.FC = () => {
  const token = useAppSelector((s) => s.auth.accessToken);
  const location = useLocation();

  // Si hay token, renderiza las rutas hijas; si no, fuerza login
  return token ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default RequireAuth;
