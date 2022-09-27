function RegisterAdmin() {
  return (
    <div>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="input-name">
          Name
          <input
            type="text"
            id="input-name"
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            type="email"
            id="input-email"
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="input-password">
          Password
          <input
            type="password"
            id="input-password"
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="select-role">
          Tipo
          <select
            id="select-role"
            data-testid="admin_manage__select-role"
          >
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterAdmin;
