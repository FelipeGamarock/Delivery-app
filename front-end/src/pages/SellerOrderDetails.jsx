import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import OrdersTable from '../components/OrdersTable';
import { requestData, requestPatch } from '../service/requests';

const ORDER_DETAILS_EL = 'seller_order_details__element-order-details';
const EM_TRANSITO = 'Em Trânsito';

const navLinks = [{
  text: 'Pedidos',
  route: '/seller/orders',
  testId: 'customer_products__element-navbar-link-orders',
}];

function SellerOrderDetails() {
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
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              onClick={ () => handleDeliveryStatus('Preparando') }
              disabled={ order.status === EM_TRANSITO || order.status === 'Preparando' }
            >
              PREPARAR PEDIDO
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              onClick={ () => handleDeliveryStatus(EM_TRANSITO) }
              disabled={ order.status === 'Pendente' || order.status === EM_TRANSITO }
            >
              SAIU PARA ENTREGA
            </button>
          </header>
          <OrdersTable products={ order.products } />
          <span data-testid="seller_order_details__element-order-total-price">
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

export default SellerOrderDetails;
