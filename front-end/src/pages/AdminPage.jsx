import React from 'react';
import NavBar from '../components/NavBar';
import AdminRegisterForms from '../components/AdminRegisterForms';

const navLinks = [{
  text: 'Gerenciar Usuários',
  route: '/admin/manage',
  testId: 'customer_products__element-navbar-link-orders',
}];

export default function HomeAdmin() {
  return (
    <div>
      <NavBar navLinks={ navLinks } />
      <AdminRegisterForms />
    </div>
  );
}
