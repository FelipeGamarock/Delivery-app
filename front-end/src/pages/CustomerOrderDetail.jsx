import NavBar from '../components/NavBar';
import OrdersTable from '../components/OrdersTable';

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
  const mockId = 1;

  return (
    <>
      <NavBar navLinks={ navLinks } />
      <h1>Detalhe do Pedido</h1>
      <div>
        <header>
          <span data-testid={ `${ORDER_DETAILS_EL}-label-order-${mockId}` }>
            Pedido ;0003;
          </span>
          <span data-testid={ `${ORDER_DETAILS_EL}-label-seller-name` }>
            P.Vend: ;Fualana Pereira;
          </span>
          <span data-testid={ `${ORDER_DETAILS_EL}-label-order-date` }>
            ;Data;
          </span>
          <span data-testid={ `${ORDER_DETAILS_EL}-label-delivery-status${mockId}` }>
            ;Entregue;
          </span>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
          >
            MARCAR COMO ENTREGUE
          </button>
        </header>
        <OrdersTable />
      </div>
    </>
  );
}

export default CustomerOrderDetail;
