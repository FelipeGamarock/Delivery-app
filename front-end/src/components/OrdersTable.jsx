import PropTypes from 'prop-types';

const ORDER_DETAILS_EL_TABLE = 'customer_order_details__element-order-table';

function OrdersTable({ products }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        {
          products.map((prod) => (
            <tr key={ prod.id }>
              <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-item-number-${prod.id}` }>
                {prod.id}
              </td>
              <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-name-${prod.id}` }>
                {prod.name}
              </td>
              <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-quantity-${prod.id}` }>
                {prod.SaleProduct.quantity}
              </td>
              <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-unit-price-${prod.id}` }>
                {prod.price}
              </td>
              <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-sub-total-${prod.id}` }>
                {(prod.price * prod.SaleProduct.quantity).toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default OrdersTable;

OrdersTable.propTypes = {
  products: PropTypes.objectOf,
}.isRequired;
