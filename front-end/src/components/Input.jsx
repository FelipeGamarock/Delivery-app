import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, value, inputTitle, handleChange, dataTestId, type }) {
  return (
    <label htmlFor={ name }>
      {inputTitle}
      <input
        id={ name }
        name={ name }
        value={ value }
        data-testid={ dataTestId }
        onChange={ handleChange }
        type={ type }
        required
      />
    </label>
  );
}

export default Input;

Input.propTypes = {
  inputTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleChange: PropTypes.func,
  dataTestId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Input.defaultProps = {
  handleChange: () => {},
};
