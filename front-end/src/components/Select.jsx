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
        defaultValue=""
        onChange={ handleChange }
        required
      >
        <option value="" disabled hidden>Selecione</option>
        {
          options.map((op) => (
            <option key={ op.id } value={ op.id }>{op.name}</option>
          ))
        }
      </select>
    </label>
  );
}

export default Select;

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selectTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
