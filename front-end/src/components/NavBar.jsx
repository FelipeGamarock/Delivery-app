import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import './NavBar.css';

function NavBar(props) {
  const { dataTestId, navLinks } = props;
  const [isLogged, setIsLogged] = useState(true);
  const itExists = localStorage.getItem('user');
  let name;
  if (itExists) {
    const user = JSON.parse(itExists);
    name = user.name;
  }
  const logOut = () => {
    localStorage.removeItem('user');
    setIsLogged(false);
  };

  if (!isLogged) return <Navigate to="/login" replace />;
  return (
    <header data-testid={ dataTestId }>
      <div>
        {
          navLinks
            .map(({ text, route, testId }, index) => (
              <Link
                key={ index }
                to={ route }
                data-testid={ testId }
              >
                { text }
              </Link>
            ))
        }
      </div>
      <div style={ { display: 'flex' } }>
        <div>
          <p data-testid="customer_products__element-navbar-user-full-name">{ name }</p>
        </div>
        <Button
          dataTestId="customer_products__element-navbar-link-logout"
          name="Sair"
          onClick={ logOut }
        />
      </div>

    </header>
  );
}

export default NavBar;
NavBar.propTypes = {
  dataTestId: PropTypes.string,
  navLinks: PropTypes.array,
}.isRequired;
