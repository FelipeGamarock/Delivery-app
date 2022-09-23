import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { requestData } from '../service/requests';

const navLinks = [{
  text: 'Produtos',
  route: '/customer/products',
  testId: 'customer_products__element-navbar-link-products',
}, {
  text: 'Meus Pedidos',
  route: '/customer/order',
  testId: 'customer_products__element-navbar-link-orders',
}];

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const itExists = localStorage.getItem('user');
      let user;
      if (itExists) {
        user = JSON.parse(itExists);
        if (!user.token) setIsAuth(false);
      }
      if (!itExists) setIsAuth(false);
      const data = await requestData('/products');
      setProducts(data);
    };
    fetchData();
  }, []);

  if (!isAuth) return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar navLinks={ navLinks } />
      { products.map((product) => <ProductCard key={ product.name } { ...product } />)}
    </>
  );
}

export default CustomerProducts;
