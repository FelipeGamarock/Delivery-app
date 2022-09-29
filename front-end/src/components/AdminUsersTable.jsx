import { useEffect, useState } from 'react';
import { requestData, requestDelete } from '../service/requests';

const ADMIN_MANAGE_EL = 'admin_manage__element-user-table';

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await requestData('/users');
      const filterSeller = data.filter((user) => user.role !== 'administrator');

      setUsers(filterSeller);
    }
    fetchData();
  }, [users]);

  async function handleDeleteUser(id) {
    const itExists = localStorage.getItem('user');
    if (itExists) {
      const user = JSON.parse(itExists);

      await requestDelete(`/users/${id}`, user.token);

      const newList = users.filter((item) => item.id !== id);
      setUsers(newList);
    }
  }

  return (
    <div>
      <h1>Lista de usuários</h1>
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
          {
            users.map(({ id, name, email, role }, index) => (
              <tr key={ id }>
                <td data-testid={ `${ADMIN_MANAGE_EL}-item-number-${index}` }>
                  {index + 1}
                </td>
                <td data-testid={ `${ADMIN_MANAGE_EL}-name-${index}` }>
                  {name}
                </td>
                <td data-testid={ `${ADMIN_MANAGE_EL}-email-${index}` }>
                  {email}
                </td>
                <td data-testid={ `${ADMIN_MANAGE_EL}-role-${index}` }>
                  {role}
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `${ADMIN_MANAGE_EL}-remove-${index}` }
                    onClick={ () => handleDeleteUser(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
