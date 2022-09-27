import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsTable from '../components/ProductsTable';
import { requestData, requestPost } from '../service/requests';
import CustomerContext from '../context/customer.context';

const navLinks = [{
  text: 'Produtos',
  route: '/customer/products',
  testId: 'customer_products__element-navbar-link-products',
}, {
  text: 'Meus Pedidos',
  route: '/customer/order',
  testId: 'customer_products__element-navbar-link-orders',
}];

function CustomerCheckout() {
  const { cartProducts } = useContext(CustomerContext);
  const [isFinished, setIsFinished] = useState(false);
  const [orderDetails, setOrderDetails] = useState('');
  const [users, setUsers] = useState([]);

  const [saleForm, setSaleForm] = useState({
    sellerId: '',
    totalPrice: '',
    deliveryAddress: '',
    deliveryNumber: '',
  });

  useEffect(() => {
    const sum = cartProducts
      .reduce((acc, curr) => acc + curr.totalProduct, 0)
      .toFixed(2).toString();

    setSaleForm({ ...saleForm, totalPrice: sum });
  }, [cartProducts]);

  useEffect(() => {
    async function fetchData() {
      const data = await requestData('/users');
      const filterSeller = data.filter((user) => user.role === 'seller');

      setUsers(filterSeller);
    }
    fetchData();
  }, []);

  const handleChange = ({ target }) => {
    setSaleForm({
      ...saleForm,
      [target.name]: target.value,
    });
  };

  const submitSale = async () => {
    try {
      const itExists = localStorage.getItem('user');

      if (itExists) {
        const user = JSON.parse(itExists);
        const products = cartProducts
          .map((p) => ({ productId: p.id, quantity: p.quantity }));
        const body = { ...saleForm, products };
        console.log('🚀 ~ file: CustomerCheckout.jsx ~ line 65 ~ submitSale ~ body', body);
        const sale = await requestPost('/sale', body, user.token);
        setOrderDetails(`/customer/orders/${sale.id}`);
        setIsFinished(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar navLinks={ navLinks } />
      {isFinished && <Navigate to={ orderDetails } />}
      <div>
        <h1>Finalizar pedido</h1>
        <ProductsTable />
        <h1>Detalhes e Endereço para Entrega</h1>
        <div>
          <form>
            <p>P.Vendedora responsável:</p>
            <select
              data-testid="customer_checkout__select-seller"
              id="seller"
              name="sellerId"
              value={ saleForm.sellerId }
              onChange={ handleChange }
              onClick={ handleChange }
            >
              {
                users.map(({ id, name }) => (
                  <option key={ id } value={ id }>{name}</option>
                ))
              }
            </select>
            <p>Endereço:</p>
            <input
              name="deliveryAddress"
              value={ saleForm.deliveryAddress }
              onChange={ handleChange }
              data-testid="customer_checkout__input-address"
              type="text"
            />
            <p>Número</p>
            <input
              name="deliveryNumber"
              value={ saleForm.deliveryNumber }
              onChange={ handleChange }
              data-testid="customer_checkout__input-address-number"
              type="text"
            />

            <button
              data-testid="customer_checkout__button-submit-order"
              type="button"
              onClick={ submitSale }
            >
              FINALIZAR PEDIDO
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerCheckout;
