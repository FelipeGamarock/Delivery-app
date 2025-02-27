import React from 'react';
import './reset.css';
import './App.css';
import { Route, Navigate, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import CustomerCheckout from './pages/CustomerCheckout';
import AdminPage from './pages/AdminPage';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrderDetail from './pages/CustomerOrderDetail';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrderDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route exact path="/customer/orders/:id" element={ <CustomerOrderDetail /> } />
      <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
      <Route exact path="/admin/manage" element={ <AdminPage /> } />
      <Route exact path="/seller/orders" element={ <SellerOrders /> } />
      <Route exact path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
    </Routes>
  );
}

export default App;
