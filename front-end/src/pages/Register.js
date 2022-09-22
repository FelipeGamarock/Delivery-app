import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/Button';
import { requestLogin } from '../service/requests';

function Register() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [wasCreated, setWasCreated] = useState(false);

  const onInputChange = ({ target }) => setCredentials({
    ...credentials,
    [target.name]: target.value,
  });
  useEffect(() => {
    const emailRegX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password, name } = credentials;
    const minLgth = 6;
    const minNameLgth = 12;
    if (emailRegX.test(email)
    && password.length >= minLgth
    && name.length >= minNameLgth) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [credentials]);

  const requestRegister = async () => {
    try {
      await requestLogin('/register', credentials);
      setWasCreated(true);
    } catch (error) {
      setIsInvalidCredentials(true);
    }
  };

  if (wasCreated) return <Navigate to="/customer/products" />;

  return (
    <>
      <label htmlFor="name">
        Nome
        <input
          name="name"
          type="text"
          data-testid="common_register__input-name"
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="email">
        E-mail
        <input
          name="email"
          type="email"
          data-testid="common_register__input-email"
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="email">
        Senha
        <input
          name="password"
          type="password"
          data-testid="common_register__input-password"
          onChange={ onInputChange }
        />
      </label>
      <Button
        name="Cadastrar"
        dataTestId="common_register__button-register"
        isDisabled={ isDisabled }
        onClick={ requestRegister }
      />
      {
        (isInvalidCredentials)
        && (
          <h2 data-testid="common_register__element-invalid_register">
            Não foi possível cadastrar usuário com este e-mail
          </h2>)
      }
    </>
  );
}

export default Register;
