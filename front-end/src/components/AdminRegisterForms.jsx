import React, { useState, useEffect } from 'react';
import { requestLogin } from '../service/requests';

function RegisterAdmin() {
  const [imputValues, setImputValues] = useState({
    email: '',
    password: '',
    name: '',
    role: 'default',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const onInputChange = ({ target }) => setImputValues({
    ...imputValues,
    [target.name]: target.value,
  });

  useEffect(() => {
    const emailRegX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password, name } = imputValues;
    const minLgth = 6;
    const minNameLgth = 12;
    if (emailRegX.test(email)
    && password.length >= minLgth
    && name.length >= minNameLgth) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [imputValues]);

  const requestRegister = async () => {
    try {
      const newUser = await requestLogin('/register', imputValues);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      setIsInvalidCredentials(true);
    }
  };

  return (
    <div>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="input-name">
          Name
          <input
            name="name"
            type="text"
            id="input-name"
            data-testid="admin_manage__input-name"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            name="email"
            type="email"
            id="input-email"
            data-testid="admin_manage__input-email"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="input-password">
          Password
          <input
            name="password"
            type="password"
            id="input-password"
            data-testid="admin_manage__input-password"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="select-role">
          Tipo
          <select
            name="role"
            id="select-role"
            data-testid="admin_manage__select-role"
            onChange={ onInputChange }
          >
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ isDisabled }
          onClick={ requestRegister }
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterAdmin;
