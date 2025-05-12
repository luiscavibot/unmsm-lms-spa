// src/components/RedirectIfAuth.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import FullPageSpinner from './FullPageSpinner';
import { useAppSelector } from '@/store/hooks';

/**
 * Envuelve rutas públicas; si el usuario YA está logueado
 * lo redirige al dashboard para evitar que vea /login o /register.
 *
 * @example
 *   <Route element={<RedirectIfAuth redirectTo="/courses" />}>
 *     <Route path="/login" element={<Login />} />
 *   </Route>
 */
const RedirectIfAuth: React.FC<{ redirectTo?: string }> = ({ redirectTo = '/courses' }) => {
  // Leemos el token y el estado de carga desde Redux
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const status = useAppSelector((state) => state.auth.status);
  const loading = status === 'loading';

  if (loading) {
    return <FullPageSpinner />;
  }

  if (accessToken) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuth;
