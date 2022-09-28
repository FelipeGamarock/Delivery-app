import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { requestLogin } from '../service/requests';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCostumerLogged, setIsCostumerLogged] = useState(false);
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [isSellerLogged, setIsSellerLogged] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const onInputChange = ({ target }) => setCredentials({
    ...credentials,
    [target.name]: target.value,
  });

  useEffect(() => {
    const itExists = localStorage.getItem('user');
    if (itExists) {
      const user = JSON.parse(itExists);
      if (user.role === 'customer') setIsCostumerLogged(true);
      if (user.role === 'administrator') setIsAdminLogged(true);
      if (user.role === 'seller') setIsSellerLogged(true);
    }
  }, []);

  useEffect(() => {
    const emailRegX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = credentials;
    const minPwLgth = 6;
    if (emailRegX.test(email)
    && password.length >= minPwLgth
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [credentials]);

  const requestConnection = async () => {
    try {
      const user = await requestLogin('/login', credentials);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'customer') setIsCostumerLogged(true);
      if (user.role === 'administrator') setIsAdminLogged(true);
      if (user.role === 'seller') setIsSellerLogged(true);
    } catch (error) {
      setIsInvalidCredentials(true);
    }
  };
  if (isCostumerLogged) return <Navigate to="/customer/products" />;
  if (isAdminLogged) return <Navigate to="/admin/manage" />;
  if (isSellerLogged) return <Navigate to="/seller/orders" />;
  return (
    <>
      <h1>App de entregas</h1>
      <section>
        <label htmlFor="email">
          Login
          <input
            name="email"
            type="email"
            data-testid="common_login__input-email"
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            data-testid="common_login__input-password"
            onChange={ onInputChange }
          />
        </label>
        <Button
          name="Login"
          dataTestId="common_login__button-login"
          isDisabled={ isDisabled }
          onClick={ requestConnection }
        />
        <Button
          name="Ainda não tenho conta"
          dataTestId="common_login__button-register"
          onClick={ () => navigate('/register') }
        />
        {
          (isInvalidCredentials)
          && (
            <h2 data-testid="common_login__element-invalid-email">
              Credencias inválidas
            </h2>)
        }
      </section>
    </>
  );
}

export default Login;
