// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ForgotPasswordConfirmation from '@/pages/Auth/ForgotPasswordConfirmation';
import ResetPassword from '@/pages/Auth/ResetPassword';
import ResetPasswordConfirmation from '@/pages/Auth/ResetPasswordConfirmation';
import Home from '@/pages/Home/Home';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<Register />} />
	  <Route path="/forgot-password" element={<ForgotPassword />} />
	  <Route path="/forgot-password/confirmation" element={<ForgotPasswordConfirmation />} />
      <Route path="/reset-password" element={<ResetPassword />} />
	  <Route path="/reset-password/confirmation" element={<ResetPasswordConfirmation />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default Routing;
