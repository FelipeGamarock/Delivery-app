import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsTable from '../components/ProductsTable';
import { requestData, requestPost } from '../service/requests';
import CustomerContext from '../context/customer.context';
import Select from '../components/Select';
import Input from '../components/Input';

const navLinks = [{
  text: 'Produtos',
  route: '/customer/products',
  testId: 'customer_products__element-navbar-link-products',
}, {
  text: 'Meus Pedidos',
  route: '/customer/orders',
  testId: 'customer_products__element-navbar-link-orders',
}];

function CustomerCheckout() {
  const { cartProducts, setCart } = useContext(CustomerContext);
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
        const sale = await requestPost('/sale', body, user.token);
        setOrderDetails(`/customer/orders/${sale.id}`);
        setCart({});
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
            <Select
              options={ users }
              name="sellerId"
              selectTitle="P.Vendedora responsável:"
              value={ saleForm.sellerId }
              dataTestId="customer_checkout__select-seller"
              handleChange={ handleChange }
            />
            <Input
              name="deliveryAddress"
              inputTitle="Endereço:"
              value={ saleForm.deliveryAddress }
              dataTestId="customer_checkout__input-address"
              handleChange={ handleChange }
              type="text"
            />
            <Input
              name="deliveryNumber"
              inputTitle="Número:"
              value={ saleForm.deliveryNumber }
              dataTestId="customer_checkout__input-address-number"
              handleChange={ handleChange }
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
