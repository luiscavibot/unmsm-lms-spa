import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import AuthTest from '@/pages/courses/AuthTest';

const Routing = () => {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  };
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated() ? <Navigate replace to="/only-authenticated" /> : <Navigate replace to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/only-authenticated" element={isAuthenticated() ? <AuthTest /> : <Navigate replace to="/login" />} />
    </Routes>
  );
};

export default Routing;
