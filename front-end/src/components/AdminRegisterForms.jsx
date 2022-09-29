import React, { useState, useEffect } from 'react';
import { requestPost } from '../service/requests';

function RegisterAdmin() {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const handleChange = ({ target }) => {
    setInputValues({
      ...inputValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    const emailRegX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password, name } = inputValues;
    const minLgth = 6;
    const minNameLgth = 12;
    if (emailRegX.test(email)
    && password.length >= minLgth
    && name.length >= minNameLgth) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValues]);

  const requestRegister = async (event) => {
    event.preventDefault();
    try {
      const itExists = localStorage.getItem('user');
      if (itExists) {
        const user = JSON.parse(itExists);
        await requestPost('/users', inputValues, user.token);
      }
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
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            name="email"
            type="email"
            id="input-email"
            data-testid="admin_manage__input-email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-password">
          Password
          <input
            name="password"
            type="password"
            id="input-password"
            data-testid="admin_manage__input-password"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="select-role">
          Tipo
          <select
            name="role"
            id="select-role"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
            onClick={ handleChange }
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
        {
          isInvalidCredentials
          && (
            <h2 data-testid="admin_manage__element-invalid-register">
              Não foi possível cadastrar usuário com este e-mail
            </h2>)
        }
      </form>
    </div>
  );
}

export default RegisterAdmin;
