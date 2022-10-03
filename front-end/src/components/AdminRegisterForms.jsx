import React, { useState, useEffect } from 'react';
import { requestPost } from '../service/requests';
import Button from './Button';
import Input from './Input';
import Select from './Select';

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

      setInputValues({
        email: '',
        password: '',
        name: '',
        role: '',
      });
    } catch (error) {
      setIsInvalidCredentials(true);
    }
  };

  return (
    <div>
      <h2>Cadastrar novo usuário</h2>
      <form onSubmit={ requestRegister }>
        <Input
          name="name"
          inputTitle="Nome"
          value={ inputValues.name }
          dataTestId="admin_manage__input-name"
          handleChange={ handleChange }
          type="text"
        />
        <Input
          name="email"
          inputTitle="Email"
          value={ inputValues.email }
          dataTestId="admin_manage__input-email"
          handleChange={ handleChange }
          type="email"
        />
        <Input
          name="password"
          inputTitle="Senha"
          value={ inputValues.password }
          dataTestId="admin_manage__input-password"
          handleChange={ handleChange }
          type="password"
        />
        <Select
          options={ [{ name: 'seller' }, { name: 'customer' }] }
          name="role"
          selectTitle="Tipo"
          value={ inputValues.role }
          dataTestId="admin_manage__select-role"
          handleChange={ handleChange }
        />
        <Button
          name="Registrar"
          dataTestId="admin_manage__button-register"
          isDisabled={ isDisabled }
          type="submit"
        />

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
