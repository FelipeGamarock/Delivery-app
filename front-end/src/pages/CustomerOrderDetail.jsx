import NavBar from '../components/NavBar';

const navLinks = [{
  text: 'Produtos',
  route: '/customer/products',
  testId: 'customer_products__element-navbar-link-products',
}, {
  text: 'Meus Pedidos',
  route: '/customer/order',
  testId: 'customer_products__element-navbar-link-orders',
}];

function CustomerOderDetails() {
  return (
    <>
      <NavBar navLinks={ navLinks } />
      <h1>Details... </h1>
    </>
  );
}

export default CustomerOderDetails;
