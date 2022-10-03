import React from 'react';
import PropTypes from 'prop-types';

function Select({ options, name, value, selectTitle, handleChange, dataTestId }) {
  return (
    <label htmlFor={ name }>
      {selectTitle}
      <select
        id={ name }
        name={ name }
        value={ value }
        data-testid={ dataTestId }
        onChange={ handleChange }
        required
      >
        <option value="" disabled hidden>Selecione</option>
        {
          options.map((op) => (
            <option
              key={ op.id ? op.id : op.name }
              value={ op.id ? op.id : op.name }
            >
              {op.name}
            </option>
          ))
        }
      </select>
    </label>
  );
}

export default Select;

Select.propTypes = {
  selectTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  dataTestId: PropTypes.string.isRequired,
};

Select.defaultProps = {
  handleChange: () => {},
};
