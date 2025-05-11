import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import { AuthProvider } from '@/features/auth/providers';
import RequireAuth from '@/features/auth/components/RequireAuth';
import RedirectIfAuth from '@/features/auth/components/RedirectIfAuth';
import Courses from '@/pages/courses/AuthTest';

const Routing = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate replace to="/courses" />} />

      {/* Rutas públicas que redirigen si el usuario YA tiene sesión */}
      <Route element={<RedirectIfAuth redirectTo="/courses" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<RequireAuth />}>
        <Route path="/courses" element={<Courses />} />
        {/* ...otras rutas privadas */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AuthProvider>
);

export default Routing;
