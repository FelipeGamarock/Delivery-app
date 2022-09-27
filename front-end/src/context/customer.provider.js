import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from './customer.context';
import { requestData } from '../service/requests';

function CustomerProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await requestData('/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = useMemo(() => ({
    products,
    setProducts,
    cart,
    setCart,
    cartProducts,
    setCartProducts,
  }), [products, cart, cartProducts]);

  return (
    <CustomerContext.Provider
      value={ value }
    >
      { children }
    </CustomerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomerProvider;
