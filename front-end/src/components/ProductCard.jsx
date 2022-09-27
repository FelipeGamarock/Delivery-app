import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from '../context/customer.context';

function ProductCard({ name, price, urlImage, id }) {
  const { cart, setCart, setCartProducts } = useContext(CustomerContext);
  const [quantity, setQuantity] = useState(0);

  const [didMount, setDidMount] = useState(false);

  useEffect(() => setDidMount(true), []);

  const addToCart = () => {
    setQuantity((q) => q + 1);
  };

  useEffect(() => {
    if (didMount) {
      setCart({
        ...cart,
        [id]: {
          id,
          name,
          price,
          urlImage,
          quantity,
          totalProduct: quantity * price,
        },
      });
    }
  }, [quantity]);

  useEffect(() => {
    setCartProducts(Object.values(cart));
  }, [cart]);

  return (
    <section>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {price.replace(/\./, ',')}
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="product"
        style={ { width: '300px', height: '300px' } }
      />
      <div>
        <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
        <div className="btn-group">
          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            onClick={ () => setQuantity((q) => ((q === 0) ? 0 : q - 1)) }
          >
            -
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${id}` }
            type="number"
            min={ 0 }
            onChange={ ({ target }) => setQuantity(target.value) }
            value={ quantity }
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ addToCart }
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
