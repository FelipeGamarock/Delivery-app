import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;
  console.log(order);
  return (
    <Link to={ `/customer/orders/${id}` } key={ id } replace>
      <span data-testid={ `customer_orders__element-order-id-${id}` }>
        Pedido:
        {' '}
        {id}
      </span>
      <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </span>
      <span data-testid={ `customer_orders__element-order-date-${id}` }>
        {saleDate}
      </span>
      <span data-testid={ `customer_orders__element-card-price-${id}` }>
        {totalPrice}
      </span>
    </Link>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  order: PropTypes.objectOf,
}.isRequired;
