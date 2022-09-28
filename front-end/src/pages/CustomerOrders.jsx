import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
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

  return (
    <>
      <NavBar navLinks={ navLinks } />
      <div>
        {
          result.length === 0
            ? (<h1>vazio</h1>)
            : (result
              .map((order) => <OrderCard key={ order.id } isCustomer order={ order } />))
        }
      </div>
    </>
  );
}

export default CustomerOrders;
