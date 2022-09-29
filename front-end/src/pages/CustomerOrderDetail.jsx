import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import OrdersTable from '../components/OrdersTable';
import { requestData, requestPatch } from '../service/requests';

const ORDER_DETAILS_EL = 'customer_order_details__element-order-details';

const navLinks = [{
  text: 'Produtos',
  route: '/customer/products',
  testId: 'customer_products__element-navbar-link-products',
}, {
  text: 'Meus Pedidos',
  route: '/customer/orders',
  testId: 'customer_products__element-navbar-link-orders',
}];

function CustomerOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await requestData(`/sale/${id}`);
      setOrder(data);
      setIsLoading(true);
    }
    fetchData();
  }, [id]);

  async function handleDeliveryStatus(status) {
    const itExists = localStorage.getItem('user');

    if (itExists) {
      const user = JSON.parse(itExists);
      setOrder({
        ...order,
        status,
      });

      await requestPatch(`/sale/${id}`, { status }, user.token);
    }
  }

  return (
    <>
      <NavBar navLinks={ navLinks } />
      <h1>Detalhe do Pedido</h1>
      {isLoading && (
        <div>
          <header>
            <span data-testid={ `${ORDER_DETAILS_EL}-label-order-id` }>
              Pedido
              {' '}
              {id}
            </span>
            <span data-testid={ `${ORDER_DETAILS_EL}-label-seller-name` }>
              P.Vend:
              {' '}
              {order.seller.name}
            </span>
            <span data-testid={ `${ORDER_DETAILS_EL}-label-order-date` }>
              {new Date(order.saleDate).toLocaleDateString('pt-br')}
            </span>
            <span data-testid={ `${ORDER_DETAILS_EL}-label-delivery-status${order.id}` }>
              {order.status}
            </span>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              onClick={ () => handleDeliveryStatus('Entregue') }
              disabled={
                order.status === 'Pendente'
                || order.status === 'Preparando'
                || order.status === 'Entregue'
              }
            >
              MARCAR COMO ENTREGUE
            </button>
          </header>
          <OrdersTable products={ order.products } />
          <span data-testid="customer_order_details__element-order-total-price">
            Total:
            {' '}
            {
              Number(order.totalPrice)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          </span>
        </div>
      )}
    </>
  );
}

export default CustomerOrderDetail;
