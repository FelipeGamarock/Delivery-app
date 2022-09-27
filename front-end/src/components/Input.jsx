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
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  inputTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
