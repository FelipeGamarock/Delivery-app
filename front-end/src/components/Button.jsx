import React from 'react';
import PropTypes from 'prop-types';

function Button({ name, dataTestId, onClick, isDisabled, className }) {
  return (
    <button
      type="button"
      data-testid={ dataTestId }
      onClick={ onClick }
      disabled={ isDisabled }
      className={ className }
    >
      { name }
    </button>
  );
}

export default Button;

Button.propTypes = {
  name: PropTypes.string,
  dataTestId: PropTypes.string,
  isDisabled: PropTypes.bool,
}.isRequired;
