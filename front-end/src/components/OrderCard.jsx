import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ order, isCustomer }) {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = order;
  const ORDER_DETAILS_EL = (isCustomer)
    ? 'customer_orders__element'
    : 'seller_orders__element';
  const ORDER_LINK = (isCustomer)
    ? `/customer/orders/${id}`
    : `/seller/orders/${id}`;

  return (
    <Link to={ ORDER_LINK } key={ id }>
      <span data-testid={ `${ORDER_DETAILS_EL}-order-id-${id}` }>
        Pedido:
        {' '}
        {id}
      </span>
      <span data-testid={ `${ORDER_DETAILS_EL}-delivery-status-${id}` }>
        {status}
      </span>
      <span data-testid={ `${ORDER_DETAILS_EL}-order-date-${id}` }>
        {new Date(saleDate).toLocaleDateString('pt-br')}
      </span>
      <span data-testid={ `${ORDER_DETAILS_EL}-card-price-${id}` }>
        {(totalPrice).replace('.', ',')}
      </span>
      {!isCustomer && (
        <span data-testid={ `seller_orders__element-card-address-${id}` }>
          {`${deliveryAddress}, ${deliveryNumber}`}
        </span>)}
    </Link>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  order: PropTypes.objectOf,
}.isRequired;
