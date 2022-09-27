import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { requestDataAuth } from '../service/requests';

const navLinks = [{
  text: 'Produtos',
  route: '/customer/products',
  testId: 'customer_products__element-navbar-link-products',
}, {
  text: 'Meus Pedidos',
  route: '/customer/orders',
  testId: 'customer_products__element-navbar-link-orders',
}];

function CustomerOrders() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const itExists = localStorage.getItem('user');
      if (itExists) {
        const user = JSON.parse(itExists);

        const orders = await requestDataAuth('/customer/orders', user.token);
        setResult(orders);
      }
    }
    fetchData();
  }, []);
  console.log(result);
  return (
    <>
      <NavBar navLinks={ navLinks } />
      {result.map((order) => (
        <div key={ order.id }>
          <span data-testid={ `customer_orders__element-order-id-${order.id}` }>
            Pedido:
            {' '}
            {order.id}
          </span>
          <span data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
            {order.status}
          </span>
          <span data-testid={ `customer_orders__element-order-date-${order.id}` }>
            {order.saleDate}
          </span>
          <span data-testid={ `customer_orders__element-card-price-${order.id}` }>
            {order.totalPrice}
          </span>
        </div>
      ))}
    </>
  );
}

export default CustomerOrders;
