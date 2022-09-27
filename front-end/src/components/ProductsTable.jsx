import { useContext } from 'react';
import CustomerContext from '../context/customer.context';

const TESTID = 'customer_checkout__element-order-table';

function ProductsTable() {
  const { cartProducts, setCartProducts } = useContext(CustomerContext);

  const sum = cartProducts.reduce((acc, curr) => acc + curr.totalProduct, 0);

  const handleRemove = (id) => {
    const newList = cartProducts.filter((item) => item.id !== id);

    setCartProducts(newList);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
          { cartProducts
            .map(({ id, name, quantity, price, totalProduct }, index) => (
              <tr key={ id }>
                <td
                  data-testid={ `${TESTID}-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${TESTID}-name-${index}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `${TESTID}-quantity-${index}` }
                >
                  {quantity}
                </td>
                <td
                  data-testid={ `${TESTID}-unit-price-${index}` }
                >
                  {Number(price).toFixed(2).replace('.', ',')}
                </td>
                <td
                  data-testid={ `${TESTID}-sub-total-${index}` }
                >
                  {totalProduct.toFixed(2).replace('.', ',')}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={ () => handleRemove(id) }
                    data-testid={ `${TESTID}-remove-${index}` }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h1
        data-testid="customer_checkout__element-order-total-price"
      >
        Total:
        {' '}
        {sum.toFixed(2).toString().replace('.', ',')}
      </h1>
    </div>
  );
}

export default ProductsTable;
