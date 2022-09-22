import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ name, price, urlImage, id }) {
  const [quantity, setQuantity] = useState(0);
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
            value={ quantity }
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ () => setQuantity((q) => q + 1) }
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
