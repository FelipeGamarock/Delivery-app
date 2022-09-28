const ORDER_DETAILS_EL_TABLE = 'customer_order_details__element-order-table';

function OrdersTable() {
  const mockId = 1;

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

        <tr>
          <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-item-number-${mockId}` }>
            1
          </td>
          <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-name-${mockId}` }>
            Descrição
          </td>
          <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-quantity-${mockId}` }>
            Quantidade
          </td>
          <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-unit-price-${mockId}` }>
            Valor Unitário
          </td>
          <td data-testid={ `${ORDER_DETAILS_EL_TABLE}-sub-total-${mockId}` }>
            Sub-total
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default OrdersTable;
