import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import RequireAuth from '@/features/auth/components/RequireAuth';
import RedirectIfAuth from '@/features/auth/components/RedirectIfAuth';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ForgotPasswordConfirmation from '@/pages/Auth/ForgotPasswordConfirmation';
import ResetPassword from '@/pages/Auth/ResetPassword';
import ResetPasswordConfirmation from '@/pages/Auth/ResetPasswordConfirmation';
import CoursesList from '@/pages/Courses/CoursesList';
import CourseDetail from '@/pages/Courses/CourseDetail';
import NewPassword from '@/pages/Auth/NewPassword';
const Routing: React.FC = () => (
  <Routes>
    {/* Redirect root */}
    <Route path="/" element={<Navigate replace to="/courses/posgrado" />} />
    {/* Rutas públicas sin guard */}
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/forgot-password/confirmation" element={<ForgotPasswordConfirmation />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/reset-password/confirmation" element={<ResetPasswordConfirmation />} />
    <Route path="/new-password" element={<NewPassword />} />
    {/* Públicas que redirigen si ya estás logueado */}
    <Route element={<RedirectIfAuth redirectTo="/courses/posgrado" />}>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Route>
    {/* Privadas: solo accesibles con token */}
    <Route element={<RequireAuth />}>
      <Route path="/courses/:type" element={<CoursesList />} />
      <Route path="/courses/:type/:courseOfferingId" element={<CourseDetail />} />
    </Route>
    {/* Fallback 404 → redirige a home */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default Routing;
