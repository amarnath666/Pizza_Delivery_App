import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from 'scenes/loginPage/RegistrationForm';
import OTPVerification from 'scenes/loginPage/OTPVerification';
import LoginForm from 'scenes/loginPage/LoginForm';
import ResetPassword from 'scenes/loginPage/ResetPassword';
import ForgotPasswordForm from 'scenes/loginPage/ForgotPassword';
import AdminLogin from 'scenes/loginPage/AdminLogin';
import Home from 'scenes/homePage/Home';
import Admin from 'scenes/AdminPage/Admin';
import CustomizedPizza from 'scenes/CustomPizza/CustomizedPizza';
import PaymentSuccess from 'scenes/PizzaComponent/PaymentSuccess';
import OrderStatus from 'scenes/PizzaComponent/OrderStatus';
import InventoryPage from 'scenes/AdminPage/InventoryPage';

const App = () => {

  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/otp-verification/:email" element={<OTPVerification />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password/:email" element={<ResetPassword />} />
      <Route path="/login" element={ <LoginForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path='/customizedPizza' element={<CustomizedPizza />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/orderstatus/:orderId" element={<OrderStatus />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  );
};

export default App;
