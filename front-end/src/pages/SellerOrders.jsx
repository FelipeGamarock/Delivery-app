import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { requestDataAuth } from '../service/requests';
import OrderCard from '../components/OrderCard';

const navLinks = [{
  text: 'Pedidos',
  route: '/seller/orders',
  testId: 'customer_products__element-navbar-link-orders',
}];

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const itExists = localStorage.getItem('user');
      if (itExists) {
        const user = JSON.parse(itExists);

        const data = await requestDataAuth('/seller/orders', user.token);
        setOrders(data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <NavBar navLinks={ navLinks } />
      {
        orders.length === 0
          ? (<h1>vazio</h1>)
          : (orders
            .map((order) => <OrderCard key={ order.id } order={ order } />))
      }
    </>
  );
}

export default SellerOrders;
