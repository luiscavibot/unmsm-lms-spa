// src/components/RequireAuth.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullPageSpinner from './FullPageSpinner';
import { useAppSelector } from '@/store/hooks';

const RequireAuth: React.FC = () => {
  // Extraemos el token y el estado de carga del slice de auth
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const status = useAppSelector((state) => state.auth.status);
  const loading = status === 'loading';

  const location = useLocation();

  // Si estamos en medio de un login o refresh, mostramos un spinner
  if (loading) {
    return <FullPageSpinner />;
  }

  // Si hay token, renderizamos las rutas hijas; si no, redirigimos al login
  return accessToken ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default RequireAuth;
