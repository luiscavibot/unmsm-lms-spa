// src/components/RedirectIfAuth.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import FullPageSpinner from './FullPageSpinner';
import { useAuth } from '../hooks/useAuth';

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
  const { accessToken, loading } = useAuth();

  if (loading) return <FullPageSpinner />;
  if (accessToken) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default RedirectIfAuth;
