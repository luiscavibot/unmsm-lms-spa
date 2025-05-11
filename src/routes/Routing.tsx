import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import { AuthProvider } from '@/features/auth/providers';
import RequireAuth from '@/features/auth/components/RequireAuth';
import RedirectIfAuth from '@/features/auth/components/RedirectIfAuth';
import Courses from '@/pages/Courses/AuthTest';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ForgotPasswordConfirmation from '@/pages/Auth/ForgotPasswordConfirmation';
import ResetPassword from '@/pages/Auth/ResetPassword';
import ResetPasswordConfirmation from '@/pages/Auth/ResetPasswordConfirmation';
import CoursesList from '@/pages/Courses/CoursesList';

const Routing = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate replace to="/courses" />} />

      {/* Rutas públicas  */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/confirmation" element={<ForgotPasswordConfirmation />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/confirmation" element={<ResetPasswordConfirmation />} />

      {/* Rutas públicas que redirigen si el usuario YA tiene sesión */}
      <Route element={<RedirectIfAuth redirectTo="/courses" />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<RequireAuth />}>
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:type" element={<CoursesList />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AuthProvider>
);

export default Routing;
