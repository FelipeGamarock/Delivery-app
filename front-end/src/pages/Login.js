import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { requestLogin } from '../service/requests';
import './Login.css';
import deliveryImage from './Delivery-cuate.svg';

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
      {/* <h1>App de entregas</h1> */}
      <section className="main-login">
        <section className="card-image">
          <h1>Frase para ilustrar a tela de login</h1>
          <img
            src={ deliveryImage }
            className="left-image-login"
            alt="Animação entregador em uma scooter"
          />
        </section>

        {/* Inicio === Card Login */}
        <section className="card-right">
          <div className="card-login">
            <h1>LOGIN</h1>
            <div className="text-field">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                data-testid="common_login__input-email"
                onChange={onInputChange}
                placeholder="Email"
              />
            </div>
            <div className="text-field">
              <label htmlFor="password">Senha</label>
              <input
                name="password"
                type="password"
                data-testid="common_login__input-password"
                onChange={onInputChange}
                placeholder="Senha"
              />
            </div>

            <div className="card-btn">
              <Button
                name="Login"
                dataTestId="common_login__button-login"
                isDisabled={isDisabled}
                onClick={requestConnection}
              />
              <Button
                name="Ainda não tenho conta"
                dataTestId="common_login__button-register"
                onClick={() => navigate('/register')}
              />
            </div>
          </div>

          {
            (isInvalidCredentials)
            && (
              <h2 data-testid="common_login__element-invalid-email">
                Credencias inválidas
              </h2>)
          }
        </section>
      </section>
    </>
  );
}

export default Login;
