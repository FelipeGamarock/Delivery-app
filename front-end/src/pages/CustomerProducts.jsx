import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import CustomerContext from '../context/customer.context';

const navLinks = [{
  text: 'Produtos',
  route: '/customer/products',
  testId: 'customer_products__element-navbar-link-products',
}, {
  text: 'Meus Pedidos',
  route: '/customer/orders',
  testId: 'customer_products__element-navbar-link-orders',
}];

function CustomerProducts() {
  const [toCheckout, setToCheckout] = useState(false);
  const { products, cart, cartProducts, setCartProducts } = useContext(CustomerContext);

  const sum = cartProducts.reduce((acc, curr) => acc + curr.totalProduct, 0);
  // .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const submitRedirect = () => {
    setCartProducts(Object.values(cart));
    setToCheckout(true);
  };

  return (
    <>
      <NavBar navLinks={ navLinks } />
      { toCheckout && <Navigate to="/customer/checkout" /> }
      { products.map((product) => <ProductCard key={ product.name } { ...product } />)}
      <button
        className="checkout-btn-customer"
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ sum === 0 }
        onClick={ submitRedirect }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          { sum.toFixed(2).toString().replace('.', ',') }
        </span>
      </button>
    </>
  );
}

export default CustomerProducts;
