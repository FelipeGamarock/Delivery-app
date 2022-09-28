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
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const orders = await requestData(`/sale/${id}`);
      setResult(orders);
      setIsLoading(true);
    }
    fetchData();
  }, [id]);

  async function handlee() {
    const itExists = localStorage.getItem('user');

    if (itExists) {
      const user = JSON.parse(itExists);
      setResult({
        ...result,
        status: 'Entregue',
      });

      await requestPatch(`/sale/${id}`, { status: 'Entregue' }, user.token);
    }
  }
  console.log(result);
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
              {result.seller.name}
            </span>
            <span data-testid={ `${ORDER_DETAILS_EL}-label-order-date` }>
              {new Date(result.saleDate).toLocaleDateString('pt-br')}
            </span>
            <span data-testid={ `${ORDER_DETAILS_EL}-label-delivery-status${result.id}` }>
              {result.status}
            </span>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              onClick={ handlee }
              disabled={ result.status === 'Pendente' }
            >
              MARCAR COMO ENTREGUE
            </button>
          </header>
          <OrdersTable products={ result.products } />
          <span data-testid="customer_order_details__element-order-total-price">
            Total:
            {' '}
            {
              Number(result.totalPrice)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          </span>
        </div>
      )}
    </>
  );
}

export default CustomerOrderDetail;
