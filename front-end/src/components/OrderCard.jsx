import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ORDER_DETAILS_EL = 'customer_orders__element';
function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;

  return (
    <Link to={ `/customer/orders/${id}` } key={ id }>
      <span data-testid={ `${ORDER_DETAILS_EL}-order-id-${id}` }>
        Pedido:
        {' '}
        {id}
      </span>
      <span data-testid={ `${ORDER_DETAILS_EL}-delivery-status-${id}` }>
        {status}
      </span>
      <span data-testid={ `${ORDER_DETAILS_EL}-order-date-${id}` }>
        {new Date(saleDate).toLocaleDateString()}
      </span>
      <span data-testid={ `${ORDER_DETAILS_EL}-card-price-${id}` }>
        {totalPrice}
      </span>
    </Link>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  order: PropTypes.objectOf,
}.isRequired;
